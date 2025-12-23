"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    Upload,
    Download,
    Check,
    X,
    AlertCircle,
    ChevronRight,
    Package,
    Tag,
    TrendingUp,
    Layers,
    Search,
    Filter,
    Plus
} from "lucide-react";
import Papa from "papaparse";
import { supabase } from "@/lib/supabase";
import { mockProducts, mockCategories, Product, Category } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type UpdateField = "sku" | "title" | "description" | "price" | "stock" | "categoryId" | "brand" | "status" | "image";

interface ColumnMapping {
    field: UpdateField;
    column: string;
}

interface CSVRow {
    ID?: string;
    nombre?: string;
    SKU?: string;
    categoría?: string;
    precio?: string;
    stock?: string;
    descripción?: string;
    imágenes?: string;
    estado?: string;
    marca?: string;
}

export default function AdminShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [csvData, setCsvData] = useState<CSVRow[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [selectedFields, setSelectedFields] = useState<UpdateField[]>(["price", "stock"]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadSummary, setUploadSummary] = useState({ new: 0, updated: 0, errors: 0 });
    const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
    const [mappingStep, setMappingStep] = useState<"upload" | "mapping" | "preview">("upload");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        try {
            const { data: catData } = await supabase.from('categories').select('*');
            setCategories(catData || mockCategories);

            const { data: prodData } = await supabase.from('products').select('*');
            const mappedProducts = (prodData || mockProducts).map((p: any) => ({
                ...p,
                categoryId: p.category_id,
            }));
            setProducts(mappedProducts);
        } catch (error) {
            console.error("Error fetching admin data:", error);
            setProducts(mockProducts);
            setCategories(mockCategories);
        }
    };

    useEffect(() => {
        fetchData();
        // Load saved mappings from localStorage
        const saved = localStorage.getItem("atipe_csv_mappings");
        if (saved) {
            try {
                setColumnMappings(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading mappings:", e);
            }
        }
    }, []);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results: Papa.ParseResult<any>) => {
                const rows = results.data;
                const fileHeaders = results.meta.fields || [];
                setCsvData(rows);
                setHeaders(fileHeaders);

                // Try to auto-map based on headers or previous mappings
                const newMappings: ColumnMapping[] = [];
                const fields: UpdateField[] = ["sku", "title", "description", "price", "stock", "categoryId", "brand", "status"];

                fields.forEach(field => {
                    // 1. Check if we already have a saved mapping for this field that exists in the new headers
                    const existing = columnMappings.find(m => m.field === field);
                    if (existing && fileHeaders.includes(existing.column)) {
                        newMappings.push(existing);
                        return;
                    }

                    // 2. Try common naming conventions
                    const column = fileHeaders.find(h => {
                        const lowH = h.toLowerCase();
                        if (field === "sku") return lowH === "sku" || lowH === "referencia" || lowH === "código" || lowH === "nombre corto";
                        if (field === "title") return lowH === "nombre" || lowH === "título" || lowH === "producto" || lowH === "descripcion larga";
                        if (field === "price") return lowH.includes("precio") || lowH.includes("pvp") || lowH.includes("importe");
                        if (field === "stock") return lowH === "stock" || lowH === "cantidad" || lowH === "unidades" || lowH === "existencias";
                        if (field === "categoryId") return lowH === "fami" || lowH === "familia" || lowH === "categoría" || lowH === "sección";
                        if (field === "brand") return lowH === "marca" || lowH === "fabricante";
                        if (field === "description") return lowH === "descripción" || lowH === "detalle";
                        return false;
                    });

                    if (column) {
                        newMappings.push({ field, column });
                    }
                });

                setColumnMappings(newMappings);
                setMappingStep("mapping");
                setIsPreviewMode(true);
            },
            error: (error: Error) => {
                console.error("Error parsing CSV:", error);
                alert("Error al procesar el archivo CSV");
            }
        });
    };

    const saveMappings = (mappings: ColumnMapping[]) => {
        localStorage.setItem("atipe_csv_mappings", JSON.stringify(mappings));
    };

    const handleMappingChange = (field: UpdateField, column: string) => {
        const newMappings = [...columnMappings.filter(m => m.field !== field)];
        if (column) {
            newMappings.push({ field, column });
        }
        setColumnMappings(newMappings);
        saveMappings(newMappings);
    };

    const toggleField = (field: UpdateField) => {
        setSelectedFields(prev =>
            prev.includes(field)
                ? prev.filter(f => f !== field)
                : [...prev, field]
        );
    };

    const applyUpdates = async () => {
        // Validation: Check if Supabase is properly configured
        const isSupabaseConfigured =
            process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder-url.supabase.co';

        if (!isSupabaseConfigured) {
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setIsPreviewMode(false);
                alert("⚠️ Modo Simulación: Supabase no está configurado. Los cambios se han procesado localmente en esta sesión (No persistirán en base de datos). Revisa tu archivo .env.local para habilitar la sincronización real.");
            }, 1000);
            return;
        }

        setIsProcessing(true);
        try {
            let newCount = 0;
            let updatedCount = 0;
            let errorCount = 0;

            const upsertData = csvData.map(row => {
                const getVal = (field: UpdateField) => {
                    const mapping = columnMappings.find(m => m.field === field);
                    return mapping ? (row as any)[mapping.column] : undefined;
                };

                const sku = getVal("sku");
                if (!sku) return null; // Skip rows without SKU

                const existing = products.find(p => p.sku === sku);

                // Find category ID by name
                const categoryName = getVal("categoryId");
                const category = categories.find(c =>
                    c.name.toLowerCase() === categoryName?.toLowerCase()
                );

                const baseUpdate: any = { sku };

                if (selectedFields.includes("title")) baseUpdate.title = getVal("title");
                if (selectedFields.includes("description")) baseUpdate.description = getVal("description");
                if (selectedFields.includes("price")) baseUpdate.price = parseFloat(getVal("price") || "0");
                if (selectedFields.includes("stock")) baseUpdate.stock = parseInt(getVal("stock") || "0");
                if (selectedFields.includes("brand")) baseUpdate.brand = getVal("brand");
                if (selectedFields.includes("status")) baseUpdate.status = getVal("status");
                if (selectedFields.includes("categoryId") && category) baseUpdate.category_id = category.id;

                if (existing) updatedCount++;
                else newCount++;

                return baseUpdate;
            }).filter(Boolean);

            // Batch upsert to Supabase
            const { error } = await supabase
                .from('products')
                .upsert(upsertData, { onConflict: 'sku' });

            if (error) throw error;

            setUploadSummary({ new: newCount, updated: updatedCount, errors: errorCount });
            await fetchData();
            setIsPreviewMode(false);
            alert(`✅ Actualización completada: ${updatedCount} actualizados, ${newCount} nuevos en la base de datos.`);
        } catch (error) {
            console.error("Error applying updates:", error);
            alert("❌ Error al aplicar los cambios en la base de datos. Verifica la conexión.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Tienda</h2>
                    <p className="text-muted-foreground">Importación masiva por CSV y control de inventario.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4" /> Importar CSV
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".csv"
                        onChange={handleFileUpload}
                    />
                    <Button className="gap-2">
                        <Download className="h-4 w-4" /> Exportar Plantilla
                    </Button>
                </div>
            </div>

            {isPreviewMode && (
                <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-primary" />
                            {mappingStep === "mapping" ? "Asignación de Columnas" : "Previsualización de Importación"}
                        </CardTitle>
                        <CardDescription>
                            {mappingStep === "mapping"
                                ? "Asigna las columnas de tu CSV a los campos de la tienda."
                                : `Se han detectado ${csvData.length} productos. Los campos marcados se actualizarán.`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {mappingStep === "mapping" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {(["sku", "title", "price", "stock", "categoryId", "brand", "description", "status"] as UpdateField[]).map(field => (
                                    <div key={field} className="space-y-2">
                                        <Label className="capitalize font-bold">
                                            {field === "sku" ? "SKU / Referencia (Obligatorio)" :
                                                field === "categoryId" ? "Categoría" :
                                                    field === "title" ? "Nombre" : field}
                                        </Label>
                                        <select
                                            className="w-full p-2 border rounded-md bg-white text-sm"
                                            value={columnMappings.find(m => m.field === field)?.column || ""}
                                            onChange={(e) => handleMappingChange(field, e.target.value)}
                                        >
                                            <option value="">-- No importar --</option>
                                            {headers.map(h => (
                                                <option key={h} value={h}>{h}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {(["title", "description", "price", "stock", "categoryId", "brand", "status"] as UpdateField[]).map(field => (
                                        <Button
                                            key={field}
                                            variant={selectedFields.includes(field) ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => toggleField(field)}
                                            className="capitalize"
                                        >
                                            {selectedFields.includes(field) && <Check className="mr-1 h-3 w-3" />}
                                            {field === "categoryId" ? "Categoría" : field === "title" ? "Nombre" : field === "description" ? "Descripción" : field}
                                        </Button>
                                    ))}
                                </div>

                                <div className="max-h-60 overflow-auto border rounded-md">
                                    <table className="w-full text-xs text-left">
                                        <thead className="bg-slate-100 sticky top-0">
                                            <tr>
                                                <th className="px-3 py-2 border-b">SKU</th>
                                                <th className="px-3 py-2 border-b">Nombre</th>
                                                <th className="px-3 py-2 border-b">Categoría</th>
                                                <th className="px-3 py-2 border-b">Precio</th>
                                                <th className="px-3 py-2 border-b">Stock</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {csvData.slice(0, 5).map((row, i) => {
                                                const getVal = (f: UpdateField) => {
                                                    const m = columnMappings.find(cm => cm.field === f);
                                                    return m ? (row as any)[m.column] : "-";
                                                };
                                                return (
                                                    <tr key={i} className="bg-white">
                                                        <td className="px-3 py-2 border-b font-mono">{getVal("sku")}</td>
                                                        <td className="px-3 py-2 border-b">{getVal("title")}</td>
                                                        <td className="px-3 py-2 border-b">{getVal("categoryId")}</td>
                                                        <td className="px-3 py-2 border-b font-bold">{getVal("price")}€</td>
                                                        <td className="px-3 py-2 border-b">{getVal("stock")}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => {
                            setIsPreviewMode(false);
                            setMappingStep("upload");
                        }}>
                            Cancelar
                        </Button>
                        {mappingStep === "mapping" ? (
                            <Button onClick={() => setMappingStep("preview")} disabled={!columnMappings.find(m => m.field === "sku")}>
                                Siguiente: Previsualizar
                            </Button>
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => setMappingStep("mapping")}>Atrás</Button>
                                <Button onClick={applyUpdates} disabled={isProcessing}>
                                    {isProcessing ? "Procesando..." : `Aplicar cambios (${csvData.length} filas)`}
                                </Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            )}

            <div className="grid gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Productos Totales</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.length}</div>
                        <p className="text-xs text-muted-foreground">Activos en la tienda</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categorías</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categories.length}</div>
                        <p className="text-xs text-muted-foreground">Organización del catálogo</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products.filter(p => p.stock < 10).length}</div>
                        <p className="text-xs text-muted-foreground">Requieren reposición</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Última Sincro</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Hoy</div>
                        <p className="text-xs text-muted-foreground">Hace 2 horas</p>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-white rounded-xl border shadow-sm">
                <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar por SKU, nombre o marca..." className="pl-9" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" /> Filtros
                        </Button>
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" /> Nuevo Producto
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium">SKU</th>
                                <th className="px-6 py-3 font-medium">Producto</th>
                                <th className="px-6 py-3 font-medium text-center">Stock</th>
                                <th className="px-6 py-3 font-medium text-right">Precio</th>
                                <th className="px-6 py-3 font-medium text-center">Estado</th>
                                <th className="px-6 py-3 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id} className="border-b hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{p.sku}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-900">{p.title}</div>
                                        <div className="text-xs text-muted-foreground uppercase">{p.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge variant={p.stock < 10 ? "destructive" : "secondary"}>
                                            {p.stock} uds
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                                        {p.price}€
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge className={p.status === 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                                            {p.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

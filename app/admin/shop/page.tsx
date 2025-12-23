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
import { mockProducts, mockCategories, Product, Category } from "@/lib/data";
import { cn } from "@/lib/utils";

type UpdateField = "title" | "description" | "price" | "stock" | "categoryId" | "brand" | "status" | "image";

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
    const [csvData, setCsvData] = useState<CSVRow[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [selectedFields, setSelectedFields] = useState<UpdateField[]>(["price", "stock"]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadSummary, setUploadSummary] = useState({ new: 0, updated: 0, errors: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setCsvData(results.data as CSVRow[]);
                setHeaders(results.meta.fields || []);
                setIsPreviewMode(true);
            },
            error: (error) => {
                console.error("Error parsing CSV:", error);
                alert("Error al procesar el archivo CSV");
            }
        });
    };

    const toggleField = (field: UpdateField) => {
        setSelectedFields(prev =>
            prev.includes(field)
                ? prev.filter(f => f !== field)
                : [...prev, field]
        );
    };

    const applyUpdates = () => {
        setIsProcessing(true);
        // Simulate processing
        setTimeout(() => {
            let newCount = 0;
            let updatedCount = 0;

            csvData.forEach(row => {
                const sku = row.SKU;
                const existing = mockProducts.find(p => p.sku === sku);
                if (existing) updatedCount++;
                else newCount++;
            });

            setUploadSummary({ new: newCount, updated: updatedCount, errors: 0 });
            setIsProcessing(false);
            setIsPreviewMode(false);
            alert(`Actualización completada: ${updatedCount} actualizados, ${newCount} nuevos.`);
        }, 1500);
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
                            Previsualización de Importación
                        </CardTitle>
                        <CardDescription>
                            Se han detectado {csvData.length} productos en el archivo. Selecciona qué campos deseas actualizar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                                        {headers.slice(0, 6).map(h => (
                                            <th key={h} className="px-3 py-2 border-b">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {csvData.slice(0, 5).map((row, i) => (
                                        <tr key={i} className="bg-white">
                                            {headers.slice(0, 6).map(h => (
                                                <td key={h} className="px-3 py-2 border-b">{row[h as keyof CSVRow]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {csvData.length > 5 && (
                                <div className="p-2 text-center text-muted-foreground text-xs">
                                    ... y {csvData.length - 5} filas más
                                </div>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsPreviewMode(false)}>Cancelar</Button>
                        <Button onClick={applyUpdates} disabled={isProcessing}>
                            {isProcessing ? "Procesando..." : `Aplicar cambios (${csvData.length} filas)`}
                        </Button>
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
                        <div className="text-2xl font-bold">{mockProducts.length}</div>
                        <p className="text-xs text-muted-foreground">Activos en la tienda</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categorías</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockCategories.length}</div>
                        <p className="text-xs text-muted-foreground">Organización del catálogo</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
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
                            {mockProducts.map((p) => (
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

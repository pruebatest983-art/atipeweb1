"use client";

import { mockProducts, mockCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Package, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Ofertas</h2>
                    <p className="text-muted-foreground">Administra los productos del mercadillo.</p>
                </div>
                <Button className="gap-2" asChild>
                    <Link href="/admin/products/new">
                        <Plus className="h-4 w-4" /> Nuevo Producto
                    </Link>
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        className="w-full pl-9 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium">Producto</th>
                            <th className="px-6 py-3 font-medium">Categoría</th>
                            <th className="px-6 py-3 font-medium">Precio Oferta</th>
                            <th className="px-6 py-3 font-medium">Precio Original</th>
                            <th className="px-6 py-3 font-medium">Estado</th>
                            <th className="px-6 py-3 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockProducts.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                                            <Package className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{product.title}</div>
                                            <div className="text-xs text-muted-foreground line-clamp-1">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant="outline">
                                        {mockCategories.find(c => c.id === product.categoryId)?.name || 'Sin categoría'}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 font-bold text-green-600">
                                    {product.price}€
                                </td>
                                <td className="px-6 py-4 text-muted-foreground line-through">
                                    {product.originalPrice ? `${product.originalPrice}€` : '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={product.status === 'Disponible' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-slate-100 text-slate-800'}>
                                        {product.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Edit className="h-4 w-4 text-blue-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

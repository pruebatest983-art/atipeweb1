"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Info, ArrowUpDown, Layers, Package } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { supabase } from "@/lib/supabase";
import { mockCategories, mockProducts, Product, Category } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name">("name");
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch Categories
                const { data: catData, error: catError } = await supabase
                    .from('categories')
                    .select('*');

                if (catError) throw catError;
                const dbCategories = catData && catData.length > 0 ? catData : mockCategories;
                setCategories(dbCategories);

                // Fetch Products
                const { data: prodData, error: prodError } = await supabase
                    .from('products')
                    .select('*');

                if (prodError) throw prodError;

                // Priority: Supabase data > Mock data
                const finalProducts = prodData && prodData.length > 0 ? prodData : mockProducts;

                const mappedProducts = finalProducts.map((p: any) => ({
                    ...p,
                    categoryId: p.category_id,
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error("Error fetching from Supabase:", error);
                setProducts(mockProducts);
                setCategories(mockCategories);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const filteredProducts = products
        .filter((p) => (selectedCategory ? p.categoryId === selectedCategory : true))
        .filter((p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            return a.title.localeCompare(b.title);
        });

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar />
            <Marquee />
            <div className="bg-slate-50 flex-1">
                <div className="container mx-auto py-12 px-4">
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">Tienda <span className="text-primary">Atipe</span></h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto italic">
                            "Accesorios, componentes y periféricos con stock real and envío 24h."
                        </p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-64 space-y-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-primary" /> Categorías
                                </h2>
                                <div className="flex flex-wrap lg:flex-col gap-2">
                                    <button
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === null ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100 text-left"}`}
                                        onClick={() => setSelectedCategory(null)}
                                    >
                                        Todas las categorías
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${selectedCategory === cat.id ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
                                            onClick={() => setSelectedCategory(cat.id)}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1 space-y-6">
                            {/* Search & Sort Bar */}
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Busca productos, marcas o SKUs..."
                                        className="pl-10 h-11 rounded-xl border-slate-200"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-48">
                                        <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                        <select
                                            className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value as any)}
                                        >
                                            <option value="name">Ordenar por nombre</option>
                                            <option value="price-asc">Precio: Menor a Mayor</option>
                                            <option value="price-desc">Precio: Mayor a Menor</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Product Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <Card key={product.id} className="group overflow-hidden rounded-2xl border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                        <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                                            <div className="absolute top-2 right-2 z-10">
                                                <Badge className={product.stock > 0 ? "bg-green-500" : "bg-red-500"}>
                                                    {product.stock > 0 ? "En Stock" : "Sin Stock"}
                                                </Badge>
                                            </div>
                                            {/* Placeholder for product image */}
                                            <div className="text-slate-300 group-hover:scale-110 transition-transform duration-500">
                                                <Package size={64} />
                                            </div>
                                        </div>
                                        <CardHeader className="p-5 pb-2">
                                            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">{product.brand}</div>
                                            <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-5 pt-0 flex-1">
                                            <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{product.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="text-2xl font-black text-slate-900">{product.price}€</div>
                                                <div className="text-xs text-slate-400">SKU: {product.sku}</div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-5 pt-0 gap-2">
                                            <Button variant="outline" className="flex-1 rounded-xl h-11 gap-2">
                                                <Info className="h-4 w-4" /> Detalle
                                            </Button>
                                            <Button className="flex-1 rounded-xl h-11 gap-2" onClick={() => addToCart(product)}>
                                                <ShoppingCart className="h-4 w-4" /> Comprar
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            {filteredProducts.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                                    <div className="bg-slate-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <Search size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">No hay resultados</h3>
                                    <p className="text-slate-500">Prueba con otros términos o categorías.</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            <FloatingWhatsApp />
            <Footer />
        </main>
    );
}

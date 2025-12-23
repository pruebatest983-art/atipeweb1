"use client";

import { mockProducts, mockCategories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Smartphone, Laptop, Gamepad, Monitor, Lock } from "lucide-react";
import Link from "next/link";

export function ProductsSection() {
    const getIcon = (category: string) => {
        switch (category) {
            case "Móvil": return <Smartphone className="h-6 w-6" />;
            case "Ordenador": return <Laptop className="h-6 w-6" />;
            case "Consola": return <Gamepad className="h-6 w-6" />;
            case "Accesorio": return <Monitor className="h-6 w-6" />;
            default: return <ShoppingCart className="h-6 w-6" />;
        }
    };

    return (
        <section id="productos" className="py-24 bg-white relative">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                        Mercadillo de Ocasión y Novedades
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Productos Nuevos y Reacondicionados</h2>
                    <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
                        Accede a las mejores ofertas en dispositivos nuevos y verificados. Exclusivo para socios.
                    </p>
                </div>

                {/* Restricted Content Area */}
                <div className="relative">
                    {/* Blur Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-lg">
                        <div className="bg-white/90 p-8 rounded-2xl shadow-xl text-center border max-w-md mx-4 animate-in fade-in zoom-in duration-500">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Contenido Exclusivo de Socios</h3>
                            <p className="text-muted-foreground mb-6">
                                El mercadillo de segunda mano solo es visible para usuarios registrados. Únete al Club Atipe gratis para ver todas las ofertas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button asChild size="lg" className="w-full sm:w-auto">
                                    <Link href="/register">Crear Cuenta Gratis</Link>
                                </Button>
                                <Button variant="outline" asChild size="lg" className="w-full sm:w-auto">
                                    <Link href="/login">Iniciar Sesión</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Blurred Grid Background (Visual Teaser) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-30 select-none pointer-events-none filter blur-sm">
                        {mockProducts.slice(0, 4).map((product) => {
                            const categoryName = mockCategories.find(c => c.id === product.categoryId)?.name || 'Sin categoría';
                            return (
                                <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-white shadow-sm">
                                    <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
                                        {getIcon(categoryName)}
                                        {product.originalPrice && (
                                            <Badge className="absolute top-2 right-2 bg-red-600">
                                                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs text-muted-foreground">{categoryName}</p>
                                                <h3 className="font-semibold text-lg leading-tight">{product.title}</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-2">Contenido oculto para no registrados...</p>
                                        <div className="pt-2 flex items-center justify-between">
                                            <span className="text-xl font-bold text-slate-400">???€</span>
                                            <Button size="sm" variant="outline" disabled>Reservar</Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}

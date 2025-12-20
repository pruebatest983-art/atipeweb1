"use client";

import { mockProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Plus, Tag, Smartphone, Laptop, Gamepad, Monitor, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductsMarketPage() {
    const getIcon = (category: string) => {
        switch (category) {
            case "Móvil": return <Smartphone className="h-10 w-10 text-slate-300" />;
            case "Ordenador": return <Laptop className="h-10 w-10 text-slate-300" />;
            case "Consola": return <Gamepad className="h-10 w-10 text-slate-300" />;
            case "Accesorio": return <Monitor className="h-10 w-10 text-slate-300" />;
            default: return <ShoppingCart className="h-10 w-10 text-slate-300" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Segunda Mano & Ofertas</h2>
                    <p className="text-muted-foreground">Dispositivos verificados y garantizados.</p>
                </div>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Vender Producto</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                        <div className="aspect-video bg-slate-50 flex items-center justify-center relative">
                            {getIcon(product.category)}
                            {product.originalPrice && (
                                <span className="absolute top-2 right-2 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
                                    Oferta
                                </span>
                            )}
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h3>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded-full text-slate-600 border">{product.category}</span>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${product.status === 'Disponible' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500'}`}>
                                    {product.status}
                                </span>
                            </div>

                            <p className="text-xs text-muted-foreground mb-4 flex-1 line-clamp-2">{product.description}</p>

                            <div className="flex items-center justify-between mt-auto pt-3 border-t">
                                <div className="flex flex-col">
                                    {product.originalPrice && <span className="text-xs text-muted-foreground line-through">{product.originalPrice}€</span>}
                                    <span className="text-lg font-bold text-primary">{product.price}€</span>
                                </div>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={`https://wa.me/?text=Hola, interesado en ${product.title}`} target="_blank">
                                        Comprar
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

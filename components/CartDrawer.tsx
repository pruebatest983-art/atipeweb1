"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function CartDrawer() {
    const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, toggleCart } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={toggleCart}>
            <SheetContent className="flex flex-col w-full sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" /> Tu Carrito
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                            <ShoppingCart className="h-16 w-16 opacity-20" />
                            <p className="text-lg font-medium">El carrito está vacío</p>
                            <Button variant="outline" onClick={toggleCart}>
                                Seguir comprando
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-300">
                                        {/* Placeholder image */}
                                        <ShoppingCart className="h-8 w-8" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                                        <p className="text-sm font-bold text-primary">{item.price}€</p>
                                        <div className="flex items-center gap-3 pt-2">
                                            <div className="flex items-center border border-slate-200 rounded-md">
                                                <button
                                                    className="h-7 w-7 flex items-center justify-center hover:bg-slate-50 transition-colors"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    className="h-7 w-7 flex items-center justify-center hover:bg-slate-50 transition-colors"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <SheetFooter className="sm:justify-between flex-col sm:flex-col gap-4 border-t pt-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-base font-medium">
                                <span>Subtotal</span>
                                <span>{cartTotal.toFixed(2)}€</span>
                            </div>
                            <p className="text-xs text-slate-500">Impuestos y gastos de envío calculados en el pago.</p>
                        </div>
                        <Button className="w-full text-lg h-12" asChild>
                            <Link href="/checkout" onClick={toggleCart}>
                                Tramitar Pedido
                            </Link>
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}

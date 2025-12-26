"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShoppingCart, CreditCard, Home, Truck } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        toast.success("¡Pedido realizado con éxito!", {
            description: "Recibirás un email con los detalles de tu pedido."
        });

        clearCart();
        setLoading(false);
        router.push("/");
    };

    if (items.length === 0) {
        return (
            <main className="min-h-screen flex flex-col bg-slate-50">
                <Navbar />
                <div className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                    <div className="bg-white p-8 rounded-full shadow-lg mb-6">
                        <ShoppingCart className="h-16 w-16 text-slate-300" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Tu carrito está vacío</h1>
                    <p className="text-slate-600 mb-8 max-w-md">Parece que aún no has añadido nada a tu carrito. Explora nuestra tienda para encontrar los mejores productos.</p>
                    <Button asChild size="lg" className="rounded-xl h-12 px-8">
                        <Link href="/shop">Volver a la Tienda</Link>
                    </Button>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="flex-1 container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <CreditCard className="h-8 w-8 text-primary" /> Finalizar Compra
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Formulario de Envío */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-slate-200 shadow-sm rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-primary" /> Información de Envío</CardTitle>
                                <CardDescription>Introduce tus datos para el envío del pedido.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input id="firstName" required placeholder="Juan" className="rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Apellidos</Label>
                                            <Input id="lastName" required placeholder="Pérez" className="rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" required placeholder="juan@ejemplo.com" className="rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Dirección de entrega</Label>
                                        <Input id="address" required placeholder="C/ Principal 123, 2ºA" className="rounded-xl" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2 col-span-1">
                                            <Label htmlFor="zip">Código Postal</Label>
                                            <Input id="zip" required placeholder="39001" className="rounded-xl" />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="city">Ciudad</Label>
                                            <Input id="city" required placeholder="Santander" className="rounded-xl" />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-sm rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /> Método de Pago</CardTitle>
                                <CardDescription>Selecciona cómo quieres pagar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="p-4 border rounded-xl bg-slate-50 text-sm text-slate-600">
                                    Por el momento, solo aceptamos pago contra reembolso o transferencia bancaria. Nos pondremos en contacto contigo para finalizar el pago.
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="space-y-6">
                        <Card className="border-slate-200 shadow-sm rounded-2xl sticky top-24">
                            <CardHeader>
                                <CardTitle>Resumen del Pedido</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-slate-600 line-clamp-1 flex-1 pr-4">
                                                <span className="font-bold text-slate-900">{item.quantity}x</span> {item.title}
                                            </span>
                                            <span className="font-medium">{(item.price * item.quantity).toFixed(2)}€</span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Subtotal</span>
                                        <span>{cartTotal.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-slate-600">
                                        <span>Envío</span>
                                        <span>Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t mt-2">
                                        <span>Total</span>
                                        <span>{cartTotal.toFixed(2)}€</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full text-lg h-12 rounded-xl"
                                    type="submit"
                                    form="checkout-form"
                                    disabled={loading}
                                >
                                    {loading ? "Procesando..." : `Pagar ${cartTotal.toFixed(2)}€`}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

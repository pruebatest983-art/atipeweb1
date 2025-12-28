"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function QuotePage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            device: formData.get("device"),
            description: formData.get("description"),
            urgency: formData.get("urgency"),
        };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "budget",
                    data: data,
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert("Error al enviar la solicitud. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            console.error(error);
            alert("Error al enviar la solicitud.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen flex flex-col bg-slate-50">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full border animate-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">¡Solicitud Recibida!</h2>
                        <p className="text-muted-foreground mb-6">
                            Hemos recibido tu solicitud de presupuesto. Uno de nuestros técnicos analizará tu caso y te contactará en menos de 24 horas.
                        </p>
                        <Button asChild className="w-full">
                            <Link href="/">Volver al Inicio</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <div className="flex-1 container py-10">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <Button variant="ghost" size="sm" asChild className="gap-2 text-muted-foreground px-0 hover:bg-transparent hover:text-primary">
                            <Link href="/"><ArrowLeft className="h-4 w-4" /> Volver</Link>
                        </Button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Solicitar Presupuesto</h1>
                            <p className="text-muted-foreground">Rellena el formulario y te daremos un diagnóstico preliminar y coste estimado sin compromiso.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nombre Completo</label>
                                    <input required name="name" placeholder="Ej: Juan Pérez" className="w-full p-2.5 rounded-md border text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Teléfono</label>
                                    <input required name="phone" type="tel" placeholder="+34 600 000 000" className="w-full p-2.5 rounded-md border text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Correo Electrónico</label>
                                <input required name="email" type="email" placeholder="juan@ejemplo.com" className="w-full p-2.5 rounded-md border text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Dispositivo / Modelo</label>
                                <input required name="device" placeholder="Ej: iPhone 13 Pro, Portátil HP Pavilion..." className="w-full p-2.5 rounded-md border text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Descripción del Problema</label>
                                <textarea required name="description" rows={4} placeholder="Describe qué le pasa al dispositivo (pantalla rota, no enciende, va lento...)" className="w-full p-2.5 rounded-md border text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium block">Urgencia</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 border p-3 rounded-md w-full cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input type="radio" name="urgency" value="normal" defaultChecked className="accent-primary" />
                                        <span className="text-sm">Normal</span>
                                    </label>
                                    <label className="flex items-center gap-2 border p-3 rounded-md w-full cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input type="radio" name="urgency" value="urgent" className="accent-primary" />
                                        <span className="text-sm font-medium text-red-600">Urgente (+Express)</span>
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full text-lg mt-4 h-12" disabled={isLoading}>
                                {isLoading ? "Enviando..." : "Enviar Solicitud"} <Send className={cn("ml-2 h-4 w-4", isLoading && "hidden")} />
                            </Button>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Al enviar este formulario aceptas nuestra política de privacidad y el tratamiento de tus datos para gestionar el presupuesto.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

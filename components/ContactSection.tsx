"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "Contacto", // Contacto or Sugerencia
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Mensaje enviado correctamente (Simulación)");
        setFormData({ name: "", email: "", type: "Contacto", message: "" });
    };

    return (
        <section id="contacto" className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contáctanos</h2>
                            <p className="text-slate-500 md:text-xl">
                                ¿Tienes una duda o una sugerencia? Escríbenos.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Nombre</label>
                                    <input
                                        id="name"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="tucorreo@ejemplo.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Tipo de Mensaje</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="Contacto"
                                            checked={formData.type === "Contacto"}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="text-primary focus:ring-primary"
                                        />
                                        Consulta General
                                    </label>
                                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="Sugerencia"
                                            checked={formData.type === "Sugerencia"}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                            className="text-primary focus:ring-primary"
                                        />
                                        Sugerencia
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Mensaje</label>
                                <textarea
                                    id="message"
                                    required
                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="¿En qué podemos ayudarte?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <Button type="submit" className="w-full gap-2">
                                <Send className="h-4 w-4" /> Enviar Mensaje
                            </Button>
                        </form>
                    </div>

                    {/* Google Map */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Dónde Estamos</h2>
                            <p className="text-slate-500 md:text-xl">
                                Ven a visitarnos a nuestra tienda física en Santander.
                            </p>
                        </div>

                        <div className="bg-slate-200 rounded-xl overflow-hidden h-[400px] shadow-sm border relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2888.6508771383377!2d-3.819666623661858!3d43.46168997111246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd494a32a6858641%3A0x868c67995ac64949!2sC.%20el%20Profesor%20Jim%C3%A9nez%20D%C3%ADaz%2C%209%2C%2039007%20Santander%2C%20Cantabria!5e0!3m2!1ses!2ses!4v1703099999999!5m2!1ses!2ses"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

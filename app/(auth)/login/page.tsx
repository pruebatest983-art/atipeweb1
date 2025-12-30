"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Lock } from "lucide-react";
import { login } from "@/app/actions/auth";
import { useState } from "react";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        const result = await login(formData);
        if (result?.error) {
            setError("Contraseña incorrecta");
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg border w-full max-w-md mx-auto">
            <div className="mb-6 text-center">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Volver al inicio
                </Link>
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-slate-100 rounded-full">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Acceso Admin
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                    Introduce la contraseña de administrador
                </p>
            </div>

            <form action={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 hidden">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="block w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        placeholder="Contraseña..."
                    />
                </div>

                {error && (
                    <p className="text-sm text-red-500 font-medium text-center">{error}</p>
                )}

                <Button className="w-full" size="lg" type="submit">
                    Entrar
                </Button>
            </form>
        </div>
    );
}

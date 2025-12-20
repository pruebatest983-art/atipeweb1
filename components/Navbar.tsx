"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Logo Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo.png" alt="Atipe Computers Logo" className="h-10 w-auto object-contain" />
                    <span className="text-xl font-bold tracking-tight">ATIPE COMPUTERS</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">Inicio</Link>
                    <Link href="#servicios" className="transition-colors hover:text-primary">Servicios</Link>
                    <Link href="#productos" className="transition-colors hover:text-primary">Productos</Link>
                    <Link href="#contacto" className="transition-colors hover:text-primary">Contacto</Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="default" className="gap-2" asChild>
                        <Link href="/quote">
                            <Phone className="h-4 w-4" />
                            Solicitar Presupuesto
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/login">Acceso Cliente</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background">
                    <nav className="flex flex-col gap-4 text-sm font-medium">
                        <Link href="/" className="hover:text-primary" onClick={() => setIsOpen(false)}>Inicio</Link>
                        <Link href="#servicios" className="hover:text-primary" onClick={() => setIsOpen(false)}>Servicios</Link>
                        <Link href="#productos" className="hover:text-primary" onClick={() => setIsOpen(false)}>Productos</Link>
                        <Link href="#contacto" className="hover:text-primary" onClick={() => setIsOpen(false)}>Contacto</Link>
                    </nav>
                    <div className="flex flex-col gap-2 pt-4">
                        <Button className="w-full gap-2" asChild>
                            <Link href="/quote">
                                <Phone className="h-4 w-4" /> Solicitar Presupuesto
                            </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/login">Acceso Cliente</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}

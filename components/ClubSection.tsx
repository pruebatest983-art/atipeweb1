"use client";

import { Button } from "@/components/ui/button";
import { Check, Shield, Crown, Zap, Gift } from "lucide-react";
import Link from "next/link";

export function ClubSection() {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-500">
                            <Crown className="h-4 w-4 mr-2 fill-yellow-500" />
                            Club Premium
                        </div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                            La mejor tecnología,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                                trato VIP garantizado.
                            </span>
                        </h2>
                        <p className="max-w-[600px] text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Olvídate de los problemas informáticos. Con el Club Atipe, tienes un departamento técnico a tu disposición y beneficios exclusivos.
                        </p>

                        <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center lg:justify-start">
                            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold border-none" asChild>
                                <Link href="/register">Unirme al Club</Link>
                            </Button>
                            <Button variant="outline" size="lg" className="text-white border-white/30 hover:bg-white/10 hover:text-white hover:border-white/50" asChild>
                                <Link href="#contacto">Más Información</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Pricing Card */}
                    <div className="flex-1 w-full max-w-md relative">
                        {/* Floating Badge */}
                        <div className="absolute -top-6 -right-6 z-20 animate-bounce delay-1000 duration-3000">
                            <div className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg shadow-lg transform rotate-12 border-2 border-white">
                                ¡REGALO DE BIENVENIDA!
                            </div>
                        </div>

                        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-8 shadow-2xl overflow-hidden group hover:border-yellow-500/50 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="space-y-4 mb-8">
                                <h3 className="text-2xl font-semibold text-white">Suscripción Mensual</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">29€</span>
                                    <span className="text-slate-500">/mes</span>
                                </div>
                                <p className="text-sm text-slate-400">Todo incluido, sin letra pequeña.</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3 text-slate-300">
                                    <Shield className="h-5 w-5 text-yellow-500 shrink-0" />
                                    <span>
                                        <strong className="text-white">Antivirus ESET Security Premium</strong>
                                        <div className="text-xs text-yellow-500 font-semibold mt-0.5">GRATIS para nuevos socios (Valorado en 50€)</div>
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Zap className="h-5 w-5 text-yellow-500 shrink-0" />
                                    <span>Atención <strong className="text-white">personalizada y prioritaria</strong> (Salta la cola)</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Gift className="h-5 w-5 text-yellow-500 shrink-0" />
                                    <span>Acceso a <strong className="text-white">Ofertas Exclusivas</strong> y productos nuevos</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="h-5 w-5 text-yellow-500 shrink-0" />
                                    <span>Descuentos en mano de obra y reparaciones</span>
                                </li>
                            </ul>

                            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold h-12" asChild>
                                <Link href="/register">
                                    Quiero ser Socio
                                </Link>
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

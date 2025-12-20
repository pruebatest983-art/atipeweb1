import { Button } from "@/components/ui/button";
// import Image from "next/image"; // Will use if we have an image, for now use placeholders/gradients

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 md:pt-24 lg:pt-32 pb-12 bg-slate-50">
            <div className="container relative z-10 flex flex-col items-center text-center">

                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-6">
                    Servicio Técnico Especializado
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl mb-6">
                    Reparamos tu <span className="text-primary">Mundo Digital</span>
                </h1>

                <p className="max-w-[700px] text-lg text-muted-foreground mb-8 text-balance">
                    Expertos en reparación de ordenadores, móviles y consolas. Recuperamos tus datos y le damos una segunda vida a tus dispositivos en tiempo récord.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                        Solicitar Presupuesto Gratis
                    </Button>
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                        Ver Servicios
                    </Button>
                </div>

                {/* Feature Highlights */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-4xl">
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-3xl">1h</div>
                        <div className="text-sm text-muted-foreground">Reparaciones Express</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-3xl">25+</div>
                        <div className="text-sm text-muted-foreground">Años de experiencia</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-3xl">3 Meses</div>
                        <div className="text-sm text-muted-foreground">Garantía incluida</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-3xl">4.9/5</div>
                        <div className="text-sm text-muted-foreground">Valoración Clientes</div>
                    </div>
                </div>

            </div>

            {/* Background Decor */}
            <div className="absolute top-0 z-0 h-full w-full bg-slate-50 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none opacity-20" />
        </section>
    );
}

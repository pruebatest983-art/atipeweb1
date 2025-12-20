import { Wrench, Lightbulb, Zap } from "lucide-react";

export function Marquee() {
    return (
        <div className="bg-[#E11D48] text-white py-3 overflow-hidden relative"> {/* Using the specific red color from analysis */}
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
                <span className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
                    Lo importante que es conservar tu equipo informático bien mantenido para prevenir problemas y averías
                    <Wrench className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
                    En Atipe Computers mantenemos tu ordenador y consola
                    <Lightbulb className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
                    El mantenimiento preventivo evita muchas averías y alarga la vida de tu ordenador o consola
                    <Zap className="h-4 w-4" />
                </span>
                {/* Duplicate content for seamless loop */}
                <span className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
                    Lo importante que es conservar tu equipo informático bien mantenido para prevenir problemas y averías
                    <Wrench className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
                    En Atipe Computers mantenemos tu ordenador y consola
                    <Lightbulb className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-4 text-sm font-medium uppercase tracking-wider">
                    El mantenimiento preventivo evita muchas averías y alarga la vida de tu ordenador o consola
                    <Zap className="h-4 w-4" />
                </span>
            </div>
        </div>
    );
}

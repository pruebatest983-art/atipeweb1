import { Button } from "@/components/ui/button";
import { Gift, Percent, Award, Ticket } from "lucide-react";

const offers = [
    {
        title: "10% dto. en Accesorios",
        description: "Válido para fundas, protectores y cables.",
        code: "ATIPE10",
        expires: "30 días",
        icon: Percent,
        color: "bg-red-100 text-red-600",
    },
    {
        title: "Limpieza Gratuita",
        description: "Por cada reparación superior a 50€.",
        code: "CLEANFREE",
        expires: "Indefinido",
        icon: Gift,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Sorteo Mensual",
        description: "Participa en el sorteo de un iPad Air.",
        code: "AUTO-INSC",
        expires: "15 días",
        icon: Ticket,
        color: "bg-purple-100 text-purple-600",
    },
];

export default function OffersPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Club Atipe</h2>
                    <p className="text-muted-foreground">Ventajas exclusivas por ser parte de nuestra comunidad.</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-lg border border-yellow-200">
                    <Award className="h-5 w-5" />
                    <span className="font-bold">Nivel Plata: 1,250 Puntos</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer, index) => (
                    <div key={index} className="bg-white rounded-xl border shadow-sm p-6 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 p-3 rounded-bl-xl ${offer.color}`}>
                            <offer.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-xl pr-12 mb-2">{offer.title}</h3>
                        <p className="text-muted-foreground text-sm mb-6">{offer.description}</p>

                        <div className="bg-slate-50 p-3 rounded-lg flex items-center justify-between border border-dashed border-slate-300">
                            <code className="font-mono font-bold text-slate-700">{offer.code}</code>
                            <Button size="sm" variant="ghost" className="h-8">Copiar</Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                            Expira en: <span className="font-medium">{offer.expires}</span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-primary/5 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">¿Quieres ganar más puntos?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Completa lecciones en nuestra Academia Crypto y gana puntos canjeables por descuentos reales en tienda.
                </p>
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    Ir a la Academia
                </Button>
            </div>
        </div>
    );
}

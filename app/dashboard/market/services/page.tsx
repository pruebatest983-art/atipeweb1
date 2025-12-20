import { mockServices } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MapPin, Plus } from "lucide-react";

export default function ServicesMarketPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Bolsa de Servicios</h2>
                    <p className="text-muted-foreground">Encuentra talento técnico o publica tu oferta.</p>
                </div>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Publicar Servicio</Button>
            </div>

            <div className="grid gap-4">
                {mockServices.map((service) => (
                    <div key={service.id} className="bg-white p-6 rounded-lg border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{service.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {service.location}</span>
                                <span>•</span>
                                <span>Por: {service.user}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="text-lg font-bold text-primary">{service.price}</div>
                            <Button variant="outline" size="sm">Contactar</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

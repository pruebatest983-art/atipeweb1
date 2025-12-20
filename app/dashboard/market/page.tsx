import Link from "next/link";
import { Briefcase, ShoppingBag, ArrowRight } from "lucide-react";

export default function MarketPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Marketplace Atipe</h2>
                <p className="text-muted-foreground">Conecta con otros usuarios para ofrecer servicios o vender tecnología.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Services Market */}
                <Link href="/dashboard/market/services" className="group relative overflow-hidden rounded-xl border bg-white p-6 hover:shadow-lg transition-all hover:border-primary/50">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Briefcase className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Bolsa de Servicios</h3>
                            <p className="text-sm text-muted-foreground">Ofrece tus habilidades técnicas</p>
                        </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                        Publica tus servicios profesionales o encuentra técnicos cerca de ti para reparaciones a domicilio, configuraciones y más.
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                        Ver Ofertas <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                </Link>

                {/* Products Market */}
                <Link href="/dashboard/market/products" className="group relative overflow-hidden rounded-xl border bg-white p-6 hover:shadow-lg transition-all hover:border-primary/50">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-green-100 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            <ShoppingBag className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Segunda Mano</h3>
                            <p className="text-sm text-muted-foreground">Compra y vende electrónica</p>
                        </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                        Dales una segunda vida a tus dispositivos. Encuentra chollos en móviles, ordenadores y componentes.
                    </p>
                    <div className="flex items-center text-green-600 font-medium group-hover:translate-x-1 transition-transform">
                        Ver Productos <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                </Link>
            </div>
        </div>
    );
}

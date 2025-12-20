import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo, Juan</h2>
                <p className="text-muted-foreground">Aquí tienes un resumen de tu actividad en Atipe Computers.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Status Card */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 ">
                        <h3 className="font-semibold leading-none tracking-tight">Reparaciones Activas</h3>
                        <p className="text-sm text-muted-foreground">Estado de tus dispositivos</p>
                    </div>
                    <div className="p-0 pt-4">
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground mt-1">iPhone 13 - En Taller</p>
                    </div>
                </div>

                {/* Club Points Card */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 ">
                        <h3 className="font-semibold leading-none tracking-tight">Puntos Club Atipe</h3>
                        <p className="text-sm text-muted-foreground">Tus recompensas acumuladas</p>
                    </div>
                    <div className="p-0 pt-4">
                        <div className="text-2xl font-bold text-primary">1,250</div>
                        <p className="text-xs text-muted-foreground mt-1">Equivalente a 12.50€</p>
                    </div>
                </div>

                {/* Academy Progress */}
                <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <div className="flex flex-col space-y-1.5 ">
                        <h3 className="font-semibold leading-none tracking-tight">Academia Crypto</h3>
                        <p className="text-sm text-muted-foreground">Tu progreso actual</p>
                    </div>
                    <div className="p-0 pt-4">
                        <div className="text-2xl font-bold">35%</div>
                        <div className="h-2 w-full bg-slate-100 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-yellow-500 w-[35%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-lg font-medium mb-4">Acciones Rápidas</h3>
                <div className="flex gap-4">
                    <Button>Nueva Reparación</Button>
                    <Button variant="outline">Ver Ofertas</Button>
                    <Button variant="secondary">Continuar Curso</Button>
                </div>
            </div>
        </div>
    );
}

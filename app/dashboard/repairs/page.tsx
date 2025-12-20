import { mockRepairs } from "@/lib/data";
import { Badge } from "@/components/ui/badge"; // Need to create Badge or just use tailwind for now. I'll use tailwind span.
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

export default function RepairsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Mis Reparaciones</h2>
                    <p className="text-muted-foreground">Historial y seguimiento de tus dispositivos.</p>
                </div>
                <Button>Nueva Solicitud</Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
                <div className="p-0">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 font-medium">ID / Dispositivo</th>
                                <th className="px-6 py-3 font-medium">Problema</th>
                                <th className="px-6 py-3 font-medium">Fecha</th>
                                <th className="px-6 py-3 font-medium">Estado</th>
                                <th className="px-6 py-3 font-medium">Presupuesto</th>
                                <th className="px-6 py-3 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRepairs.map((repair) => (
                                <tr key={repair.id} className="bg-white border-b hover:bg-gray-50 bg-white">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{repair.device}</div>
                                        <div className="text-xs text-muted-foreground">{repair.id}</div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate">
                                        {repair.issue}
                                    </td>
                                    <td className="px-6 py-4">
                                        {repair.dateReceived}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${repair.status === 'Finalizado' || repair.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                                                repair.status === 'En Reparación' ? 'bg-blue-100 text-blue-800' :
                                                    repair.status === 'Diagnóstico' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'}`}>
                                            {repair.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {repair.costEstimate > 0 ? `${repair.costEstimate}€` : "Pendiente"}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/dashboard/repairs/${repair.id}`}>
                                                <span className="sr-only">Ver</span>
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        {repair.status === 'Finalizado' && (
                                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

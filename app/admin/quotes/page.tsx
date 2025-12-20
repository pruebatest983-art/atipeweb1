"use client";

import { mockQuotes } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function AdminQuotesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Solicitudes de Presupuesto</h2>
                    <p className="text-muted-foreground">Gestiona las peticiones de valoración online.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por cliente o dispositivo..."
                        className="w-full pl-9 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2"><Clock className="h-4 w-4" /> Pendientes</Button>
                    <Button variant="outline" size="sm" className="gap-2"><CheckCircle className="h-4 w-4" /> Procesados</Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium">Cliente</th>
                            <th className="px-6 py-3 font-medium">Dispositivo & Problema</th>
                            <th className="px-6 py-3 font-medium">Urgencia</th>
                            <th className="px-6 py-3 font-medium">Estado</th>
                            <th className="px-6 py-3 font-medium">Fecha</th>
                            <th className="px-6 py-3 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockQuotes.map((quote) => (
                            <tr key={quote.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900">{quote.name}</div>
                                    <div className="text-xs text-muted-foreground">{quote.email}</div>
                                    <div className="text-xs text-muted-foreground">{quote.phone}</div>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <div className="font-bold text-slate-800">{quote.device}</div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{quote.description}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {quote.urgency === 'Urgente' ? (
                                        <Badge variant="destructive" className="gap-1">
                                            <AlertCircle className="h-3 w-3" /> Urgente
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline">Normal</Badge>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <Badge className={
                                        quote.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                                            quote.status === 'Contactado' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                                'bg-green-100 text-green-800 hover:bg-green-100'
                                    }>
                                        {quote.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">
                                    {quote.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Button size="sm" variant="secondary" className="gap-2">
                                        <FileText className="h-3 w-3" /> Generar Presupuesto
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

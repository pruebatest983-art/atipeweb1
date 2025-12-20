"use client";

import { mockRepairs, RepairStatus } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";
import Link from "next/link";

export default function AdminRepairsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Reparaciones</h2>
                    <p className="text-muted-foreground">Control total del taller.</p>
                </div>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Nueva Entrada</Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por ID, Cliente o Dispositivo..."
                        className="w-full pl-9 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" /> Filtros
                </Button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3 font-medium">ID</th>
                            <th className="px-6 py-3 font-medium">Dispositivo</th>
                            <th className="px-6 py-3 font-medium">Problema</th>
                            <th className="px-6 py-3 font-medium">Fecha Entrada</th>
                            <th className="px-6 py-3 font-medium">Estado</th>
                            <th className="px-6 py-3 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockRepairs.map((repair) => (
                            <tr key={repair.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-mono text-xs">{repair.id}</td>
                                <td className="px-6 py-4 font-medium">{repair.device}</td>
                                <td className="px-6 py-4 truncate max-w-[200px]">{repair.issue}</td>
                                <td className="px-6 py-4 text-muted-foreground">{repair.dateReceived}</td>
                                <td className="px-6 py-4">
                                    <select
                                        className="block w-full rounded-md border-gray-300 py-1.5 text-xs text-gray-900 shadow-sm focus:border-primary focus:ring-primary sm:max-w-xs sm:text-sm"
                                        defaultValue={repair.status}
                                    >
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50" asChild>
                                        <a href={`https://wa.me/?text=Hola, te escribo desde Atipe Computers sobre tu reparación ${repair.id}`} target="_blank" rel="noopener noreferrer">
                                            <span className="sr-only">WhatsApp</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                                        </a>
                                    </Button>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Editar</span>
                                        ✏️
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

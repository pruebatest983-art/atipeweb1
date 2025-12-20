"use client";

import { mockMessages } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Mail, Trash2, CheckCircle } from "lucide-react";

export default function AdminMessagesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Buzón de Mensajes</h2>
                    <p className="text-muted-foreground">Gestiona consultas y sugerencias web.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o contenido..."
                        className="w-full pl-9 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-50">Todos</Button>
                    <Button variant="ghost" size="sm">No leídos</Button>
                    <Button variant="ghost" size="sm">Sugerencias</Button>
                </div>
            </div>

            <div className="grid gap-4">
                {mockMessages.map((msg) => (
                    <div key={msg.id} className={`bg-white p-4 rounded-lg border shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center ${!msg.read ? 'border-l-4 border-l-primary' : ''}`}>
                        <div className="p-2 bg-slate-100 rounded-full">
                            <Mail className={`h-5 w-5 ${!msg.read ? 'text-primary' : 'text-slate-400'}`} />
                        </div>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900">{msg.name}</span>
                                <span className="text-xs text-muted-foreground">&lt;{msg.email}&gt;</span>
                                <span className="text-xs text-muted-foreground ml-2">• {msg.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={msg.type === 'Sugerencia' ? 'secondary' : 'outline'}>{msg.type}</Badge>
                                <p className="text-sm text-slate-600 line-clamp-1">{msg.message}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto">
                            <Button size="sm" variant="ghost" title="Marcar como leído">
                                <CheckCircle className="h-4 w-4 text-slate-400 hover:text-green-600" />
                            </Button>
                            <Button size="sm" variant="ghost" title="Eliminar">
                                <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-600" />
                            </Button>
                            <Button size="sm" variant="outline">Ver Detalles</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

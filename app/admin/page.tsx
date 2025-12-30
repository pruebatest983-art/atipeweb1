"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockRepairs, mockMessages, mockProducts, mockQuotes } from "@/lib/data";
import { Wrench, Mail, ShoppingBag, FileText, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
    // Calculate stats
    const activeRepairs = mockRepairs.filter(r => r.status !== "Entregado" && r.status !== "Finalizado").length;
    const unreadMessages = mockMessages.filter(m => !m.read).length;
    const lowStockProducts = mockProducts.filter(p => p.stock < 5).length;
    const pendingQuotes = mockQuotes.filter(q => q.status === "Pendiente").length;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                <p className="text-muted-foreground">Bienvenido al panel de administración de Atipe Computers.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reparaciones Activas</CardTitle>
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeRepairs}</div>
                        <p className="text-xs text-muted-foreground">
                            {mockRepairs.length} totales registradas
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mensajes No Leídos</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{unreadMessages}</div>
                        <p className="text-xs text-muted-foreground">
                            {mockMessages.length} mensajes en total
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
                        <p className="text-xs text-muted-foreground">
                            Productos con menos de 5 unidades
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Presupuestos Pendientes</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingQuotes}</div>
                        <p className="text-xs text-muted-foreground">
                            Solicitudes sin responder
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Mock activity feed */}
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Nueva solicitud de presupuesto</p>
                                    <p className="text-sm text-muted-foreground">Manuel García - iPad Air 4</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">Hace 2h</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Reparación Finalizada</p>
                                    <p className="text-sm text-muted-foreground">REP-2023-089 (PS5)</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">Hace 5h</div>
                            </div>
                            <div className="flex items-center">
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Mensaje recibido</p>
                                    <p className="text-sm text-muted-foreground">Laura Gómez - Consulta Xiaomi</p>
                                </div>
                                <div className="ml-auto font-medium text-sm text-muted-foreground">Ayer</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Accesos Rápidos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <a href="/admin/repairs" className="flex items-center p-2 hover:bg-slate-100 rounded-md transition-colors">
                                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                                <span className="text-sm">Nueva Reparación</span>
                            </a>
                            <a href="/admin/products/new" className="flex items-center p-2 hover:bg-slate-100 rounded-md transition-colors">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                <span className="text-sm">Añadir Producto</span>
                            </a>
                            <a href="/admin/messages" className="flex items-center p-2 hover:bg-slate-100 rounded-md transition-colors">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                                <span className="text-sm">Ver Mensajes</span>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

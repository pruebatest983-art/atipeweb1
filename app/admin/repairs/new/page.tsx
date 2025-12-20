"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Printer } from "lucide-react";
import Link from "next/link";
import { useReactToPrint } from "react-to-print";

export default function NewRepairPage() {
    const [formData, setFormData] = useState({
        partNumber: `REP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        clientName: "",
        clientPhone: "",
        devicePassword: "",
        issue: "",
        device: "",
    });

    const labelRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: labelRef, // Updated for newer versions or standard usage
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/repairs">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold">Nueva Reparación</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white p-6 rounded-lg border shadow-sm space-y-4">
                    <h2 className="font-semibold text-lg border-b pb-2">Datos de Entrada</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">Número de Parte / ID</label>
                        <input disabled name="partNumber" value={formData.partNumber} className="w-full p-2 border rounded bg-slate-50 font-mono text-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre del Cliente</label>
                        <input name="clientName" onChange={handleChange} placeholder="Ej: Juan Pérez" className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Teléfono</label>
                        <input name="clientPhone" onChange={handleChange} placeholder="+34 600 000 000" className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Dispositivo</label>
                        <input name="device" onChange={handleChange} placeholder="Ej: iPhone 13, Portátil HP..." className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña Windows / PIN</label>
                        <input name="devicePassword" onChange={handleChange} placeholder="Opcional" className="w-full p-2 border rounded" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Avería / Problema</label>
                        <textarea name="issue" onChange={handleChange} rows={3} placeholder="Describe el problema..." className="w-full p-2 border rounded" />
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button className="flex-1">Guardar Reparación</Button>
                        <Button type="button" variant="secondary" onClick={() => handlePrint()} className="gap-2">
                            <Printer className="h-4 w-4" /> Imprimir Etiqueta
                        </Button>
                    </div>
                </div>

                {/* Label Preview */}
                <div>
                    <h2 className="font-semibold text-lg mb-4">Vista Previa Etiqueta</h2>
                    <div className="border border-dashed p-4 rounded-lg bg-slate-50 flex justify-center">

                        {/* Printable Area */}
                        <div ref={labelRef} className="bg-white border p-4 w-[80mm] h-[80mm] text-xs flex flex-col shadow-sm print:shadow-none print:border-none">
                            <div className="text-center border-b pb-2 mb-2">
                                <h3 className="font-bold text-lg">ATIPE COMPUTERS</h3>
                                <p className="text-[10px]">Servicio Técnico Especializado</p>
                                <p className="font-mono font-bold text-md mt-1">{formData.partNumber}</p>
                            </div>

                            <div className="space-y-1 flex-1 text-sm">
                                <p><span className="font-bold">ID:</span> {formData.partNumber}</p>
                                <p><span className="font-bold">Cliente:</span> {formData.clientName}</p>
                                <p><span className="font-bold">Tel:</span> {formData.clientPhone}</p>
                                <p><span className="font-bold">Equipo:</span> {formData.device}</p>
                                <div className="mt-2 border-t pt-2">
                                    <span className="font-bold">Avería:</span>
                                    <p className="line-clamp-4 leading-tight">{formData.issue}</p>
                                </div>
                            </div>

                            <div className="text-[9px] text-center text-slate-400 mt-auto pt-2">
                                {new Date().toLocaleString()}
                            </div>
                        </div>

                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        * Ajusta la escala de impresión si es necesario. Tamaño diseñado para etiquetas de 80mm.
                    </p>
                </div>
            </div>
        </div>
    );
}

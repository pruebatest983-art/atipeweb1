import Link from "next/link";
import { Wrench, Users, LayoutDashboard, LogOut, Mail, Package, FileText } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar - Dark for Admin */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight">ATIPE <span className="text-primary">ADMIN</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/repairs" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md bg-primary/20 text-primary border border-primary/20">
                        <Wrench className="h-5 w-5" />
                        Reparaciones
                    </Link>
                    <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                        <Users className="h-5 w-5" />
                        <span>Clientes</span>
                    </Link>
                    <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                        <Mail className="h-5 w-5" />
                        <span>Mensajes</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                        <Package className="h-5 w-5" />
                        <span>Ofertas</span>
                    </Link>
                    <Link href="/admin/quotes" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors">
                        <FileText className="h-5 w-5" />
                        <span>Presupuestos</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Salir
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 text-black">
                {children}
            </main>
        </div>
    );
}

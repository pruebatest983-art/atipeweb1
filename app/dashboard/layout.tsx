import Link from "next/link";
import { Wrench, ShoppingBag, GraduationCap, Percent, LogOut, Home, User } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold tracking-tight text-primary">ATIPE <span className="text-slate-900">APP</span></h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md bg-primary/5 text-primary">
                        <Home className="h-5 w-5" />
                        Inicio
                    </Link>
                    <Link href="/dashboard/repairs" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <Wrench className="h-5 w-5" />
                        Mis Reparaciones
                    </Link>
                    <Link href="/dashboard/market" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <ShoppingBag className="h-5 w-5" />
                        Marketplace
                    </Link>
                    <Link href="/dashboard/academy" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <GraduationCap className="h-5 w-5" />
                        Academia Crypto
                    </Link>
                    <Link href="/dashboard/offers" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <Percent className="h-5 w-5" />
                        Club Atipe
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md text-slate-600 hover:bg-slate-50 hover:text-primary transition-colors">
                        <User className="h-5 w-5" />
                        Mi Perfil
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}

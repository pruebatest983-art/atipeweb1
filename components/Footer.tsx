import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-slate-50">
            <div className="container py-10 grid gap-8 md:grid-cols-3">

                {/* Brand & Social */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">ATIPE COMPUTERS</h3>
                    <p className="text-sm text-muted-foreground">
                        Especialistas en reparación de tecnología. Tu confianza es nuestra garantía.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                        {/* Using Twitter icon for X/Twitter substitution if needed, or stick to generic */}
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Enlaces</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:text-primary">Sobre Nosotros</Link></li>
                        <li><Link href="#servicios" className="hover:text-primary">Servicios</Link></li>
                        <li><Link href="#" className="hover:text-primary">Política de Privacidad</Link></li>
                        <li><Link href="#" className="hover:text-primary">Términos y Condiciones</Link></li>
                    </ul>
                </div>

                {/* Contact info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Contacto</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <MapPin className="h-5 w-5 text-primary shrink-0" />
                            <span>Calle Prof. Jiménez Díaz, 9, Santander, 39007</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="h-5 w-5 text-primary shrink-0" />
                            <span>+34 630 60 60 16</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary shrink-0" />
                            <span>info@atipecomputers.com</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Atipe Computers. Todos los derechos reservados.
            </div>
        </footer>
    );
}

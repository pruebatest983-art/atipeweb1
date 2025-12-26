import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/lib/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { CartDrawer } from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATIPE Computers | Reparación de Ordenadores y Móviles en Cantabria",
  description: "Servicio técnico especializado en reparación de ordenadores, móviles y consolas. Expertos en Apple, PC, iPhone y Android. ¡Presupuesto gratuito!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <CartProvider>
          {children}
          <CartDrawer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}

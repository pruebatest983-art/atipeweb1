import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ContactSection } from "@/components/ContactSection";
import { ProductsSection } from "@/components/ProductsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ClubSection } from "@/components/ClubSection";
import { ProductSlideshow } from "@/components/ProductSlideshow";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Truck, PackageCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Marquee />
      <Hero />
      <ProductSlideshow />

      {/* Informática Store Info */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">También somos <span className="text-primary">Tu Tienda de Informática</span></h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto italic">
              "Venta de todo tipo de componentes, periféricos, accesorios y consumibles con stock real y envío 24h a toda España."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-6">
                <PackageCheck size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Todo en Tecnología</h3>
              <p className="text-slate-500">Portátiles, PCs a medida, periféricos (teclados, ratones, monitores) y accesorios de todas las marcas.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-6">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Stock 24h</h3>
              <p className="text-slate-500">Disponibilidad inmediata en miles de productos. Si lo necesitas hoy, lo tenemos hoy.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full text-primary mb-6">
                <Truck size={32} />
              </div>
              <h3 className="font-bold text-xl mb-2">Venta Nacional</h3>
              <p className="text-slate-500">Envíos rápidos a cualquier punto de España. Compra con confianza y garantía total.</p>
            </div>
          </div>
        </div>
      </section>

      <ServiceGrid />
      <ProductsSection />
      <ClubSection />
      <ReviewsSection />
      <ContactSection />
      <FloatingWhatsApp />

      {/* Short CTA Section */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tu dispositivo no funciona?</h2>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            No pierdas tiempo. Tráelo a Atipe Computers y te daremos una solución rápida y económica.
          </p>
          <Button size="lg" className="text-lg font-bold py-6 px-10 rounded-xl" asChild>
            <a href="https://wa.me/34630606016" target="_blank" rel="noopener noreferrer">
              Contactar por WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

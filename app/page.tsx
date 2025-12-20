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

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <Marquee />
      <Hero />
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
          <button className="bg-primary text-white font-bold py-3 px-8 rounded-md hover:bg-primary/90 transition-colors">
            Contactar por WhatsApp
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}

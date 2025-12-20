import { Smartphone, Laptop, Monitor, Gamepad2, Battery, Database, HardDrive, Cpu, Globe } from "lucide-react";

const services = [
    {
        title: "Móviles y Tablets",
        description: "Cambio de pantalla, batería, conector de carga. iPhone, Samsung, Xiaomi.",
        icon: Smartphone,
    },
    {
        title: "Ordenadores Portátiles",
        description: "Reparación de placa base, cambio de teclado, pantalla y mejoras SSD.",
        icon: Laptop,
    },
    {
        title: "Ordenadores de Sobremesa",
        description: "Montaje de PCs gaming, limpieza interna, formateo y optimización.",
        icon: Monitor,
    },
    {
        title: "Consolas",
        description: "PlayStation, Xbox, Nintendo Switch. Problemas de HDMI, lector o temperatura.",
        icon: Gamepad2,
    },
    {
        title: "Cambio de Batería",
        description: "Baterías originales o compatibles de alta calidad para todos los modelos.",
        icon: Battery,
    },
    {
        title: "Recuperación de Datos",
        description: "Recuperamos tus fotos y documentos de discos duros dañados o móviles mojados.",
        icon: Database,
    },
    {
        title: "Ampliaciones",
        description: "Mejora la velocidad de tu equipo con discos SSD y más memoria RAM.",
        icon: HardDrive,
    },
    {
        title: "Microsoldadura",
        description: "Reparaciones avanzadas de placa base a nivel de componente.",
        icon: Cpu,
    },
    {
        title: "Soporte Remoto Online",
        description: "Solución de problemas de software y configuración a distancia sin moverte de casa.",
        icon: Globe,
    },
];

export function ServiceGrid() {
    return (
        <section id="servicios" className="py-20 bg-white">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Servicios Profesionales</h2>
                    <p className="text-muted-foreground text-lg">
                        Cubrimos todas tus necesidades tecnológicas con un servicio rápido, transparente y garantizado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-lg transition-all hover:border-primary/50">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                                <service.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

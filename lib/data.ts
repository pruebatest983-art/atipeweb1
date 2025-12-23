export type RepairStatus = "Recibido" | "Diagnóstico" | "En Reparación" | "Esperando Pieza" | "Finalizado" | "Entregado";

export interface Repair {
    id: string;
    device: string;
    issue: string;
    status: RepairStatus;
    costEstimate: number;
    dateReceived: string;
    notes: string;
}

export const mockRepairs: Repair[] = [
    {
        id: "REP-2024-001",
        device: "iPhone 13 Pro",
        issue: "Pantalla rota y batería drenada",
        status: "En Reparación",
        costEstimate: 120.00,
        dateReceived: "2024-12-18",
        notes: "Cliente necesita factura.",
    },
    {
        id: "REP-2024-002",
        device: "MacBook Air M1",
        issue: "Derrame de líquido, no enciende",
        status: "Diagnóstico",
        costEstimate: 0,
        dateReceived: "2024-12-19",
        notes: "Urgentísimo. Estudiante.",
    },
    {
        id: "REP-2023-089",
        device: "PS5",
        issue: "Puerto HDMI dañado",
        status: "Finalizado",
        costEstimate: 85.00,
        dateReceived: "2023-11-20",
        notes: "Limpieza ventilador incluida.",
    }
];

export const mockLessons = [
    { id: "intro-bitcoin", title: "1. ¿Qué es Bitcoin?", duration: "5 min", completed: true, locked: false },
    { id: "blockchain-basics", title: "2. Fundamentos de Blockchain", duration: "8 min", completed: false, locked: false },
    { id: "wallets", title: "3. Tipos de Billeteras (Wallets)", duration: "10 min", completed: false, locked: true },
    { id: "security", title: "4. Seguridad y Estafas Comunes", duration: "12 min", completed: false, locked: true },
    { id: "defi", title: "5. Introducción a DeFi", duration: "15 min", completed: false, locked: true }
];

export const mockServices = [
    { id: 1, title: "Técnico de Redes", user: "Carlos M.", location: "Santander", price: "20€/h", description: "Configuración de routers, WiFi y cableado estructurado." },
    { id: 2, title: "Limpieza de Virus", user: "Ana R.", location: "Torrelavega", price: "30€", description: "Eliminación de malware y optimización de PC." },
    { id: 3, title: "Montaje de PCs", user: "David G.", location: "Bezana", price: "50€", description: "Asesoramiento y montaje de equipos gaming." }
];

export interface Category {
    id: string | number;
    name: string;
    slug: string;
}

export interface Product {
    id: string | number;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    categoryId: string | number; // reference to Category.id
    sku: string;
    stock: number;
    brand?: string;
    status: "Disponible" | "Vendido";
}

export const mockCategories: Category[] = [
    { id: 1, name: "Móvil", slug: "movil" },
    { id: 2, name: "Ordenador", slug: "ordenador" },
    { id: 3, name: "Consola", slug: "consola" },
    { id: 4, name: "Accesorio", slug: "accesorio" }
];

export const mockProducts: Product[] = [
    { id: 1, title: "iPhone 11 64GB - Reacondicionado", description: "Batería al 100%. Cristal impoluto. Incluye cargador.", price: 299, originalPrice: 350, image: "iphone", categoryId: 1, sku: "IP11-64R", stock: 12, brand: "Apple", status: "Disponible" },
    { id: 2, title: "Portátil Gaming HP Omen", description: "i7 10th Gen, 16GB RAM, RTX 2060. Perfecto estado.", price: 650, originalPrice: 899, image: "laptop", categoryId: 2, sku: "HP-OMEN-G", stock: 5, brand: "HP", status: "Disponible" },
    { id: 3, title: "PS4 Slim 500GB + Mando", description: "Limpieza interna recién hecha. Pasta térmica cambiada.", price: 180, originalPrice: 220, image: "console", categoryId: 3, sku: "PS4SLIM", stock: 8, brand: "Sony", status: "Disponible" },
    { id: 4, title: "Monitor Dell 24' IPS", description: "Full HD, sin píxeles muertos. Peana ajustable.", price: 95, originalPrice: 140, image: "monitor", categoryId: 4, sku: "DELL-M24", stock: 20, brand: "Dell", status: "Disponible" }
];

export const mockMessages = [
    { id: 1, name: "Laura Gómez", email: "laura@example.com", type: "Contacto", message: "Hola, ¿reparáis pantallas de Xiaomi?", date: "2024-12-20", read: false },
    { id: 2, name: "Pedro Ruiz", email: "pedro@example.com", type: "Sugerencia", message: "Deberíais abrir los sábados por la tarde.", date: "2024-12-19", read: true },
    { id: 3, name: "Maria San", email: "maria@example.com", type: "Contacto", message: "Presupuesto para PC Gaming.", date: "2024-12-18", read: true },
];

export const mockReviews = [
    { id: 1, author: "Ana Martínez", rating: 5, date: "Hace 2 semanas", text: "Excelente servicio. Me arreglaron la pantalla del móvil en 1 hora. Muy recomendables.", image: "" },
    { id: 2, author: "Carlos Ruiz", rating: 5, date: "Hace 1 mes", text: "Grandes profesionales. Compré un portátil reacondicionado y funciona de maravilla.", image: "" },
    { id: 3, author: "Elena López", rating: 4, date: "Hace 3 meses", text: "Buen trato y rápidos. El precio me pareció justo para la calidad del servicio.", image: "" },
    { id: 4, author: "David Sánchez", rating: 5, date: "Hace 1 semana", text: "Salvaron todos los datos de mi disco duro cuando ya lo daba por perdido. ¡Gracias!", image: "" }
];

export interface Quote {
    id: number;
    name: string;
    email: string;
    phone: string;
    device: string;
    description: string;
    urgency: "Normal" | "Urgente";
    status: "Pendiente" | "Contactado" | "Presupuestado";
    date: string;
}

export const mockQuotes: Quote[] = [
    { id: 1, name: "Manuel García", email: "manuel@test.com", phone: "600123456", device: "iPad Air 4", description: "Pantalla rota, no funciona el táctil en la esquina superior.", urgency: "Normal", status: "Pendiente", date: "2024-12-20" },
    { id: 2, name: "Sofía Martín", email: "sofia@test.com", phone: "610987654", device: "PC Sobremesa", description: "Hace mucho ruido el ventilador y se apaga solo.", urgency: "Urgente", status: "Contactado", date: "2024-12-19" },
];

export interface HeroSlide {
    id: number;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: "image" | "video";
    link?: string;
}

export const mockHeroSlides: HeroSlide[] = [
    {
        id: 1,
        title: "Promoción Kaspersky",
        description: "Regalos increíbles por la compra de licencias.",
        mediaUrl: "/slides/slide1.png",
        mediaType: "image",
        link: "#productos"
    },
    {
        id: 2,
        title: "Balizas de Emergencia V16",
        description: "Obligatorias en 2026. Consigue la tuya ahora.",
        mediaUrl: "/slides/slide2.png",
        mediaType: "image",
        link: "#productos"
    }
];

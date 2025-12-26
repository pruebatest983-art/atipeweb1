
import { mockLessons } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
    return mockLessons.map((lesson) => ({
        lessonId: lesson.id,
    }));
}

export const dynamicParams = false;

export default function LessonPage({ params }: { params: { lessonId: string } }) {
    const lesson = mockLessons.find(l => l.id === params.lessonId);

    if (!lesson) {
        return <div className="p-8">Lección no encontrada</div>;
    }

    const currentIndex = mockLessons.findIndex(l => l.id === params.lessonId);
    const prevLesson = mockLessons[currentIndex - 1];
    const nextLesson = mockLessons[currentIndex + 1];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <Link href="/dashboard/academy" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Volver al Temario
                </Link>
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
            </div>

            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <p className="text-white font-medium">Contenido de video exclusivo para miembros de Club Atipe</p>
                </div>
                <div className="h-16 w-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                </div>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
                <Button variant="outline" disabled={!prevLesson} asChild={!!prevLesson}>
                    {prevLesson ? (
                        <Link href={`/dashboard/academy/${prevLesson.id}`}>
                            <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
                        </Link>
                    ) : (
                        <span><ChevronLeft className="h-4 w-4 mr-2" /> Anterior</span>
                    )}
                </Button>

                <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
                    <CheckCircle className="h-4 w-4" /> Marcar como Completado
                </Button>

                <Button variant="outline" disabled={!nextLesson} asChild={!!nextLesson}>
                    {nextLesson ? (
                        <Link href={`/dashboard/academy/${nextLesson.id}`}>
                            Siguiente <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                    ) : (
                        <span>Siguiente <ChevronRight className="h-4 w-4 ml-2" /></span>
                    )}
                </Button>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-lg">Resumen de la lección</h3>
                <p className="text-muted-foreground leading-relaxed">
                    En esta lección aprenderemos los conceptos fundamentales de {lesson.title}.
                    Exploraremos cómo funciona la tecnología subyacente y por qué es revolucionaria para el futuro de las finanzas.
                </p>
            </div>
        </div>
    );
}

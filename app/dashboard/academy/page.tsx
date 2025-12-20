import { mockLessons } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle, Lock, Trophy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AcademyPage() {
    const completedCount = mockLessons.filter(l => l.completed).length;
    const progress = Math.round((completedCount / mockLessons.length) * 100);

    return (
        <div className="space-y-8">
            {/* Header with Progress */}
            <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Curso Crypto: De Cero a Experto</h2>
                    <p className="text-slate-300 mb-6 max-w-xl">
                        Domina las criptomonedas con nuestro curso gratuito exclusivo para clientes.
                        Aprende sobre Bitcoin, Ethereum y seguridad financiera.
                    </p>

                    <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm font-bold text-primary">{progress}% Completado</span>
                        <span className="text-sm text-slate-400">{completedCount}/{mockLessons.length} Lecciones</span>
                    </div>
                    <div className="w-full max-w-md bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                {/* Decorative background icon */}
                <Trophy className="absolute right-8 bottom-[-20px] h-48 w-48 text-slate-800 rotate-12" />
            </div>

            {/* Lesson List */}
            <div className="bg-white rounded-xl border shadow-sm divide-y">
                {mockLessons.map((lesson) => (
                    <div key={lesson.id} className={cn("p-4 flex items-center justify-between hover:bg-slate-50 transition-colors", lesson.locked && "opacity-60 bg-slate-50")}>
                        <div className="flex items-center gap-4">
                            <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                                lesson.completed ? "bg-green-100 text-green-600" :
                                    lesson.locked ? "bg-slate-200 text-slate-500" : "bg-primary/10 text-primary"
                            )}>
                                {lesson.completed ? <CheckCircle className="h-5 w-5" /> : lesson.locked ? <Lock className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                            </div>
                        </div>

                        <div>
                            {lesson.locked ? (
                                <Button variant="ghost" size="sm" disabled>Bloqueado</Button>
                            ) : (
                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={`/dashboard/academy/${lesson.id}`}>
                                        {lesson.completed ? "Repasar" : "Empezar"}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

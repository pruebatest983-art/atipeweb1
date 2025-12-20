"use client";

import { mockReviews } from "@/lib/data";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReviewsSection() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                        <Star className="w-3 h-3 mr-1 fill-yellow-600 text-yellow-600" />
                        4.9/5 en Google Reviews
                    </div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Lo que dicen nuestros clientes</h2>
                    <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-balance">
                        La satisfacción de nuestros clientes es nuestra mejor garantía.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockReviews.map((review) => (
                        <div key={review.id} className="flex flex-col p-6 bg-white rounded-xl shadow-sm border relative">
                            <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-100 rotate-180" />

                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            "w-4 h-4",
                                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200"
                                        )}
                                    />
                                ))}
                            </div>

                            <p className="text-slate-600 text-sm mb-6 flex-1 italic">"{review.text}"</p>

                            <div className="flex items-center gap-3 mt-auto pt-4 border-t">
                                <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                    {review.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-slate-900">{review.author}</p>
                                    <p className="text-xs text-slate-400">{review.date}</p>
                                </div>
                                <div className="ml-auto">
                                    {/* Google G icon mock */}
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockHeroSlides } from '@/lib/data';
import Image from 'next/image';

export function ProductSlideshow() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);

        const intervalId = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [emblaApi, onSelect]);

    return (
        <section className="bg-white py-10 overflow-hidden">
            <div className="container relative group">
                <div className="overflow-hidden rounded-2xl shadow-2xl" ref={emblaRef}>
                    <div className="flex">
                        {mockHeroSlides.map((slide) => (
                            <div className="flex-[0_0_100%] min-w-0 relative h-[300px] md:h-[450px]" key={slide.id}>
                                {slide.mediaType === 'image' ? (
                                    <img
                                        src={slide.mediaUrl}
                                        alt={slide.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        src={slide.mediaUrl}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-12 md:px-24">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        className="text-white text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter"
                                    >
                                        {slide.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-white/90 text-lg md:text-xl max-w-md mb-8"
                                    >
                                        {slide.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                                            Ver Oferta
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                >
                    <ChevronLeft size={30} />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                >
                    <ChevronRight size={30} />
                </button>

                <div className="flex justify-center gap-2 mt-6">
                    {mockHeroSlides.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-8 bg-primary' : 'w-2 bg-slate-300 hover:bg-slate-400 cursor-pointer'
                                }`}
                            onClick={() => emblaApi?.scrollTo(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import React, { useState } from 'react';
import { mockHeroSlides, HeroSlide } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Film } from 'lucide-react';

export default function AdminSlidesPage() {
    const [slides, setSlides] = useState<HeroSlide[]>(mockHeroSlides);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<HeroSlide | null>(null);

    const handleEdit = (slide: HeroSlide) => {
        setIsEditing(slide.id);
        setEditForm({ ...slide });
    };

    const handleSave = () => {
        if (editForm) {
            setSlides(slides.map(s => s.id === editForm.id ? editForm : s));
            setIsEditing(null);
            setEditForm(null);
            // In a real app, we would call an API here
            alert("Cambios guardados localmente (Mock)");
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("¿Estás seguro de eliminar esta diapositiva?")) {
            setSlides(slides.filter(s => s.id !== id));
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Gestión de Slideshow</h1>
                    <p className="text-slate-500">Administra las imágenes y vídeos de la página principal</p>
                </div>
                <Button className="bg-primary">
                    <Plus className="mr-2 h-4 w-4" /> Añadir Diapositiva
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide) => (
                    <Card key={slide.id} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                        <div className="aspect-video relative bg-slate-100">
                            {slide.mediaType === 'image' ? (
                                <img src={slide.mediaUrl} alt={slide.title} className="w-full h-full object-cover" />
                            ) : (
                                <video src={slide.mediaUrl} className="w-full h-full object-cover" muted />
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Button size="icon" variant="secondary" onClick={() => handleEdit(slide)}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="destructive" onClick={() => handleDelete(slide.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="p-4">
                            {isEditing === slide.id && editForm ? (
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Título</Label>
                                        <Input
                                            value={editForm.title}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Descripción</Label>
                                        <Input
                                            value={editForm.description}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>URL Multimedia</Label>
                                        <Input
                                            value={editForm.mediaUrl}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, mediaUrl: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-2 pt-2">
                                        <Button className="flex-1" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Guardar</Button>
                                        <Button variant="outline" onClick={() => setIsEditing(null)}><X className="mr-2 h-4 w-4" /> Cancelar</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        {slide.mediaType === 'image' ? <ImageIcon size={16} className="text-slate-400" /> : <Film size={16} className="text-slate-400" />}
                                        <span className="text-xs font-bold uppercase text-slate-400">{slide.mediaType}</span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{slide.title}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-2">{slide.description}</p>
                                </>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

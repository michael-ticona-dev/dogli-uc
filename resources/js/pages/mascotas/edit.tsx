import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { PetCase, Pet } from '@/types';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';

import { MapPin } from 'lucide-react';

interface EditProps {
    petCase: PetCase;
}

export default function Edit({ petCase }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        status: petCase.status,
        description: petCase.description,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('mascotas.update', petCase.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Mascotas', href: route('mascotas.index') },
                { title: petCase.pet?.name || 'Mascota', href: route('mascotas.show', petCase.id) },
                { title: 'Editar', href: '#' },
            ]}
        >
            <Head title="Editar Publicación" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Editar Publicación</h2>

                        <form onSubmit={submit} className="space-y-6">

                            {/* Read-only info */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                <h3 className="font-semibold text-gray-700 mb-2">Información de la Mascota</h3>
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-lg overflow-hidden">
                                        {petCase.pet?.photo_path ? (
                                            <img src={petCase.pet.photo_path} alt={petCase.pet.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-2xl">🐾</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{petCase.pet?.name}</p>
                                        <p className="text-sm text-gray-600">{petCase.pet?.breed} • {petCase.type === 'lost' ? 'Perdido' : 'Encontrado'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado del Caso</label>
                                <select
                                    id="status"
                                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as any)}
                                >
                                    <option value="open">Abierto (Buscando)</option>
                                    <option value="closed">Cerrado</option>
                                    <option value="resolved">Resuelto (Encontrado/Entregado)</option>
                                </select>
                                <InputError message={errors.status} className="mt-2" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <textarea
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                />
                                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

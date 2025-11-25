import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { User } from '@/types';

export default function Create({ shelter }: { shelter: User }) {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        message: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('donaciones.store', shelter.id));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Refugios', href: route('refugios.index') },
                { title: shelter.name, href: route('refugios.show', shelter.id) },
                { title: 'Donar', href: '#' },
            ]}
        >
            <Head title={`Donar a ${shelter.name}`} />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="text-center mb-8">
                            <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl mx-auto mb-4">
                                {shelter.name.charAt(0)}
                            </div>
                            <h2 className="text-2xl font-bold">Donar a {shelter.shelter_profile?.official_name || shelter.name}</h2>
                            <p className="text-gray-500 text-sm mt-1">Tu ayuda hace la diferencia</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Monto de Donación (Soles)</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">S/</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={e => setData('amount', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="0.00"
                                        min="1"
                                        required
                                    />
                                </div>
                                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mensaje de apoyo (Opcional)</label>
                                <textarea
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="¡Gracias por su labor!"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition font-bold text-lg shadow-lg"
                            >
                                {processing ? 'Procesando...' : 'Confirmar Donación'}
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Esta es una simulación. No se realizará ningún cargo real.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

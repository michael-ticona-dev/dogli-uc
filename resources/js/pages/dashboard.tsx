import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Map, Heart, PawPrint, PlusCircle } from 'lucide-react';

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: route('dashboard') }]}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 p-4">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg">
                    <h1 className="text-3xl font-bold mb-2">¡Bienvenido al Radar de Mascotas! 🐾</h1>
                    <p className="text-blue-100 max-w-2xl">
                        Ayudamos a reunir mascotas perdidas con sus dueños y a encontrar hogares para aquellos que lo necesitan.
                        ¿Qué te gustaría hacer hoy?
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                        <Link
                            href={route('mascotas.create')}
                            className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition flex items-center gap-2"
                        >
                            <PlusCircle size={20} />
                            Reportar Mascota
                        </Link>
                        <Link
                            href={route('mascotas.index')}
                            className="bg-blue-700 text-white border border-blue-400 px-6 py-2 rounded-full font-bold hover:bg-blue-800 transition flex items-center gap-2"
                        >
                            <Map size={20} />
                            Ver Radar
                        </Link>
                    </div>
                </div>

                {/* Quick Stats / Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href={route('mascotas.index', { type: 'lost' })} className="group">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition h-full">
                            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition">
                                <Map size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Mascotas Perdidas</h3>
                            <p className="text-gray-500 text-sm">
                                Revisa los reportes recientes de mascotas perdidas en tu zona.
                            </p>
                        </div>
                    </Link>

                    <Link href={route('mascotas.index', { type: 'adoption' })} className="group">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition h-full">
                            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition">
                                <PawPrint size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Adopta un Amigo</h3>
                            <p className="text-gray-500 text-sm">
                                Dale un hogar a una mascota que lo necesita.
                            </p>
                        </div>
                    </Link>

                    <Link href={route('refugios.index')} className="group">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition h-full">
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Apoya Refugios</h3>
                            <p className="text-gray-500 text-sm">
                                Conoce las fundaciones y realiza donaciones para apoyar su causa.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}

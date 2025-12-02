import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Map, Heart, PawPrint, PlusCircle, Trash2, Eye, Calendar } from 'lucide-react';
import { PetCase, User } from '@/types';

interface DashboardProps {
    user: User;
    stats: any;
    recentCases: PetCase[];
}

export default function Dashboard({ user, stats, recentCases }: DashboardProps) {
    const handleDelete = (id: number) => {
        console.log('Attempting to delete case:', id);
        if (confirm('¿Estás seguro de que deseas eliminar este reporte? Esta acción no se puede deshacer.')) {
            router.delete(`/mascotas/${id}`, {
                onSuccess: () => {
                    console.log('Deletion successful');
                    // Optional: Manually refresh or show success message if needed
                },
                onError: (errors) => {
                    console.error('Deletion failed:', errors);
                    alert('Error al eliminar: ' + JSON.stringify(errors));
                },
                onFinish: () => {
                    console.log('Delete request finished');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: route('dashboard') }]}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 p-4">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold mb-2">¡Hola, {user.name}! 👋</h1>
                        <p className="text-blue-100 max-w-2xl mb-6">
                            Bienvenido a tu panel de control. Aquí puedes gestionar tus reportes y ver la actividad reciente.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route('mascotas.create')}
                                className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold hover:bg-blue-50 transition flex items-center gap-2 shadow-sm"
                            >
                                <PlusCircle size={20} />
                                Reportar Mascota
                            </Link>
                            <Link
                                href={route('mascotas.index')}
                                className="bg-blue-700/50 text-white border border-blue-400/30 px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition flex items-center gap-2 backdrop-blur-sm"
                            >
                                <Map size={20} />
                                Ver Radar
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Actions */}
                    <div className="space-y-8">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-3xl font-bold text-gray-800">{stats.my_cases}</div>
                                <div className="text-sm text-gray-500">Mis Reportes</div>
                            </div>
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <div className="text-3xl font-bold text-gray-800">{stats.active_cases}</div>
                                <div className="text-sm text-gray-500">Activos</div>
                            </div>
                        </div>

                        {/* Navigation Cards */}
                        <div className="grid grid-cols-1 gap-4">
                            <Link href={route('mascotas.index', { type: 'lost' })} className="group">
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-4">
                                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:scale-110 transition">
                                        <Map size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Mascotas Perdidas</h3>
                                        <p className="text-xs text-gray-500">Ver reportes en tu zona</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href={route('mascotas.index', { type: 'adoption' })} className="group">
                                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-4">
                                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:scale-110 transition">
                                        <PawPrint size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">Adopta un Amigo</h3>
                                        <p className="text-xs text-gray-500">Encuentra tu compañero ideal</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: My Recent Reports */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-800">Mis Reportes Recientes</h2>
                                <Link href={route('mascotas.index')} className="text-sm text-blue-600 hover:underline">
                                    Ver todos
                                </Link>
                            </div>

                            {recentCases.length > 0 ? (
                                <div className="divide-y divide-gray-100">
                                    {recentCases.map((petCase) => (
                                        <div key={petCase.id} className="p-6 flex items-center gap-4 hover:bg-gray-50 transition">
                                            <div className="h-16 w-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                                {petCase.pet?.photo_path ? (
                                                    <img
                                                        src={petCase.pet.photo_path}
                                                        alt={petCase.pet.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-2xl">🐾</div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900 truncate">
                                                        {petCase.pet?.name || 'Sin nombre'}
                                                    </h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${petCase.type === 'lost' ? 'bg-red-100 text-red-700' :
                                                        petCase.type === 'found' ? 'bg-green-100 text-green-700' :
                                                            'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {petCase.type === 'lost' ? 'Perdido' :
                                                            petCase.type === 'found' ? 'Encontrado' : 'Adopción'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {new Date(petCase.created_at).toLocaleDateString()}
                                                    </span>
                                                    <span>{petCase.pet?.breed || 'Mestizo'}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('mascotas.edit', petCase.id)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Editar reporte"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                                                </Link>
                                                <Link
                                                    href={route('mascotas.show', petCase.id)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                    title="Ver detalles"
                                                >
                                                    <Eye size={20} />
                                                </Link>
                                                <Link
                                                    href={`/mascotas/${petCase.id}`}
                                                    method="delete"
                                                    as="button"
                                                    onBefore={() => {
                                                        return confirm('¿Estás seguro de que deseas eliminar este reporte? Esta acción no se puede deshacer.');
                                                    }}
                                                    onSuccess={() => console.log('Deleted successfully')}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                    title="Eliminar reporte"
                                                >
                                                    <Trash2 size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-gray-500">
                                    <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <PawPrint className="text-gray-400" />
                                    </div>
                                    <p>No tienes reportes activos.</p>
                                    <Link
                                        href={route('mascotas.create')}
                                        className="text-blue-600 hover:underline mt-2 inline-block"
                                    >
                                        Crear mi primer reporte
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

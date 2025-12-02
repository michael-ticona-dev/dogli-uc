import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import UserAvatar from '@/components/user-avatar';
import { User, PetCase } from '@/types';
import { PawPrint, Heart, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    user: User;
    stats: {
        my_cases: number;
        active_cases: number;
        resolved_cases: number;
        followers: number;
        following: number;
        adoption_listings: number;
        successful_adoptions: number;
        total_donations: number;
        recent_donations: Array<{
            id: number;
            amount: number;
            donor: User;
            created_at: string;
        }>;
    };
    recentCases: PetCase[];
}

export default function ShelterDashboard({ user, stats, recentCases }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: route('dashboard') }]}>
            <Head title="Dashboard - Albergue" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Welcome Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Bienvenido, {user.shelter_profile?.official_name || user.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Gestiona tus animales en adopción y revisa tus estadísticas
                        </p>
                    </div>
                    <Link href={route('mascotas.create')}>
                        <Button size="lg" className="flex items-center gap-2">
                            <Plus size={20} />
                            Publicar Animal
                        </Button>
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-purple-100 dark:border-purple-900">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                <PawPrint className="text-purple-600" size={24} />
                            </div>
                            <TrendingUp className="text-green-500" size={20} />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stats.adoption_listings}</div>
                        <div className="text-sm text-gray-500">En Adopción</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-green-100 dark:border-green-900">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                                <Heart className="text-green-600" size={24} />
                            </div>
                            <TrendingUp className="text-green-500" size={20} />
                        </div>
                        <div className="text-3xl font-bold mb-1">{stats.successful_adoptions}</div>
                        <div className="text-sm text-gray-500">Adoptados</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-blue-100 dark:border-blue-900">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <Users className="text-blue-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">{stats.followers}</div>
                        <div className="text-sm text-gray-500">Seguidores</div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-yellow-100 dark:border-yellow-900">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                <DollarSign className="text-yellow-600" size={24} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">${stats.total_donations.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Donaciones Recibidas</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Active Listings */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Animales Activos</h2>
                            <Link href={route('mascotas.index')}>
                                <Button variant="outline" size="sm">Ver Todos</Button>
                            </Link>
                        </div>

                        {recentCases.length > 0 ? (
                            <div className="space-y-3">
                                {recentCases.map((petCase) => (
                                    <div
                                        key={petCase.id}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                            {petCase.pet?.photo_path ? (
                                                <img
                                                    src={petCase.pet.photo_path}
                                                    alt={petCase.pet.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-2xl">🐾</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold truncate">{petCase.pet?.name || 'Sin nombre'}</div>
                                            <div className="text-sm text-gray-500">
                                                {petCase.pet?.species} • {petCase.pet?.breed || 'Mestizo'}
                                            </div>
                                            <div className="flex gap-2 mt-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${petCase.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {petCase.status === 'open' ? 'Activo' : 'Cerrado'}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${petCase.type === 'adoption' ? 'bg-purple-100 text-purple-700' :
                                                        petCase.type === 'lost' ? 'bg-red-100 text-red-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {petCase.type === 'adoption' ? 'Adopción' :
                                                        petCase.type === 'lost' ? 'Perdido' : 'Encontrado'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={route('mascotas.show', petCase.id)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Ver detalles"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                href={route('mascotas.edit', petCase.id)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Editar"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <Link
                                                href={`/mascotas/${petCase.id}`}
                                                method="delete"
                                                as="button"
                                                onBefore={() => {
                                                    return confirm('¿Estás seguro de que deseas eliminar esta publicación?');
                                                }}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                <PawPrint size={48} className="mx-auto mb-3 opacity-30" />
                                <p>No hay animales publicados</p>
                                <Link href={route('mascotas.create')} className="mt-4 inline-block">
                                    <Button size="sm">Publicar Primero</Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Recent Donations */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Donaciones Recientes</h2>
                        </div>

                        {stats.recent_donations && stats.recent_donations.length > 0 ? (
                            <div className="space-y-3">
                                {stats.recent_donations.map((donation) => (
                                    <div
                                        key={donation.id}
                                        className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                                    >
                                        <UserAvatar user={donation.donor} size="sm" />
                                        <div className="flex-1">
                                            <div className="font-semibold">{donation.donor.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(donation.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold text-green-600">
                                            ${donation.amount}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-400">
                                <Heart size={48} className="mx-auto mb-3 opacity-30" />
                                <p>No hay donaciones aún</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-sm p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">Acciones Rápidas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href={route('mascotas.create')}>
                            <div className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg p-4 transition cursor-pointer">
                                <Plus className="mb-2" size={24} />
                                <div className="font-semibold">Publicar Animal</div>
                                <div className="text-sm opacity-90">Añade un nuevo animal en adopción</div>
                            </div>
                        </Link>
                        <Link href={route('perfil.show', user.id)}>
                            <div className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg p-4 transition cursor-pointer">
                                <Users className="mb-2" size={24} />
                                <div className="font-semibold">Ver Perfil</div>
                                <div className="text-sm opacity-90">Revisa tu perfil público</div>
                            </div>
                        </Link>
                        <Link href={route('refugios.index')}>
                            <div className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg p-4 transition cursor-pointer">
                                <Heart className="mb-2" size={24} />
                                <div className="font-semibold">Otros Albergues</div>
                                <div className="text-sm opacity-90">Conecta con otros albergues</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

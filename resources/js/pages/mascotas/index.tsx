import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { PetCase, Pagination } from '@/types';
import PetMap from '@/components/pet-map';
import { MapPin, Heart, Coins, Calendar, Filter, Search } from 'lucide-react';

export default function Index({ cases, filters }: { cases: Pagination<PetCase>, filters: any }) {
    const hasCases = cases?.data?.length > 0;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Radar de Mascotas', href: route('mascotas.index') },
            ]}
        >
            <Head title="Radar de Mascotas" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
                {/* Header Section */}
                <div className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    Radar de Mascotas
                                </h1>
                                <p className="mt-2 text-slate-600">
                                    Encuentra mascotas perdidas, encontradas y en adopción en Arequipa
                                </p>
                            </div>
                            <Link
                                href={route('mascotas.create')}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Publicar Caso
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                {/* Filter Card */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Filter className="h-5 w-5 text-indigo-600" />
                                        <h2 className="text-lg font-semibold text-slate-900">Filtros</h2>
                                    </div>

                                    <div className="space-y-2">
                                        <Link
                                            href={route('mascotas.index')}
                                            className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${!filters.type
                                                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            Todas
                                        </Link>
                                        <Link
                                            href={route('mascotas.index', { type: 'lost' })}
                                            className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${filters.type === 'lost'
                                                ? 'bg-red-50 text-red-700 shadow-sm'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>Perdidas</span>
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-semibold text-red-700">
                                                    🔍
                                                </span>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route('mascotas.index', { type: 'found' })}
                                            className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${filters.type === 'found'
                                                ? 'bg-green-50 text-green-700 shadow-sm'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>Encontradas</span>
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                                                    ✓
                                                </span>
                                            </div>
                                        </Link>
                                        <Link
                                            href={route('mascotas.index', { type: 'adoption' })}
                                            className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-150 ${filters.type === 'adoption'
                                                ? 'bg-purple-50 text-purple-700 shadow-sm'
                                                : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>En Adopción</span>
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-700">
                                                    💜
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                {/* Stats Card */}
                                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm">
                                    <h3 className="text-sm font-semibold text-slate-900 mb-4">Estadísticas</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">Total de casos</span>
                                            <span className="font-semibold text-indigo-600">{cases.data.length}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600">Con recompensa</span>
                                            <span className="font-semibold text-amber-600">
                                                {cases.data.filter(c => c.reward_amount).length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="lg:col-span-3 space-y-8">
                            {/* Map Section */}
                            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                                <div className="p-6 border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-indigo-600" />
                                        <h2 className="text-lg font-semibold text-slate-900">Mapa de Arequipa</h2>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Ubicaciones de mascotas en tiempo real
                                    </p>
                                </div>
                                <div className="relative">
                                    <PetMap
                                        cases={hasCases ? cases.data : []}
                                        className="h-[400px] w-full"
                                    />
                                    {!hasCases && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                                            <p className="text-slate-500">No hay casos para mostrar en el mapa</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Cases Grid */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        {filters.type === 'lost' ? 'Mascotas Perdidas' :
                                            filters.type === 'found' ? 'Mascotas Encontradas' :
                                                filters.type === 'adoption' ? 'En Adopción' : 'Todos los Casos'}
                                    </h2>
                                    <span className="text-sm text-slate-500">
                                        {cases.data.length} {cases.data.length === 1 ? 'caso' : 'casos'}
                                    </span>
                                </div>

                                {hasCases ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {cases.data.map((petCase) => (
                                            <Link
                                                key={petCase.id}
                                                href={route('mascotas.show', petCase.id)}
                                                className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                                            >
                                                {/* Image */}
                                                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden">
                                                    {petCase.pet?.photo_path ? (
                                                        <img
                                                            src={petCase.pet.photo_path}
                                                            alt={petCase.pet.name}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <span className="text-6xl opacity-30">🐾</span>
                                                    )}
                                                </div>

                                                {/* Type Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm ${petCase.type === 'lost'
                                                            ? 'bg-red-500/90 text-white'
                                                            : petCase.type === 'found'
                                                                ? 'bg-green-500/90 text-white'
                                                                : 'bg-purple-500/90 text-white'
                                                            }`}
                                                    >
                                                        {petCase.type === 'lost' ? '🔍 Perdido' :
                                                            petCase.type === 'found' ? '✓ Encontrado' :
                                                                '💜 Adopción'}
                                                    </span>
                                                </div>

                                                {/* Content */}
                                                <div className="p-5 space-y-3">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                            {petCase.pet?.name || 'Sin nombre'}
                                                        </h3>
                                                        <p className="text-sm text-slate-500 mt-1">
                                                            {petCase.pet?.species} · {petCase.pet?.breed || 'Mestizo'}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm text-slate-600 line-clamp-2">
                                                        {petCase.description}
                                                    </p>

                                                    {/* Reward */}
                                                    {petCase.reward_amount && (
                                                        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 border border-amber-200">
                                                            <Coins className="h-4 w-4 text-amber-600" />
                                                            <span className="text-sm font-semibold text-amber-700">
                                                                Recompensa: S/ {petCase.reward_amount}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>
                                                                {new Date(petCase.created_at).toLocaleDateString('es-PE', {
                                                                    day: 'numeric',
                                                                    month: 'short'
                                                                })}
                                                            </span>
                                                        </div>
                                                        <span className="text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
                                                            Ver detalles →
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    // Empty State
                                    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center">
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                            <Search className="h-8 w-8 text-slate-400" />
                                        </div>
                                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                            No hay casos en esta categoría
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto">
                                            No se encontraron mascotas {
                                                filters.type === 'lost' ? 'perdidas' :
                                                    filters.type === 'found' ? 'encontradas' :
                                                        filters.type === 'adoption' ? 'en adopción' : 'registradas'
                                            }. Prueba con otros filtros o publica un caso.
                                        </p>
                                        <Link
                                            href={route('mascotas.create')}
                                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
                                        >
                                            Publicar caso
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

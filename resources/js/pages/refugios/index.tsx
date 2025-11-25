import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { User, Pagination } from '@/types';
import { MapPin, Heart, CheckCircle, ExternalLink, HandHeart } from 'lucide-react';

export default function Index({ shelters }: { shelters: Pagination<User> }) {
    const hasShelters = shelters?.data?.length > 0;

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Refugios', href: route('refugios.index') },
            ]}
        >
            <Head title="Refugios y Fundaciones" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/20">
                {/* Header */}
                <div className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    Refugios y Fundaciones
                                </h1>
                                <p className="mt-2 text-slate-600">
                                    Organizaciones verificadas dedicadas al cuidado animal en Arequipa
                                </p>
                            </div>
                            <Link
                                href={route('mascotas.index')}
                                className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-50"
                            >
                                Ver radar de adopciones
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    {hasShelters ? (
                        <>
                            {/* Stats Bar */}
                            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                                            <CheckCircle className="h-6 w-6 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">{shelters.data.length}</p>
                                            <p className="text-sm text-slate-600">Refugios Verificados</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                                            <Heart className="h-6 w-6 text-rose-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">100%</p>
                                            <p className="text-sm text-slate-600">Sin fines de lucro</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                                            <MapPin className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-slate-900">Arequipa</p>
                                            <p className="text-sm text-slate-600">Ciudad Ciudad Blanca</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shelters Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {shelters.data.map((shelter) => (
                                    <div
                                        key={shelter.id}
                                        className="group relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        {/* Header with gradient */}
                                        <div className="h-24 bg-gradient-to-br from-emerald-500 via-emerald-400 to-teal-400 relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
                                            {shelter.is_verified && (
                                                <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Verificado
                                                </div>
                                            )}
                                        </div>

                                        {/* Avatar */}
                                        <div className="relative px-6 -mt-10 mb-4">
                                            <div className="h-20 w-20 rounded-2xl border-4 border-white bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-lg">
                                                <span className="text-3xl font-bold text-emerald-700">
                                                    {shelter.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-6 pb-6 space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                                    {shelter.shelter_profile?.official_name || shelter.name}
                                                </h3>
                                                <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="line-clamp-1">
                                                        {shelter.shelter_profile?.address || 'Arequipa, Perú'}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                {shelter.shelter_profile?.bio || 'Refugio dedicado al cuidado y protección de animales en Arequipa.'}
                                            </p>

                                            {/* Website if available */}
                                            {shelter.shelter_profile?.website && (
                                                <a
                                                    href={shelter.shelter_profile.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-500 transition-colors"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    Sitio web
                                                </a>
                                            )}

                                            {/* Actions */}
                                            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100">
                                                <Link
                                                    href={route('refugios.show', shelter.id)}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-500 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-150 hover:bg-emerald-50"
                                                >
                                                    Ver Perfil
                                                </Link>
                                                <Link
                                                    href={route('donaciones.create', shelter.id)}
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
                                                >
                                                    <HandHeart className="h-4 w-4" />
                                                    Donar
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination would go here if needed */}
                        </>
                    ) : (
                        // Empty State
                        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-16 text-center">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                                <Heart className="h-10 w-10 text-slate-400" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-slate-900">
                                No hay refugios registrados aún
                            </h3>
                            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                                Pronto tendremos más refugios y fundaciones verificadas trabajando por el bienestar animal en Arequipa.
                            </p>
                        </div>
                    )}

                    {/* Info Banner */}
                    <div className="mt-12 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                                <Heart className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-900">¿Eres un refugio?</h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    Si representas una organización dedicada al cuidado animal y deseas unirte a nuestra plataforma,
                                    contáctanos para el proceso de verificación. Ofrecemos herramientas para gestionar adopciones,
                                    recibir donaciones y aumentar tu visibilidad.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                                >
                                    Registrar mi refugio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

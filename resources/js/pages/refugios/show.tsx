import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { User, PetCase } from '@/types';

export default function Show({ shelter, cases }: { shelter: User, cases: PetCase[] }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Refugios', href: route('refugios.index') },
                { title: shelter.name, href: '#' },
            ]}
        >
            <Head title={shelter.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Banner if available */}
                    {shelter.shelter_profile?.banner_path && (
                        <div className="w-full h-48 md:h-64 rounded-t-lg overflow-hidden mb-[-2rem] relative z-0">
                            <img
                                src={shelter.shelter_profile.banner_path}
                                alt="Banner"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    )}

                    {/* Header Profile */}
                    <div className={`bg-white overflow-hidden shadow-sm sm:rounded-lg p-8 mb-8 text-center md:text-left md:flex md:items-start md:gap-8 border border-slate-200 relative z-10 ${shelter.shelter_profile?.banner_path ? 'pt-12' : ''}`}>
                        <div className="h-32 w-32 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-4xl mx-auto md:mx-0 border-4 border-white shadow-lg overflow-hidden shrink-0">
                            {shelter.shelter_profile?.logo_path ? (
                                <img
                                    src={shelter.shelter_profile.logo_path}
                                    alt={shelter.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                shelter.name.charAt(0)
                            )}
                        </div>
                        <div className="flex-1 mt-4 md:mt-0">
                            <h1 className="text-3xl font-bold text-slate-900">{shelter.shelter_profile?.official_name || shelter.name}</h1>
                            <p className="text-slate-500 mt-1">{shelter.shelter_profile?.address}</p>

                            <p className="mt-4 text-slate-700 max-w-2xl">
                                {shelter.shelter_profile?.bio || 'Este refugio no ha añadido una biografía aún.'}
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link
                                    href={route('donaciones.create', shelter.id)}
                                    className="bg-[#FB7185] text-white px-8 py-3 rounded-md hover:bg-[#f43f5e] transition font-semibold"
                                >
                                    Hacer una Donación
                                </Link>
                                {shelter.shelter_profile?.website && (
                                    <a
                                        href={shelter.shelter_profile.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-slate-300 text-slate-700 px-6 py-3 rounded-md hover:bg-slate-50 transition"
                                    >
                                        Visitar Sitio Web
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Active Cases */}
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Mascotas en este Refugio</h2>

                    {cases.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {cases.map((petCase) => (
                                <Link key={petCase.id} href={route('mascotas.show', petCase.id)} className="block group">
                                    <div className="bg-white rounded-lg shadow overflow-hidden group-hover:shadow-md transition border border-slate-200">
                                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                                            {petCase.pet?.photo_path ? (
                                                <img src={petCase.pet.photo_path} alt={petCase.pet.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <span className="text-gray-400 text-4xl">🐾</span>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg group-hover:text-emerald-700 transition">{petCase.pet?.name}</h3>
                                            <span className={`text-xs px-2 py-1 rounded-full ${petCase.type === 'adoption'
                                                ? 'bg-[#DCFCE7] text-[#166534]'
                                                : petCase.type === 'lost'
                                                    ? 'bg-[#FEE2E2] text-[#B91C1C]'
                                                    : 'bg-[#FFEDD5] text-[#9A3412]'
                                                }`}>
                                                {petCase.type === 'adoption' ? 'Listo para adoptar' : petCase.type === 'lost' ? 'Urgente' : 'En recuperación'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-center py-12 bg-white rounded-lg border border-slate-200">Este refugio no tiene publicaciones activas por el momento.</p>
                    )}

                </div>
            </div>
        </AppLayout>
    );
}

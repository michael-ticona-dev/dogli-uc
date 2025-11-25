import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import UserAvatar from '@/components/user-avatar';
import { route } from '@/lib/route';
import { User, PetCase } from '@/types';
import { Users, Heart, MapPin, Calendar, Phone, Globe, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    profile: User;
    stats: {
        pet_cases: number;
        pets_found: number;
        followers: number;
        following: number;
    };
    isFollowing: boolean;
    isOwnProfile: boolean;
}

export default function ShelterProfile({ profile, stats, isFollowing, isOwnProfile }: Props) {
    const shelter = profile.shelter_profile;

    const handleFollow = () => {
        if (isFollowing) {
            router.post(route('perfil.unfollow', profile.id));
        } else {
            router.post(route('perfil.follow', profile.id));
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Albergues', href: route('refugios.index') },
            { title: profile.name, href: route('perfil.show', profile.id) }
        ]}>
            <Head title={`${profile.name} - Albergue`} />

            <div className="max-w-6xl mx-auto p-6">
                {/* Shelter Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-6">
                    {/* Cover Area */}
                    <div className="h-32 bg-gradient-to-r from-purple-600 to-indigo-600"></div>

                    {/* Profile Info */}
                    <div className="px-8 pb-8">
                        <div className="flex items-end justify-between -mt-16 mb-6">
                            <div className="flex items-end gap-6">
                                <UserAvatar
                                    user={profile}
                                    size="xl"
                                    className="ring-4 ring-white dark:ring-gray-800"
                                />
                                <div className="mb-2">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h1 className="text-3xl font-bold">{shelter?.official_name || profile.name}</h1>
                                        {profile.is_verified && (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                                ✓ Verificado
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {shelter?.bio || 'Organización dedicada al rescate y adopción de animales'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {!isOwnProfile && (
                                    <>
                                        <Button
                                            onClick={handleFollow}
                                            variant={isFollowing ? "outline" : "default"}
                                            className="flex items-center gap-2"
                                        >
                                            <Users size={18} />
                                            {isFollowing ? 'Siguiendo' : 'Seguir'}
                                        </Button>
                                        <Link href={route('donaciones.create', profile.id)}>
                                            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                                                <Heart size={18} />
                                                Donar
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
                            {shelter?.address && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} />
                                    <span>{shelter.address}</span>
                                </div>
                            )}
                            {profile.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={16} />
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                            {shelter?.website && (
                                <a
                                    href={shelter.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 hover:text-purple-600"
                                >
                                    <Globe size={16} />
                                    <span>Sitio Web</span>
                                </a>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">{stats.pet_cases}</div>
                                <div className="text-sm text-gray-500">Casos Activos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{stats.pets_found}</div>
                                <div className="text-sm text-gray-500">Adoptados</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{stats.followers}</div>
                                <div className="text-sm text-gray-500">Seguidores</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-indigo-600">{stats.following}</div>
                                <div className="text-sm text-gray-500">Siguiendo</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animals Available for Adoption */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Animales en Adopción</h2>
                        {isOwnProfile && (
                            <Link href={route('mascotas.create')}>
                                <Button size="sm">+ Publicar Animal</Button>
                            </Link>
                        )}
                    </div>

                    {profile.pet_cases && profile.pet_cases.filter((c: PetCase) => c.status === 'open').length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {profile.pet_cases.filter((c: PetCase) => c.status === 'open').map((petCase: PetCase) => (
                                <Link
                                    key={petCase.id}
                                    href={route('mascotas.show', petCase.id)}
                                    className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
                                >
                                    {/* Pet Image Placeholder */}
                                    <div className="aspect-square bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center">
                                        <div className="text-6xl">🐾</div>
                                    </div>

                                    {/* Pet Info */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-lg group-hover:text-purple-600 transition">
                                                {petCase.pet?.name || 'Sin nombre'}
                                            </h3>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${petCase.type === 'adoption' ? 'bg-purple-100 text-purple-700' :
                                                    petCase.type === 'lost' ? 'bg-red-100 text-red-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {petCase.type === 'adoption' ? '❤️ Adopción' :
                                                    petCase.type === 'lost' ? '🔍 Perdido' : '✅ Encontrado'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            {petCase.pet?.species} • {petCase.pet?.breed || 'Mestizo'}
                                        </p>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {petCase.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 text-gray-400">
                            <Heart size={64} className="mx-auto mb-4 opacity-30" />
                            <p className="text-lg">No hay animales en adopción en este momento</p>
                            {isOwnProfile && (
                                <Link href={route('mascotas.create')} className="mt-4 inline-block">
                                    <Button>Publicar el Primer Animal</Button>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

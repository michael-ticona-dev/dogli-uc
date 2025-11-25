import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import UserAvatar from '@/components/user-avatar';
import { route } from '@/lib/route';
import { User, PetCase } from '@/types';
import { Users, Heart, MapPin, Calendar } from 'lucide-react';
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

export default function UserProfile({ profile, stats, isFollowing, isOwnProfile }: Props) {
    const handleFollow = () => {
        if (isFollowing) {
            router.post(route('perfil.unfollow', profile.id));
        } else {
            router.post(route('perfil.follow', profile.id));
        }
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Perfil', href: route('perfil.show', profile.id) }
        ]}>
            <Head title={profile.name} />

            <div className="max-w-4xl mx-auto p-6">
                {/* Profile Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-6">
                            <UserAvatar user={profile} size="xl" />
                            <div>
                                <h1 className="text-3xl font-bold mb-1">{profile.name}</h1>
                                {profile.bio && (
                                    <p className="text-gray-600 dark:text-gray-400 mb-3">{profile.bio}</p>
                                )}
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>Joined {new Date(profile.created_at || '').toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!isOwnProfile && (
                            <Button
                                onClick={handleFollow}
                                variant={isFollowing ? "outline" : "default"}
                                className="flex items-center gap-2"
                            >
                                <Users size={18} />
                                {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                            </Button>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mt-8 pt-6 border-t">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{stats.pet_cases}</div>
                            <div className="text-sm text-gray-500">Reportes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{stats.pets_found}</div>
                            <div className="text-sm text-gray-500">Encontrados</div>
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

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
                    {profile.pet_cases && profile.pet_cases.length > 0 ? (
                        <div className="space-y-3">
                            {profile.pet_cases.map((petCase: PetCase) => (
                                <Link
                                    key={petCase.id}
                                    href={route('mascotas.show', petCase.id)}
                                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <div className={`w-2 h-12 rounded ${petCase.type === 'lost' ? 'bg-red-500' :
                                            petCase.type === 'found' ? 'bg-green-500' : 'bg-purple-500'
                                        }`} />
                                    <div className="flex-1">
                                        <div className="font-semibold">{petCase.pet?.name || 'Sin nombre'}</div>
                                        <div className="text-sm text-gray-500">
                                            {petCase.type === 'lost' ? '🔍 Perdido' :
                                                petCase.type === 'found' ? '✅ Encontrado' : '❤️ Adopción'}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {new Date(petCase.created_at).toLocaleDateString()}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-400">
                            <Heart size={48} className="mx-auto mb-3 opacity-50" />
                            <p>No hay actividad reciente</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

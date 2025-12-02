import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { PetCase } from '@/types';
import PetMap from '@/components/pet-map';

export default function Show({ petCase }: { petCase: PetCase }) {
    const { auth } = usePage().props as any;
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Mascotas', href: route('mascotas.index') },
                { title: petCase.pet?.name || 'Detalle', href: '#' },
            ]}
        >
            <Head title={`Caso: ${petCase.pet?.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Left Column: Details */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                {/* Pet Image */}
                                <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                    {petCase.pet?.photo_path ? (
                                        <img
                                            src={`/${petCase.pet.photo_path}`}
                                            alt={petCase.pet.name}
                                            className="w-full h-96 object-cover"
                                        />
                                    ) : (
                                        <div className="h-96 flex items-center justify-center text-gray-400 flex-col gap-2">
                                            <span className="text-6xl">🐾</span>
                                            <span className="text-sm">Sin foto disponible</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">{petCase.pet?.name || 'Mascota'}</h1>
                                        <p className="text-gray-500">{petCase.pet?.species} • {petCase.pet?.breed || 'Mestizo'}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full font-bold ${petCase.type === 'lost' ? 'bg-red-100 text-red-800' :
                                        petCase.type === 'found' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                                        }`}>
                                        {petCase.type === 'lost' ? 'PERDIDO' : (petCase.type === 'found' ? 'ENCONTRADO' : 'EN ADOPCIÓN')}
                                    </span>
                                </div>

                                <div className="prose max-w-none text-gray-700 mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                                    <p>{petCase.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs text-gray-500">Color</span>
                                        <span className="font-medium">{petCase.pet?.color || 'No especificado'}</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded">
                                        <span className="block text-xs text-gray-500">Sexo</span>
                                        <span className="font-medium">{petCase.pet?.gender === 'male' ? 'Macho' : (petCase.pet?.gender === 'female' ? 'Hembra' : 'Desconocido')}</span>
                                    </div>
                                </div>

                                {petCase.reward_amount && (
                                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg flex items-center gap-3 mb-6">
                                        <span className="text-2xl">💰</span>
                                        <div>
                                            <p className="font-bold text-yellow-800">Recompensa Ofrecida</p>
                                            <p className="text-yellow-900 text-xl">S/ {petCase.reward_amount}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">Ubicación del reporte</h3>
                                    <PetMap cases={[petCase]} center={[petCase.lat, petCase.lng]} zoom={15} className="h-64 w-full rounded-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Contact & Actions */}
                        <div className="space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">Contacto</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                        {petCase.user?.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium">{petCase.user?.name}</p>
                                        <p className="text-xs text-gray-500">Publicado el {new Date(petCase.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!auth.user) {
                                            window.location.href = route('login');
                                            return;
                                        }
                                        router.post('/chat/start', {
                                            user_id: petCase.user_id,
                                            pet_case_id: petCase.id,
                                        });
                                    }}
                                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-2"
                                >
                                    Contactar Usuario
                                </button>

                                {petCase.type === 'lost' && petCase.reward_amount && (
                                    <Link href={route('recompensas.create', petCase.id)}>
                                        <button className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition mb-2 flex items-center justify-center gap-2">
                                            💰 Reclamar Recompensa
                                        </button>
                                    </Link>
                                )}

                                {auth.user?.id === petCase.user_id && (
                                    <>
                                        <Link href={`/mascotas/${petCase.id}/edit`}>
                                            <button className="w-full border border-blue-300 text-blue-700 py-2 rounded-md hover:bg-blue-50 transition mb-2">
                                                ✏️ Editar Publicación
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => {
                                                if (confirm('¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer.')) {
                                                    router.delete(`/mascotas/${petCase.id}`, {
                                                        onSuccess: () => {
                                                            // Success is handled by redirect in controller, but we can add a fallback
                                                            console.log('Deleted successfully');
                                                        },
                                                        onError: (errors) => {
                                                            alert('Error al eliminar: ' + JSON.stringify(errors));
                                                        }
                                                    });
                                                }
                                            }}
                                            className="w-full border border-red-300 text-red-700 py-2 rounded-md hover:bg-red-50 transition mb-2"
                                        >
                                            🗑️ Eliminar Publicación
                                        </button>

                                        {petCase.reward_amount && (
                                            <Link href={route('recompensas.manage', petCase.id)}>
                                                <button className="w-full border border-purple-300 text-purple-700 py-2 rounded-md hover:bg-purple-50 transition mb-2">
                                                    ⚙️ Gestionar Reclamaciones
                                                </button>
                                            </Link>
                                        )}
                                    </>
                                )}

                                {petCase.type === 'lost' && (
                                    <button
                                        onClick={() => {
                                            if (!auth.user) {
                                                window.location.href = route('login');
                                                return;
                                            }
                                            router.post('/chat/start', {
                                                user_id: petCase.user_id,
                                                pet_case_id: petCase.id,
                                                initial_message: `Hola, creo que he visto a tu mascota ${petCase.pet?.name}. Aquí tienes los detalles:`
                                            });
                                        }}
                                        className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition"
                                    >
                                        📍 He visto a esta mascota
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

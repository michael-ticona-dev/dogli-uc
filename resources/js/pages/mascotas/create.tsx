import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition }: { position: [number, number] | null, setPosition: (pos: [number, number]) => void }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        pet_name: '',
        species: 'dog',
        type: 'lost',
        lat: -16.4090,  // Arequipa, Peru
        lng: -71.5375,
        description: '',
        reward_amount: '',
    });

    const [position, setPosition] = useState<[number, number]>([data.lat, data.lng]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('mascotas.store'));
    };

    const handleMapClick = (pos: [number, number]) => {
        setPosition(pos);
        setData(data => ({ ...data, lat: pos[0], lng: pos[1] }));
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Mascotas', href: route('mascotas.index') },
                { title: 'Publicar Caso', href: '#' },
            ]}
        >
            <Head title="Publicar Caso" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6">Publicar Nuevo Caso</h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Type Selection */}
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'lost')}
                                    className={`p-4 rounded-lg border text-center ${data.type === 'lost' ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    Perdido
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'found')}
                                    className={`p-4 rounded-lg border text-center ${data.type === 'found' ? 'bg-green-50 border-green-500 text-green-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    Encontrado
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'adoption')}
                                    className={`p-4 rounded-lg border text-center ${data.type === 'adoption' ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}
                                >
                                    Adopción
                                </button>
                            </div>

                            {/* Pet Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre Mascota</label>
                                    <input
                                        type="text"
                                        value={data.pet_name}
                                        onChange={e => setData('pet_name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.pet_name && <p className="text-red-500 text-xs mt-1">{errors.pet_name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Especie</label>
                                    <select
                                        value={data.species}
                                        onChange={e => setData('species', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="dog">Perro</option>
                                        <option value="cat">Gato</option>
                                        <option value="other">Otro</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            {data.type === 'lost' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Recompensa (Opcional)</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">S/</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={data.reward_amount}
                                            onChange={e => setData('reward_amount', e.target.value)}
                                            className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Map Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación (Haz click en el mapa)</label>
                                <div className="h-64 rounded-lg overflow-hidden border border-gray-300">
                                    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <LocationMarker position={position} setPosition={handleMapClick} />
                                    </MapContainer>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Lat: {data.lat.toFixed(4)}, Lng: {data.lng.toFixed(4)}</p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                                >
                                    {processing ? 'Publicando...' : 'Publicar Caso'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

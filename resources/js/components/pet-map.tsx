import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PetCase } from '@/types'; // We'll need to define types
import { Link } from '@inertiajs/react';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with Webpack/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface PetMapProps {
    cases: PetCase[];
    center?: [number, number];
    zoom?: number;
    className?: string;
}

export default function PetMap({
    cases,
    center = [-16.409047, -71.537451], // Arequipa, Perú por defecto
    zoom = 13,
    className = 'h-96 w-full rounded-lg',
}: PetMapProps) {
    return (
        <div className={className}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                className="h-full w-full rounded-lg z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cases.map((petCase) => (
                    <Marker key={petCase.id} position={[petCase.lat, petCase.lng]}>
                        <Popup>
                            <div className="text-sm">
                                <strong className="block text-base">{petCase.pet?.name || 'Mascota'}</strong>
                                <span className={`badge ${petCase.type === 'lost' ? 'text-red-600' : 'text-green-600'}`}>
                                    {petCase.type === 'lost' ? 'Perdido' : (petCase.type === 'found' ? 'Encontrado' : 'En Adopción')}
                                </span>
                                <p className="my-1">{petCase.description.substring(0, 50)}...</p>
                                <Link href={route('mascotas.show', petCase.id)} className="text-blue-600 hover:underline">
                                    Ver detalles
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

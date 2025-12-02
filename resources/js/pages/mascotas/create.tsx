import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import LocationSearch from '@/components/location-search';
import { Upload, Brain, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

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

interface AnalysisResult {
    tipo: string;
    raza_principal: string;
    color_principal: string;
    todas_razas: string[];
    todos_colores: string[];
}

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        pet_name: '',
        species: 'dog',
        breed: '',
        color: '',
        gender: 'unknown',
        type: 'lost',
        lat: -16.4090,
        lng: -71.5375,
        description: '',
        reward_amount: '',
        photo_url: '',
    });

    const [position, setPosition] = useState<[number, number]>([data.lat, data.lng]);
    const [locationName, setLocationName] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [analysisError, setAnalysisError] = useState('');
    const [editableBreed, setEditableBreed] = useState('');
    const [editableColor, setEditableColor] = useState('');
    const mapRef = useRef<any>(null);

    const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

    // Reverse geocoding function
    const reverseGeocode = async (lat: number, lng: number) => {
        if (!apiKey) return null;

        try {
            const response = await fetch(
                `https://us1.locationiq.com/v1/reverse?` +
                `key=${apiKey}` +
                `&lat=${lat}` +
                `&lon=${lng}` +
                `&format=json` +
                `&accept-language=es`
            );

            if (response.ok) {
                const data = await response.json();
                return data.display_name;
            }
        } catch (error) {
            console.error('Error in reverse geocoding:', error);
        }
        return null;
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pet_name', data.pet_name);
        formData.append('species', data.species);
        formData.append('breed', data.breed);
        formData.append('color', data.color);
        formData.append('gender', data.gender);
        formData.append('type', data.type);
        formData.append('lat', data.lat.toString());
        formData.append('lng', data.lng.toString());
        formData.append('description', data.description);
        if (data.reward_amount) formData.append('reward_amount', data.reward_amount);
        if (imageFile) formData.append('photo', imageFile);

        router.post(route('mascotas.store'), formData, {
            forceFormData: true,
        });
    };

    const handleMapClick = async (pos: [number, number]) => {
        setPosition(pos);
        setData(data => ({ ...data, lat: pos[0], lng: pos[1] }));

        // Get address from coordinates
        const address = await reverseGeocode(pos[0], pos[1]);
        if (address) {
            setLocationName(address);
        }
    };

    const handleLocationSelect = (lat: number, lng: number, displayName: string) => {
        setPosition([lat, lng]);
        setData(data => ({ ...data, lat, lng }));
        setLocationName(displayName);

        // Zoom to selected location
        if (mapRef.current) {
            mapRef.current.setView([lat, lng], 16, {
                animate: true,
                duration: 0.5
            });
        }
    };

    const resizeImage = (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1024;
                    const MAX_HEIGHT = 1024;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const resizedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(resizedFile);
                        } else {
                            reject(new Error('Canvas to Blob failed'));
                        }
                    }, 'image/jpeg', 0.8); // Quality 0.8
                };
                img.onerror = (error) => reject(error);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Show preview immediately with original file
                const previewUrl = URL.createObjectURL(file);
                setImagePreview(previewUrl);

                // Resize image
                const resizedFile = await resizeImage(file);
                setImageFile(resizedFile);

                // Reset analysis when new image is selected
                setAnalysisResult(null);
                setAnalysisError('');
            } catch (error) {
                console.error('Error resizing image:', error);
                setAnalysisError('Error al procesar la imagen. Intenta con otra.');
            }
        }
    };

    const analyzeImage = async () => {
        if (!imageFile) {
            setAnalysisError('Por favor selecciona una imagen primero');
            return;
        }

        setAnalyzing(true);
        setAnalysisError('');
        setAnalysisResult(null);

        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await fetch('/mascotas/analyze-image', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setAnalysisResult(result.data);
                setEditableBreed(result.data.raza_principal);
                setEditableColor(result.data.color_principal);

                // Auto-fill form with detected data
                setData(prev => ({
                    ...prev,
                    species: result.data.tipo === 'Perro' ? 'dog' : result.data.tipo === 'Gato' ? 'cat' : prev.species,
                    breed: result.data.raza_principal,
                    color: result.data.color_principal,
                    description: prev.description || `${result.data.tipo} de raza ${result.data.raza_principal}, color ${result.data.color_principal}`,
                }));
            } else {
                setAnalysisError(result.message || 'Error al analizar la imagen');
            }
        } catch (error) {
            setAnalysisError('Error de conexión. Verifica tu conexión a internet.');
        } finally {
            setAnalyzing(false);
        }
    };

    const updateDescriptionFromAnalysis = () => {
        if (analysisResult) {
            setData('description', `${analysisResult.tipo} de raza ${editableBreed}, color ${editableColor}`);
        }
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Mascotas', href: route('mascotas.index') },
                { title: 'Publicar Caso', href: '#' },
            ]}
        >
            <Head title="Publicar Caso" />

            <div className="py-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-200">
                        <div className="p-8">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-slate-900">Publicar Nuevo Caso</h2>
                                <p className="mt-2 text-slate-600">Completa la información para ayudarnos a encontrar tu mascota</p>
                            </div>

                            <form onSubmit={submit} className="space-y-8">
                                {/* Image Analysis Section */}
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Brain className="h-6 w-6 text-indigo-600" />
                                        <h3 className="text-lg font-semibold text-slate-900">Análisis de Imagen con IA</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2">
                                        Sube una foto de tu mascota y nuestra IA detectará automáticamente la raza y características
                                    </p>
                                    <p className="text-xs text-indigo-700 bg-indigo-100 px-3 py-2 rounded-lg border border-indigo-200 flex items-start gap-2 mb-4">
                                        <Upload className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>
                                            <strong>Formatos admitidos:</strong> JPG, PNG, WebP •
                                            <strong className="ml-1">Tamaño máximo:</strong> 5 MB •
                                            <strong className="ml-1">Resolución recomendada:</strong> 800x800px mínimo
                                        </span>
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="flex-1 block w-full text-sm text-slate-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-indigo-50 file:text-indigo-700
                                                    hover:file:bg-indigo-100"
                                            />
                                            <button
                                                type="button"
                                                onClick={analyzeImage}
                                                disabled={analyzing || !imageFile}
                                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
                                            >
                                                {analyzing ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Analizando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Brain className="h-4 w-4" />
                                                        Analizar
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                        {/* Image Preview */}
                                        {imagePreview && (
                                            <div className="rounded-lg overflow-hidden border border-slate-200 relative group">
                                                <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImageFile(null);
                                                        setImagePreview('');
                                                        setAnalysisResult(null);
                                                    }}
                                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        {/* Analysis Result */}
                                        {analysisResult && (
                                            <div className="bg-white rounded-lg p-4 border border-green-200">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-slate-900 mb-2">¡Análisis completado!</p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-slate-600 block mb-1">Tipo:</span>
                                                                <span className="font-semibold text-slate-900 px-3 py-1.5 bg-slate-100 rounded-md block w-full">{analysisResult.tipo}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-slate-600 block mb-1">Raza (Editable):</span>
                                                                <input
                                                                    type="text"
                                                                    value={editableBreed}
                                                                    onChange={(e) => setEditableBreed(e.target.value)}
                                                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
                                                                />
                                                            </div>
                                                            <div className="col-span-1 sm:col-span-2">
                                                                <span className="text-slate-600 block mb-1">Color principal (Editable):</span>
                                                                <div className="flex gap-2">
                                                                    <div
                                                                        className="w-9 h-9 rounded border border-slate-300 flex-shrink-0"
                                                                        style={{ backgroundColor: analysisResult.color_principal }}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        value={editableColor}
                                                                        onChange={(e) => setEditableColor(e.target.value)}
                                                                        className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-1.5"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1 sm:col-span-2 mt-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={updateDescriptionFromAnalysis}
                                                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                                                                >
                                                                    Actualizar descripción con estos datos
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Analysis Error */}
                                        {analysisError && (
                                            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                                <div className="flex items-start gap-3">
                                                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                                    <p className="text-sm text-red-700">{analysisError}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Type Selection */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-3">Tipo de Caso</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setData('type', 'lost')}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${data.type === 'lost' ? 'bg-red-50 border-red-500 text-red-700 font-bold shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
                                        >
                                            <span className="block text-2xl mb-1">🔍</span>
                                            Perdido
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('type', 'found')}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${data.type === 'found' ? 'bg-green-50 border-green-500 text-green-700 font-bold shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
                                        >
                                            <span className="block text-2xl mb-1">✓</span>
                                            Encontrado
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('type', 'adoption')}
                                            className={`p-4 rounded-xl border-2 text-center transition-all ${data.type === 'adoption' ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold shadow-sm' : 'border-slate-200 hover:bg-slate-50'}`}
                                        >
                                            <span className="block text-2xl mb-1">💜</span>
                                            Adopción
                                        </button>
                                    </div>
                                </div>

                                {/* Pet Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Nombre Mascota</label>
                                        <input
                                            type="text"
                                            value={data.pet_name}
                                            onChange={e => setData('pet_name', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.pet_name && <p className="text-red-500 text-xs mt-1">{errors.pet_name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Especie</label>
                                        <select
                                            value={data.species}
                                            onChange={e => setData('species', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="dog">🐕 Perro</option>
                                            <option value="cat">🐈 Gato</option>
                                            <option value="other">🐾 Otro</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Raza</label>
                                        <input
                                            type="text"
                                            value={data.breed}
                                            onChange={e => setData('breed', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Ej. Labrador, Siamés"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Color</label>
                                        <input
                                            type="text"
                                            value={data.color}
                                            onChange={e => setData('color', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Ej. Negro, Blanco con manchas"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Sexo</label>
                                        <select
                                            value={data.gender}
                                            onChange={e => setData('gender', e.target.value)}
                                            className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="unknown">Desconocido</option>
                                            <option value="male">Macho</option>
                                            <option value="female">Hembra</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-900 mb-2">Descripción</label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows={4}
                                        className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Describe a tu mascota: características físicas, comportamiento, última vez vista..."
                                        required
                                    />
                                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                                </div>

                                {data.type === 'lost' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-900 mb-2">Recompensa (Opcional)</label>
                                        <div className="relative rounded-lg shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-slate-500 sm:text-sm">S/</span>
                                            </div>
                                            <input
                                                type="number"
                                                value={data.reward_amount}
                                                onChange={e => setData('reward_amount', e.target.value)}
                                                className="block w-full rounded-lg border-slate-300 pl-12 focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Location Section */}
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <MapPin className="h-6 w-6 text-indigo-600" />
                                        <h3 className="text-lg font-semibold text-slate-900">Ubicación</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <LocationSearch
                                            onLocationSelect={handleLocationSelect}
                                        />

                                        {locationName && (
                                            <div className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                                                <MapPin className="h-4 w-4 inline mr-1" />
                                                <span className="font-medium">Ubicación seleccionada:</span> {locationName}
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                O haz clic en el mapa para seleccionar la ubicación
                                            </label>
                                            <div className="h-80 rounded-lg overflow-hidden border-2 border-slate-300 shadow-sm">
                                                <MapContainer
                                                    ref={mapRef}
                                                    center={position}
                                                    zoom={13}
                                                    scrollWheelZoom={true}
                                                    className="h-full w-full"
                                                >
                                                    <TileLayer
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <LocationMarker position={position} setPosition={handleMapClick} />
                                                </MapContainer>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-2">
                                                📍 Coordenadas: {data.lat.toFixed(4)}, {data.lng.toFixed(4)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => router.visit(route('mascotas.index'))}
                                        className="px-6 py-3 rounded-lg border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Publicando...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="h-4 w-4" />
                                                Publicar Caso
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

import { useState, useCallback } from 'react';
import { MapPin, Search, Navigation, CheckCircle, AlertCircle } from 'lucide-react';

interface LocationSearchProps {
    onLocationSelect: (lat: number, lng: number, displayName: string) => void;
    className?: string;
}

interface SearchResult {
    lat: string;
    lon: string;
    display_name: string;
    osm_type?: string;
    type?: string;
}

export default function LocationSearch({ onLocationSelect, className = '' }: LocationSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [gettingLocation, setGettingLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

    const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

    // Debug log
    console.log('LocationSearch mounted, API Key available:', !!apiKey);

    // Debounce helper (simple implementation to avoid lodash dependency)
    const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Autocomplete con LocationIQ
    const autocompleteLocation = async (searchQuery: string) => {
        if (!searchQuery.trim() || searchQuery.length < 3 || !apiKey) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://us1.locationiq.com/v1/autocomplete?` +
                `key=${apiKey}` +
                `&q=${encodeURIComponent(searchQuery)}` +
                `&format=json` +
                `&limit=10` +
                `&countrycodes=pe` +
                `&dedupe=1` +
                `&accept-language=es`
            );

            if (!response.ok) {
                if (response.status === 401) {
                    setError('API Key no configurada correctamente');
                } else if (response.status === 429) {
                    setError('Demasiadas solicitudes. Espera un momento.');
                } else {
                    setError('Error al buscar. Intenta de nuevo.');
                }
                setShowResults(false);
                return;
            }

            const data = await response.json();
            console.log('LocationIQ API response:', data);
            setResults(data);
            setShowResults(data.length > 0);

            if (data.length === 0) {
                setError('No se encontraron resultados');
            }
        } catch (error) {
            setError('Error de conexión. Verifica tu internet.');
            console.error('Error searching location:', error);
            setShowResults(false);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            autocompleteLocation(query);
        }, 300),
        [apiKey]
    );

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setError(null);
        setSelectedLocation(null);

        if (value.length >= 3) {
            debouncedSearch(value);
        } else {
            setResults([]);
            setShowResults(false);
        }
    };

    const handleSelectResult = (result: SearchResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        onLocationSelect(lat, lng, result.display_name);
        setQuery(result.display_name);
        setSelectedLocation(result.display_name);
        setShowResults(false);
        setError(null);
    };

    // Geolocation - Obtener ubicación actual
    const getCurrentLocation = () => {
        if (!('geolocation' in navigator)) {
            setError('Tu navegador no soporta geolocalización');
            return;
        }

        setGettingLocation(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Reverse geocoding para obtener dirección
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
                        const address = data.display_name;
                        onLocationSelect(lat, lng, address);
                        setQuery(address);
                        setSelectedLocation(address);
                    } else {
                        onLocationSelect(lat, lng, 'Tu ubicación actual');
                        setQuery('Tu ubicación actual');
                        setSelectedLocation('Tu ubicación actual');
                    }
                } catch (error) {
                    console.error('Reverse geocoding error:', error);
                    onLocationSelect(lat, lng, 'Tu ubicación actual');
                    setQuery('Tu ubicación actual');
                    setSelectedLocation('Tu ubicación actual');
                }

                setGettingLocation(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                setError('No se pudo obtener tu ubicación. Verifica los permisos.');
                setGettingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    return (
        <div className={className}>
            <div className="space-y-3">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={query}
                            onChange={handleQueryChange}
                            placeholder="Buscar ubicación en Arequipa..."
                            className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />

                        {/* Loading spinner */}
                        {loading && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="animate-spin h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></div>
                            </div>
                        )}

                        {/* Results Dropdown */}
                        {showResults && results.length > 0 && (
                            <div className="absolute top-full left-0 right-0 z-[2000] mt-2 bg-white border-2 border-indigo-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                                {results.map((result, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => handleSelectResult(result)}
                                        className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition border-b border-slate-100 last:border-b-0"
                                    >
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-slate-700">{result.display_name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={gettingLocation}
                        className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap font-medium shadow-sm"
                        title="Usar mi ubicación actual"
                    >
                        <Navigation className="h-5 w-5" />
                        <span className="hidden sm:inline">{gettingLocation ? 'Obteniendo...' : 'Mi ubicación'}</span>
                        <span className="sm:hidden">GPS</span>
                    </button>
                </div>

                {/* Selected Location confirmation */}
                {selectedLocation && !showResults && !error && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-green-900">Ubicación confirmada</p>
                            <p className="text-xs text-green-700 truncate">{selectedLocation}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedLocation(null);
                                setQuery('');
                            }}
                            className="text-xs text-green-700 hover:text-green-900 flex-shrink-0 font-medium"
                        >
                            Cambiar
                        </button>
                    </div>
                )}

                {/* Error message */}
                {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Helper text */}
                <p className="text-xs text-slate-600 flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    Escribe al menos 3 letras para ver sugerencias automáticas
                </p>
            </div>
        </div>
    );
}

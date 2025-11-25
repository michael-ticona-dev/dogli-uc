import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Header from '@/components/dogli/Header';
import Navigation from '@/components/dogli/Navigation';
import Footer from '@/components/dogli/Footer';
import PetMap from '@/components/pet-map';
import { route } from '@/lib/route';
import type { PetCase, Pagination } from '@/types';

interface Props {
    cases: Pagination<PetCase>;
    filters: {
        type?: 'lost' | 'found' | 'adoption';
    };
}

export default function Anuncios({ cases, filters }: Props) {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

    useEffect(() => {
        document.body.classList.add('page-loaded');
    }, []);

    const filterByType = (type?: string) => {
        router.get(route('mascotas.index'), { type }, { preserveState: true });
    };

    return (
        <>
            <Head title="Radar de Mascotas - Ver Anuncios">
                <meta name="description" content="Encuentra mascotas perdidas, reporta mascotas encontradas o adopta un nuevo amigo" />
            </Head>
            <div className="chien" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
                <Header />
                <Navigation />

                <main className="container" style={{ marginTop: '2rem', marginBottom: '3rem' }}>
                    {/* Header Section */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <span className="news-top-title">Radar de Mascotas</span>
                        <h1 className="news-title" style={{ marginTop: '0.5rem' }}>
                            {cases.data.length} mascotas necesitan ayuda
                        </h1>
                        <p style={{ color: 'var(--color-texto-claro)', fontSize: '1.1rem' }}>
                            Encuentra mascotas perdidas cerca de ti o reporta una mascota encontrada
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <Link href={route('mascotas.create')} className="btn btn-danger">
                            📍 Reportar Mascota Perdida
                        </Link>
                        <Link href={route('mascotas.create')} className="btn btn-success">
                            🏠 Reportar Mascota Encontrada
                        </Link>
                    </div>

                    {/* Filters */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        marginBottom: '2rem',
                        padding: '1rem',
                        backgroundColor: 'var(--color-fondo-secundario)',
                        borderRadius: 'var(--borde-redondo)'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => filterByType()}
                                className={`btn ${!filters.type ? 'btn-danger' : ''}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: !filters.type ? 'var(--color-morado)' : 'white',
                                    color: !filters.type ? 'white' : 'var(--color-texto)'
                                }}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => filterByType('lost')}
                                className={`btn ${filters.type === 'lost' ? 'btn-danger' : ''}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: filters.type === 'lost' ? '#dc2626' : 'white',
                                    color: filters.type === 'lost' ? 'white' : 'var(--color-texto)'
                                }}
                            >
                                🔍 Perdidas
                            </button>
                            <button
                                onClick={() => filterByType('found')}
                                className={`btn ${filters.type === 'found' ? 'btn-success' : ''}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: filters.type === 'found' ? '#16a34a' : 'white',
                                    color: filters.type === 'found' ? 'white' : 'var(--color-texto)'
                                }}
                            >
                                ✅ Encontradas
                            </button>
                            <button
                                onClick={() => filterByType('adoption')}
                                className={`btn ${filters.type === 'adoption' ? 'btn-success' : ''}`}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: filters.type === 'adoption' ? 'var(--color-morado)' : 'white',
                                    color: filters.type === 'adoption' ? 'white' : 'var(--color-texto)'
                                }}
                            >
                                ❤️ En Adopción
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                                onClick={() => setViewMode('map')}
                                className="btn"
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: viewMode === 'map' ? 'var(--color-morado)' : 'white',
                                    color: viewMode === 'map' ? 'white' : 'var(--color-texto)'
                                }}
                            >
                                🗺️ Mapa
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className="btn"
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: viewMode === 'list' ? 'var(--color-morado)' : 'white',
                                    color: viewMode === 'list' ? 'white' : 'var(--color-texto)'
                                }}
                            >
                                📋 Lista
                            </button>
                        </div>
                    </div>

                    {/* Map View */}
                    {viewMode === 'map' && (
                        <div style={{ marginBottom: '2rem' }}>
                            <PetMap cases={cases.data} className="h-[600px] w-full rounded-lg shadow-lg" />
                        </div>
                    )}

                    {/* List View */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {cases.data.map((petCase) => (
                            <Link
                                key={petCase.id}
                                href={route('mascotas.show', petCase.id)}
                                className="anuncio-card-modern"
                                style={{ textDecoration: 'none', display: 'block' }}
                            >
                                <div style={{
                                    aspectRatio: '16/9',
                                    backgroundColor: 'var(--color-fondo-secundario)',
                                    borderRadius: 'var(--borde-suave)',
                                    marginBottom: '1rem',
                                    overflow: 'hidden'
                                }}>
                                    {petCase.pet?.photo_path ? (
                                        <img
                                            src={petCase.pet.photo_path}
                                            alt={petCase.pet.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '3rem'
                                        }}>
                                            🐾
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div style={{
                                        display: 'inline-block',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                        backgroundColor: petCase.type === 'lost' ? '#fee2e2' :
                                            petCase.type === 'found' ? '#dcfce7' : '#f3e8ff',
                                        color: petCase.type === 'lost' ? '#dc2626' :
                                            petCase.type === 'found' ? '#16a34a' : '#7c3aed'
                                    }}>
                                        {petCase.type === 'lost' ? '🔍 Perdida' :
                                            petCase.type === 'found' ? '✅ Encontrada' : '❤️ En Adopción'}
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        fontWeight: '700',
                                        marginBottom: '0.5rem',
                                        color: 'var(--color-texto)'
                                    }}>
                                        {petCase.pet?.name || 'Sin nombre'}
                                    </h3>

                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--color-texto-claro)',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {petCase.pet?.species} - {petCase.pet?.breed || 'Raza desconocida'}
                                    </p>

                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: 'var(--color-texto-claro)',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {petCase.description}
                                    </p>

                                    {petCase.reward_amount && (
                                        <div style={{
                                            marginTop: '0.75rem',
                                            padding: '0.5rem',
                                            backgroundColor: '#fef3c7',
                                            borderRadius: 'var(--borde-suave)',
                                            fontSize: '0.9rem',
                                            fontWeight: '600',
                                            color: '#92400e'
                                        }}>
                                            💰 Recompensa: S/ {petCase.reward_amount}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {cases.data.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem',
                            backgroundColor: 'var(--color-fondo-secundario)',
                            borderRadius: 'var(--borde-redondo)'
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                No hay casos en este momento
                            </h3>
                            <p style={{ color: 'var(--color-texto-claro)' }}>
                                Sé el primero en reportar una mascota
                            </p>
                        </div>
                    )}
                </main>

                <Footer />
            </div>
        </>
    );
}

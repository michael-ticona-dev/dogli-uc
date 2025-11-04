import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/components/dogli/Header';
import Navigation from '@/components/dogli/Navigation';
import Footer from '@/components/dogli/Footer';

interface Anuncio {
    id: number;
    nombre: string;
    genero: string;
    status: 'perdido' | 'encontrado';
    fechaPerdida: string;
    tamanio: string;
    raza?: string;
    colores: string;
    pelo: string;
    pelaje: string;
    orejas: string;
    lugar: string;
    contacto: string;
    imagen: string;
    fechaAnuncio: string;
}

export default function Anuncios() {
    useEffect(() => {
        document.body.classList.add('page-loaded');
    }, []);

    // Datos de ejemplo - estos vendrán del backend
    const anuncios: Anuncio[] = [
        {
            id: 384967,
            nombre: 'Prana',
            genero: 'perra',
            status: 'perdido',
            fechaPerdida: '05/10/2025',
            tamanio: 'media',
            colores: 'negro, marrón, blanco',
            pelo: 'largo',
            pelaje: 'moteado',
            orejas: 'caídas',
            lugar: 'Bielsa (25 - ES)',
            contacto: '924 233 242',
            imagen: 'https://data.perro-perdido.com/photos/3/8/4/9/6/384967_160x160_1.jpg?v=20251019202038',
            fechaAnuncio: '19/10/2025'
        },
        {
            id: 382904,
            nombre: 'Potxolo',
            genero: 'perro macho',
            status: 'encontrado',
            fechaPerdida: '29/08/2025',
            tamanio: 'pequeña',
            colores: 'marrón, beige',
            pelo: 'corto',
            pelaje: 'unido',
            orejas: 'caídas',
            lugar: 'Irun (20 - ES)',
            contacto: '924 233 242',
            imagen: 'https://data.perro-perdido.com/photos/3/8/2/9/0/382904_160x160_1.jpg?v=20250902193909',
            fechaAnuncio: '02/09/2025'
        },
        {
            id: 381353,
            nombre: 'Floki',
            genero: 'perro macho',
            status: 'perdido',
            fechaPerdida: '31/07/2025',
            tamanio: 'pequeña',
            raza: 'Bichón Maltés',
            colores: 'blanco',
            pelo: 'largo',
            pelaje: 'unido',
            orejas: 'mitad/mitad',
            lugar: 'Madrid (32 - ES)',
            contacto: '924 233 242',
            imagen: 'https://data.perro-perdido.com/photos/3/8/1/3/5/381353_160x160_1.jpg?v=20250801220802',
            fechaAnuncio: '01/08/2025'
        }
    ];

    return (
        <>
            <Head title="Anuncios - DogLi">
                <meta name="description" content="Ver anuncios de perros perdidos o encontrados España" />
            </Head>
            <div className="chien" style={{ backgroundColor: '#f9fafb', minHeight: '100vh' }}>
                <Header />
                <Navigation />

                <main className="rechercher">
                    <div className="container">
                        <h1 style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            Perro perdido o encontrado
                        </h1>

                        <section className="container mb-4">
                            <p>Tu búsqueda: ver {anuncios.length} anuncios : machos o hembras perros perdidos o encontrados España.</p>
                            
                            <div className="item-list">
                                <table className="details">
                                    <tbody>
                                        {anuncios.map((anuncio) => (
                                            <tr key={anuncio.id}>
                                                <td>
                                                    <div className="anuncio-card-modern">
                                                        <a className="lienAnnonceOff" title={anuncio.nombre}>
                                                            <div className="row">
                                                                <div className="col-6 col-md-auto mb-1 order1">
                                                                    <img
                                                                        className="item-view"
                                                                        data-id-item={anuncio.id}
                                                                        src={anuncio.imagen}
                                                                        alt={`Foto de perro ${anuncio.status} en ${anuncio.lugar}`}
                                                                        width="160"
                                                                        height="160"
                                                                    />
                                                                </div>
                                                                <div className="col-12 col-md order3 anuncio-details">
                                                                    <p className="anuncio-status">
                                                                        "{anuncio.nombre}" <strong>{anuncio.genero}</strong>{' '}
                                                                        <span className={`status-${anuncio.status}`}>
                                                                            <strong>{anuncio.status === 'perdido' ? 'perdido' : 'encontrado'}</strong>
                                                                        </span>{' '}
                                                                        el {anuncio.fechaPerdida}
                                                                    </p>
                                                                    <div className="anuncio-attributes">
                                                                        <p><span>Tamaño:</span> {anuncio.tamanio}</p>
                                                                        {anuncio.raza && <p><span>Raza:</span> {anuncio.raza}</p>}
                                                                        <p><span>Colores:</span> {anuncio.colores}</p>
                                                                        <p><span>Pelo:</span> {anuncio.pelo}</p>
                                                                        <p><span>Pelaje:</span> {anuncio.pelaje}</p>
                                                                        <p><span>Orejas:</span> {anuncio.orejas}</p>
                                                                        <p><span>Lugar:</span> {anuncio.lugar}</p>
                                                                    </div>
                                                                    <div className="anuncio-tags">
                                                                        <p>
                                                                            <span>Contacto</span>{' '}
                                                                            <span className="tag-positive">{anuncio.contacto}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6 col-md-3 text-right btn-edit order2">
                                                                    <small>{anuncio.fechaAnuncio}</small>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}


import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Header from '@/components/dogli/Header';
import Navigation from '@/components/dogli/Navigation';
import Footer from '@/components/dogli/Footer';

export default function DogliIndex() {
    useEffect(() => {
        document.body.classList.add('page-loaded');
    }, []);

    return (
        <>
            <Head title="DogLi - Publicar anuncio de perro perdido o encontrado">
                <meta name="description" content="Publicar un anuncio de un perro perdido o encontrado España" />
                <meta name="keywords" content="perro peros perra perras perdido encontrado encontrar perdida encontrada" />
            </Head>
            <div className="chien" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
                <Header />
                <Navigation />
                
                <main>
                    {/* Hero Section - Layout de dos columnas */}
                    <section className="hero-main-section">
                        <div className="hero-sidebar">
                            <div className="hero-content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
                                <h1 className="hero-title">
                                    Publique su anuncio en solo unos minutos.
                                </h1>
                                <p className="hero-text">
                                    Compartir automático e inmediato en redes sociales y alertas por correo electrónico a miles de miembros de la Red de Vigilancia.
                                </p>
                                <div className="hero-buttons">
                                    <Link 
                                        href="/nuevo-anuncio?accion=perdido" 
                                        className="btn btn-danger hero-btn"
                                    >
                                        He perdido a mi perro »
                                    </Link>
                                    <Link 
                                        href="/nuevo-anuncio?accion=encontrado" 
                                        className="btn btn-success hero-btn"
                                    >
                                        He encontrado un perro »
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image-container">
                            <img 
                                className="hero-main-image" 
                                src="https://www.perro-perdido.com/images/news/hero_banner_chien.jpg" 
                                alt="Perro perdido"
                                loading="eager"
                            />
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="mt-4">
                        <div className="container">
                            <div className="block-stats">
                                <div className="stat">
                                    <span>189&nbsp;364</span>
                                    perros reunidos
                                </div>
                                <div className="stat">
                                    <span>83%</span>
                                    tasa de éxito
                                </div>
                                <div className="stat">
                                    <span>482</span>
                                    Testimonios
                                </div>
                                <div className="stat">
                                    <span>315&nbsp;624</span>
                                    voluntarios de la Red de Vigilancia
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Process Section */}
                    <section className="mt-4">
                        <div className="container">
                            <div className="block-news-process">
                                <span className="news-top-title">¿Cómo funciona?</span>
                                <h2 className="news-title mb-2">3 pasos fáciles para encontrar a su perro</h2>

                                <div className="steps" style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '2rem',
                                    marginTop: '2rem'
                                }}>
                                    <div className="step">
                                        <p className="news-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Publicación</p>
                                        <p className="news-text" style={{ marginBottom: '1rem' }}>Publique su anuncio en el sitio web — es inmediato.</p>
                                        <img 
                                            className="news-image" 
                                            src="https://www.perro-perdido.com/images/news/step1_chien_es.png" 
                                            alt="Paso 1"
                                        />
                                    </div>

                                    <div className="step">
                                        <p className="news-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Difusión</p>
                                        <p className="news-text" style={{ marginBottom: '1rem' }}>Compartir automáticamente en redes sociales y con todos nuestros socios y voluntarios locales.</p>
                                        <img 
                                            className="news-image" 
                                            src="https://www.perro-perdido.com/images/news/step2_chien_es.png" 
                                            alt="Paso 2"
                                        />
                                    </div>

                                    <div className="step">
                                        <p className="news-subtitle" style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>¡Perro reunido!</p>
                                        <p className="news-text" style={{ marginBottom: '1rem' }}>Reciba consejos de la comunidad y alertas.</p>
                                        <img 
                                            className="news-image" 
                                            src="https://www.perro-perdido.com/images/news/step3_chien_es.png" 
                                            alt="Paso 3"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Reunited Dogs Section */}
                    <section className="mt-4">
                        <div className="container">
                            <div className="block-items-h">
                                <span className="news-top-title">189 364 perros reunidos</span>
                                <h2 className="news-title">158 perros reunidos esta semana</h2>
                                <div className="cards">
                                    <div className="card">
                                        <img 
                                            className="img-fluid w-100" 
                                            src="https://data.perro-perdido.com/photos/3/7/9/3/8/379385_160x160_1.jpg?v=20250624143616" 
                                            alt="Foto de un perro reunido en A Coruna" 
                                            width="200" 
                                            height="200"
                                        />
                                        <p className="news-text">
                                            <strong>Pachu</strong>, reunido en A Coruna.
                                        </p>
                                    </div>
                                    <div className="card">
                                        <img 
                                            className="img-fluid w-100" 
                                            src="https://data.perro-perdido.com/photos/3/6/9/8/6/369863_160x160_1.jpg?v=20241015001007" 
                                            alt="Foto de un perro reunido en Estepona" 
                                            width="200" 
                                            height="200"
                                        />
                                        <p className="news-text">
                                            <strong>Honey</strong>, reunido en Estepona.
                                        </p>
                                    </div>
                                    <div className="card">
                                        <img 
                                            className="img-fluid w-100" 
                                            src="https://data.perro-perdido.com/photos/3/6/5/4/9/365496_160x160_1.jpg?v=20240626001857" 
                                            alt="Foto de un perro reunido en El Barraco" 
                                            width="200" 
                                            height="200"
                                        />
                                        <p className="news-text">
                                            <strong>Bowie</strong>, reunido en El Barraco.
                                        </p>
                                    </div>
                                    <div className="card">
                                        <img 
                                            className="img-fluid w-100" 
                                            src="https://data.perro-perdido.com/photos/3/6/1/2/4/361249_160x160_1.jpg?v=20240216121458" 
                                            alt="Foto de un perro reunido en Sanlucar La Mayor" 
                                            width="200" 
                                            height="200"
                                        />
                                        <p className="news-text">
                                            Reunido en Sanlucar La Mayor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Benefits Section */}
                    <section className="mt-4">
                        <div className="container">
                            <div className="block-benefits">
                                <span className="news-top-title">Lo que hacemos concretamente</span>
                                <h2 className="news-title">El sistema de alertas más completo</h2>

                                <div className="cards">
                                    {[
                                        {
                                            img: 'https://www.perro-perdido.com/images/news/benefit_publication.svg',
                                            title: 'Publicación inmediata',
                                            text: 'Sin demora en la publicación en el sitio, con validación instantánea y automática. Agregue varias fotos, geolocalización, números de tatuajes y detalles del microchip.'
                                        },
                                        {
                                            img: 'https://www.perro-perdido.com/images/news/benefit_facebook.svg',
                                            title: 'Difusión en redes sociales',
                                            text: 'Compartir automáticamente e inmediatamente en nuestras páginas de Facebook regionales y las de nuestros socios locales.'
                                        },
                                        {
                                            img: 'https://www.perro-perdido.com/images/news/benefit_alerts.svg',
                                            title: 'Alertas e-mail',
                                            text: 'Para informar a los 315 624 miembros de la Red de Vigilancia.'
                                        },
                                        {
                                            img: 'https://www.perro-perdido.com/images/news/benefit_pros.svg',
                                            title: 'Alertas para profesionales locales',
                                            text: 'Para informar a nuestros socios locales (refugios, asociaciones, clínicas veterinarias...).'
                                        },
                                        {
                                            img: 'https://www.perro-perdido.com/images/news/benefit_help.svg',
                                            title: 'Ayuda mutua y consejos',
                                            text: 'Soporte de la comunidad, que ya ha publicado 2 363 548 mensajes de ayuda mutua.'
                                        },
                                        {
                                            img: 'https://www.perro-perdido.com/images/news/benefit_poster.svg',
                                            title: 'Pósters imprimibles',
                                            text: 'Recibirá por correo electrónico un diseño de póster altamente visible. Incluye un código QR para contacto y números de teléfono desprendibles.'
                                        }
                                    ].map((benefit, idx) => (
                                        <div key={idx} className="card">
                                            <img 
                                                className="news-image" 
                                                src={benefit.img} 
                                                alt={benefit.title} 
                                                width="161" 
                                                height="161"
                                            />
                                            <p className="news-subtitle">{benefit.title}</p>
                                            <p className="news-text">{benefit.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Testimonials Section */}
                    <section className="mt-4">
                        <div className="container">
                            <div className="block-ratings">
                                <span className="news-top-title">482 testimonios</span>
                                <h2 className="news-title">Las hermosas historias de reencuentros</h2>
                                <div className="cards">
                                    {[
                                        {
                                            name: 'samsamsamsam',
                                            text: 'Les agradezco por su sitio web, que me permitió encontrar a mi perro muy rápidamente. Su red está muy bien organizada, y estoy muy feliz de haber recuperado a...'
                                        },
                                        {
                                            name: 'robbb',
                                            text: 'Quiero agradecer al sitio por su rapidez y el alcance logrado. Hemos encontrado a nuestro perro gracias al anuncio. ¡Qué alivio! Cada día esperábamos que...'
                                        },
                                        {
                                            name: 'connie90',
                                            text: 'A todos los que compartieron la información o ayudaron a buscar a mi perra Kelly, les envío mi más profundo agradecimiento, ya que la he encontrado sana y salva....'
                                        }
                                    ].map((testimonial, idx) => (
                                        <div key={idx} className="card">
                                            <div className="news-top">
                                                <p className="news-name">{testimonial.name}</p>
                                                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg 
                                                            key={star}
                                                            width="16" 
                                                            height="16" 
                                                            viewBox="0 0 24 24" 
                                                            fill="#fbbf24" 
                                                            stroke="#fbbf24" 
                                                            strokeWidth="1"
                                                            style={{ flexShrink: 0 }}
                                                        >
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="news-text">{testimonial.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Main CTA Section - Estilo Epic Games */}
                    <section className="epic-cta-section">
                        <div className="container">
                            <div className="epic-cta-container">
                                <div className="epic-cta-header">
                                    <span className="news-top-title">158 perros reunidos esta semana</span>
                                    <h2 className="epic-cta-title">¿Necesitas ayuda? Elige una opción</h2>
                                    <p className="epic-cta-subtitle">Publique su anuncio en solo unos minutos y empiece a recibir ayuda de inmediato</p>
                                </div>
                                <div className="epic-buttons-grid">
                                    <Link 
                                        href="/nuevo-anuncio?accion=perdido" 
                                        className="epic-button epic-button-danger"
                                    >
                                        <div className="epic-button-icon">🔍</div>
                                        <div className="epic-button-content">
                                            <span className="epic-button-title">He perdido a mi perro</span>
                                            <span className="epic-button-subtitle">Publicar anuncio de búsqueda</span>
                                        </div>
                                        <div className="epic-button-arrow">→</div>
                                    </Link>
                                    <Link 
                                        href="/nuevo-anuncio?accion=encontrado" 
                                        className="epic-button epic-button-success"
                                    >
                                        <div className="epic-button-icon">🏠</div>
                                        <div className="epic-button-content">
                                            <span className="epic-button-title">He encontrado un perro</span>
                                            <span className="epic-button-subtitle">Reportar perro encontrado</span>
                                        </div>
                                        <div className="epic-button-arrow">→</div>
                                    </Link>
                                    <Link 
                                        href="/anuncios" 
                                        className="epic-button epic-button-secondary"
                                    >
                                        <div className="epic-button-icon">📋</div>
                                        <div className="epic-button-content">
                                            <span className="epic-button-title">Ver anuncios</span>
                                            <span className="epic-button-subtitle">Explorar anuncios activos</span>
                                        </div>
                                        <div className="epic-button-arrow">→</div>
                                    </Link>
                                    <Link 
                                        href="/guia" 
                                        className="epic-button epic-button-secondary"
                                    >
                                        <div className="epic-button-icon">📖</div>
                                        <div className="epic-button-content">
                                            <span className="epic-button-title">Guía de ayuda</span>
                                            <span className="epic-button-subtitle">Consejos y recomendaciones</span>
                                        </div>
                                        <div className="epic-button-arrow">→</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}


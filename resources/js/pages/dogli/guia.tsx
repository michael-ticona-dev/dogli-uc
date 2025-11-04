import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/components/dogli/Header';
import Navigation from '@/components/dogli/Navigation';
import Footer from '@/components/dogli/Footer';

interface AccordionItem {
    id: string;
    icon: string;
    title: string;
    content: React.ReactNode;
}

export default function Guia() {
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

    useEffect(() => {
        document.body.classList.add('page-loaded');
    }, []);

    const accordionItems: AccordionItem[] = [
        {
            id: '1',
            icon: 'bi-search',
            title: '1. Busca en los alrededores',
            content: (
                <div className="panel-content">
                    <p>¡Actúa rápido! Busca en los alrededores de tu casa, el perro puede estar asustado y escondido. Pídele ayuda a tus amigos y familiares.</p>
                    <ul>
                        <li>Busca en un radio de 2 km, el perro puede estar herido.</li>
                        <li>Llama a tu perro por su nombre, con voz fuerte y clara.</li>
                        <li>Sigue los caminos que el perro conoce (paseos habituales).</li>
                        <li>Busca en lugares tranquilos (jardines, garajes, bodegas).</li>
                        <li>Si tu perro tiene miedo, puede que no responda a tu llamada.</li>
                    </ul>
                    <div className="alert alert-info border-0" style={{ backgroundColor: '#D1C4E9' }}>
                        <strong>Consejo:</strong> Sal a buscar a tu perro a horas tranquilas (temprano en la mañana o tarde en la noche).
                    </div>
                </div>
            )
        },
        {
            id: '2',
            icon: 'bi-shield-check',
            title: '2. Informa a las autoridades',
            content: (
                <div className="panel-content">
                    <p>Contacta a las autoridades locales, ellos pueden ayudarte a encontrar a tu perro.</p>
                    <ul>
                        <li>Contacta al <a>Registro Canino</a> (si tu perro tiene chip).</li>
                        <li>Contacta a la <a>Policía Municipal</a>.</li>
                        <li>Contacta a las <a>Perreras</a> y <a>Protectoras de Animales</a>.</li>
                        <li>Contacta a los <a>Veterinarios</a> de la zona (pueden recibir perros heridos).</li>
                    </ul>
                </div>
            )
        },
        {
            id: '3',
            icon: 'bi-megaphone',
            title: '3. Difunde la información',
            content: (
                <div className="panel-content">
                    <p>La difusión es clave. Cuantas más personas sepan que tu perro está perdido, más posibilidades tienes de encontrarlo.</p>
                    <ul>
                        <li><strong>Coloca carteles:</strong> En tiendas, parques, clínicas veterinarias y postes (asegúrate de que sea legal).</li>
                        <li><strong>Usa las Redes Sociales:</strong> Publica en grupos de Facebook de tu barrio o ciudad, Instagram y Twitter.</li>
                        <li><strong>Publica tu anuncio aquí:</strong> Utiliza nuestro servicio para crear una alerta digital.</li>
                    </ul>
                </div>
            )
        },
        {
            id: '4',
            icon: 'bi-house-heart',
            title: '4. ¿Qué hago si he encontrado un perro?',
            content: (
                <div className="panel-content">
                    <p>Si has encontrado un perro, ¡gracias por ayudar! Aquí tienes los pasos a seguir:</p>
                    <ul>
                        <li><strong>Verifica si tiene identificación:</strong> Revisa si tiene una placa en el collar con un número de teléfono.</li>
                        <li><strong>Llévalo a un veterinario:</strong> Pide que escaneen gratis si tiene microchip. Si lo tiene, podrán contactar al dueño inmediatamente.</li>
                        <li><strong>Informa a las autoridades:</strong> Llama a la policía local o al centro de control de animales.</li>
                        <li><strong>Publica un anuncio:</strong> Utiliza nuestro formulario <a>"He encontrado un perro"</a>.</li>
                        <li><strong>No lo des en adopción:</strong> Legalmente, el perro no es tuyo. Debes esperar a que aparezca el propietario legal.</li>
                    </ul>
                </div>
            )
        }
    ];

    const toggleAccordion = (id: string) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <>
            <Head title="Guía - DogLi">
                <meta name="description" content="Guía moderna e interactiva con consejos de expertos sobre qué hacer si pierdes o encuentras un perro." />
            </Head>
            <div className="chien" style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
                <Header />
                <Navigation />
                
                <main className="container" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="text-center mb-5">
                                <h1 className="display-4 font-weight-bold" style={{ color: '#5C6BC0' }}>
                                    Guía Rápida
                                </h1>
                                <p className="lead text-muted">Qué hacer si pierdes o encuentras una mascota</p>
                            </div>

                            <div className="accordion-container">
                                {accordionItems.map((item) => (
                                    <React.Fragment key={item.id}>
                                        <button
                                            className={`accordion-header ${activeAccordion === item.id ? 'active' : ''}`}
                                            onClick={() => toggleAccordion(item.id)}
                                        >
                                            <i className={`bi ${item.icon} icon-left`}></i>
                                            {item.title}
                                        </button>
                                        <div
                                            className="accordion-panel"
                                            style={{
                                                maxHeight: activeAccordion === item.id ? '1000px' : '0'
                                            }}
                                        >
                                            {item.content}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}


import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Header from '@/components/dogli/Header';
import Navigation from '@/components/dogli/Navigation';
import Footer from '@/components/dogli/Footer';

const DISTRITOS_AREQUIPA = [
    "Alto Selva Alegre", "Arequipa", "Cayma", "Cerro Colorado", "Characato",
    "Chiguata", "Jacobo Hunter", "La Joya", "Mariano Melgar", "Miraflores",
    "Mollebaya", "Paucarpata", "Pocsi", "Polobaya", "Quequeña", "Sabandía",
    "Sachaca", "San Juan de Siguas", "San Juan de Tarucani", "Santa Isabel de Siguas",
    "Santa Rita de Siguas", "Socabaya", "Tiabaya", "Uchumayo", "Vitor",
    "Yanahuara", "Yarabamba", "Yura"
].sort();

const COLORES_PERRO = [
    "Negro", "Blanco", "Marrón (Café)", "Gris", "Canela (Rojo)",
    "Crema (Beige)", "Dorado", "Tricolor (3 colores)", "Otros/Inusual"
].sort();

export default function NuevoAnuncio({ accion }: { accion?: string }) {
    const [formData, setFormData] = useState({
        nombre_perro: '',
        tamano: '',
        raza: '',
        color_principal: '',
        color_secundario: '',
        pelo: '',
        pelaje: '',
        orejas: '',
        distrito: '',
        calle: '',
        contexto: ''
    });

    useEffect(() => {
        document.body.classList.add('page-loaded');
        // Obtener accion de URL si no viene como prop
        const urlParams = new URLSearchParams(window.location.search);
        const accionFromUrl = urlParams.get('accion') || accion;
        if (accionFromUrl === 'perdido') {
            // Mostrar campo nombre
        }
    }, [accion]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del anuncio:', formData);
        // Aquí iría la lógica para enviar al backend
        router.post('/anuncios', formData);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const accionFromUrl = urlParams.get('accion') || accion || 'encontrado';
    const esPerdido = accionFromUrl === 'perdido';

    return (
        <>
            <Head title="Nuevo Anuncio - DogLi">
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="center-content" style={{ 
                backgroundColor: '#f9fafb',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
                minHeight: '100vh',
                padding: '1rem'
            }}>
                <Link 
                    href="/" 
                    className="floating-home-button"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '20px',
                        zIndex: 1050,
                        backgroundColor: '#000000',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                    }}
                >
                    ← Regresar
                </Link>

                <div className="form-card" style={{
                    backgroundColor: '#ffffff',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e5e7eb',
                    width: '100%',
                    maxWidth: '600px',
                    boxSizing: 'border-box',
                    marginTop: '3rem'
                }}>
                    <h2 id="form-titulo" style={{
                        textAlign: 'center',
                        color: '#000000',
                        marginBottom: '2rem',
                        fontWeight: 700,
                        fontSize: '1.75rem'
                    }}>
                        Nuevo Anuncio
                    </h2>
                    
                    <form id="anuncio-form" onSubmit={handleSubmit}>
                        {esPerdido && (
                            <div className="input-group" style={{ marginBottom: '30px', position: 'relative' }}>
                                <input
                                    type="text"
                                    id="nombre-perro"
                                    name="nombre_perro"
                                    placeholder=" "
                                    value={formData.nombre_perro}
                                    onChange={handleChange}
                                    required={esPerdido}
                                    style={{
                                        width: '100%',
                                        padding: '15px 12px 5px 12px',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '1rem'
                                    }}
                                />
                                <label 
                                    htmlFor="nombre-perro"
                                    style={{
                                        position: 'absolute',
                                        top: formData.nombre_perro ? '-10px' : '15px',
                                        left: formData.nombre_perro ? '8px' : '12px',
                                        color: formData.nombre_perro ? '#7c3aed' : '#6b7280',
                                        fontSize: formData.nombre_perro ? '0.8rem' : '1rem',
                                        transition: '0.3s ease-out',
                                        backgroundColor: '#FFFFFF',
                                        padding: '0 4px',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    Nombre del perro *
                                </label>
                            </div>
                        )}

                        <div className="section-title" style={{
                            fontWeight: 600,
                            color: '#7c3aed',
                            margin: '2rem 0 1rem 0',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid #e5e7eb',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            🐕 Características Físicas
                        </div>

                        <label className="input-label" style={{
                            display: 'block',
                            fontWeight: 500,
                            marginBottom: '10px',
                            color: '#333333'
                        }}>
                            Tamaño *
                        </label>
                        <div className="card-selector-group size-selector" style={{
                            display: 'flex',
                            gap: '15px',
                            marginBottom: '30px'
                        }}>
                            {['Pequeño', 'Mediano', 'Grande'].map((tamano) => (
                                <React.Fragment key={tamano}>
                                    <input
                                        type="radio"
                                        id={`tamano-${tamano.toLowerCase().substring(0, 3)}`}
                                        name="tamano"
                                        value={tamano}
                                        checked={formData.tamano === tamano}
                                        onChange={handleChange}
                                        required
                                        style={{ display: 'none' }}
                                    />
                                    <label
                                        htmlFor={`tamano-${tamano.toLowerCase().substring(0, 3)}`}
                                        className="card-selector"
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            border: `1px solid ${formData.tamano === tamano ? '#7c3aed' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            backgroundColor: formData.tamano === tamano ? '#7c3aed' : '#ffffff',
                                            color: formData.tamano === tamano ? '#ffffff' : '#000000',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <span>{tamano}</span>
                                        <i className="icon" style={{ fontSize: '1.5rem' }}>
                                            {tamano === 'Pequeño' ? '🐶' : tamano === 'Mediano' ? '🐕' : '🐺'}
                                        </i>
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="input-group" style={{ marginBottom: '30px', position: 'relative' }}>
                            <input
                                type="text"
                                id="raza"
                                name="raza"
                                placeholder=" "
                                value={formData.raza}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '15px 12px 5px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '1rem'
                                }}
                            />
                            <label 
                                htmlFor="raza"
                                style={{
                                    position: 'absolute',
                                    top: formData.raza ? '-10px' : '15px',
                                    left: formData.raza ? '8px' : '12px',
                                    color: formData.raza ? '#7c3aed' : '#6b7280',
                                    fontSize: formData.raza ? '0.8rem' : '1rem',
                                    transition: '0.3s ease-out',
                                    backgroundColor: '#FFFFFF',
                                    padding: '0 4px',
                                    pointerEvents: 'none'
                                }}
                            >
                                Raza (Ej. Labrador, Mestizo) *
                            </label>
                        </div>

                        <div className="input-group" style={{ marginBottom: '30px' }}>
                            <label htmlFor="color-principal" style={{
                                display: 'block',
                                fontWeight: 500,
                                marginBottom: '10px',
                                color: '#333333'
                            }}>
                                Color Principal *
                            </label>
                            <select
                                id="color-principal"
                                name="color_principal"
                                value={formData.color_principal}
                                onChange={handleChange}
                                required
                                className="custom-select"
                                style={{
                                    width: '100%',
                                    padding: '15px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="" disabled>Seleccione el Color Principal</option>
                                {COLORES_PERRO.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group" style={{ marginBottom: '30px' }}>
                            <label htmlFor="color-secundario" style={{
                                display: 'block',
                                fontWeight: 500,
                                marginBottom: '10px',
                                color: '#333333'
                            }}>
                                Color Secundario (Opcional)
                            </label>
                            <select
                                id="color-secundario"
                                name="color_secundario"
                                value={formData.color_secundario}
                                onChange={handleChange}
                                className="custom-select"
                                style={{
                                    width: '100%',
                                    padding: '15px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="">No aplica o no visible</option>
                                {COLORES_PERRO.map(color => (
                                    <option key={color} value={color}>{color}</option>
                                ))}
                            </select>
                        </div>

                        {/* Similar para Pelo, Pelaje, Orejas */}
                        <label className="input-label" style={{
                            display: 'block',
                            fontWeight: 500,
                            marginBottom: '10px',
                            color: '#333333'
                        }}>
                            Tipo de Pelo *
                        </label>
                        <div className="card-selector-group size-selector" style={{
                            display: 'flex',
                            gap: '15px',
                            marginBottom: '30px'
                        }}>
                            {['Corto', 'Largo', 'Duro/Rizado'].map((tipo) => (
                                <React.Fragment key={tipo}>
                                    <input
                                        type="radio"
                                        id={`pelo-${tipo.toLowerCase().replace('/', '-')}`}
                                        name="pelo"
                                        value={tipo}
                                        checked={formData.pelo === tipo}
                                        onChange={handleChange}
                                        required
                                        style={{ display: 'none' }}
                                    />
                                    <label
                                        htmlFor={`pelo-${tipo.toLowerCase().replace('/', '-')}`}
                                        className="card-selector"
                                        style={{
                                            flex: 1,
                                            padding: '1rem',
                                            border: `1px solid ${formData.pelo === tipo ? '#7c3aed' : '#e5e7eb'}`,
                                            borderRadius: '8px',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            backgroundColor: formData.pelo === tipo ? '#7c3aed' : '#ffffff',
                                            color: formData.pelo === tipo ? '#ffffff' : '#000000'
                                        }}
                                    >
                                        {tipo}
                                    </label>
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="section-title" style={{
                            fontWeight: 600,
                            color: '#7c3aed',
                            margin: '2rem 0 1rem 0',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid #e5e7eb',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            📍 Lugar del Suceso
                        </div>

                        <div className="input-group" style={{ marginBottom: '30px' }}>
                            <label htmlFor="distrito" style={{
                                display: 'block',
                                fontWeight: 500,
                                marginBottom: '10px',
                                color: '#333333'
                            }}>
                                Distrito de Arequipa *
                            </label>
                            <select
                                id="distrito"
                                name="distrito"
                                value={formData.distrito}
                                onChange={handleChange}
                                required
                                className="custom-select"
                                style={{
                                    width: '100%',
                                    padding: '15px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '1rem'
                                }}
                            >
                                <option value="" disabled>Seleccione un Distrito</option>
                                {DISTRITOS_AREQUIPA.map(distrito => (
                                    <option key={distrito} value={distrito}>{distrito}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group" style={{ marginBottom: '30px', position: 'relative' }}>
                            <input
                                type="text"
                                id="calle"
                                name="calle"
                                placeholder=" "
                                value={formData.calle}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '15px 12px 5px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '1rem'
                                }}
                            />
                            <label 
                                htmlFor="calle"
                                style={{
                                    position: 'absolute',
                                    top: formData.calle ? '-10px' : '15px',
                                    left: formData.calle ? '8px' : '12px',
                                    color: formData.calle ? '#7c3aed' : '#6b7280',
                                    fontSize: formData.calle ? '0.8rem' : '1rem',
                                    transition: '0.3s ease-out',
                                    backgroundColor: '#FFFFFF',
                                    padding: '0 4px',
                                    pointerEvents: 'none'
                                }}
                            >
                                Calle, Avenida o Referencia *
                            </label>
                        </div>

                        <div className="section-title" style={{
                            fontWeight: 600,
                            color: '#7c3aed',
                            margin: '2rem 0 1rem 0',
                            paddingBottom: '0.5rem',
                            borderBottom: '1px solid #e5e7eb',
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            📝 Contexto y Detalles Adicionales
                        </div>

                        <div className="input-group" style={{ marginBottom: '30px', position: 'relative' }}>
                            <textarea
                                id="contexto"
                                name="contexto"
                                placeholder=" "
                                rows={4}
                                value={formData.contexto}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '25px 12px 5px 12px',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    fontSize: '1rem',
                                    resize: 'vertical'
                                }}
                            />
                            <label 
                                htmlFor="contexto"
                                style={{
                                    position: 'absolute',
                                    top: formData.contexto ? '-10px' : '15px',
                                    left: formData.contexto ? '8px' : '12px',
                                    color: formData.contexto ? '#7c3aed' : '#6b7280',
                                    fontSize: formData.contexto ? '0.8rem' : '1rem',
                                    transition: '0.3s ease-out',
                                    backgroundColor: '#FFFFFF',
                                    padding: '0 4px',
                                    pointerEvents: 'none'
                                }}
                            >
                                ¿Qué pasó? Detalles de lo ocurrido, comportamiento del perro, u otra información relevante *
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="submit-button"
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: 'none',
                                borderRadius: '8px',
                                backgroundColor: '#7c3aed',
                                color: '#ffffff',
                                fontSize: '1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                letterSpacing: '0.5px',
                                marginTop: '1rem'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#8b5cf6';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 58, 237, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#7c3aed';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            Confirmar y continuar: Paso 2 - Ubicación
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}


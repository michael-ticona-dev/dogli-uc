import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navigation() {
    return (
        <nav id="menu" style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '1rem 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <Link href="/" className="logo" style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    height: '80px',
                    minWidth: '140px'
                }}>
                    <img 
                        src="/logo_DogLi.png" 
                        alt="DogLi UC" 
                        height="80" 
                        width="140"
                        style={{ 
                            objectFit: 'contain',
                            display: 'block',
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                        onError={(e) => {
                            // Fallback si la imagen no carga
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.innerHTML = '<span style="font-size: 1.5rem; font-weight: 700; color: #7c3aed;">DOGLI</span>';
                            target.parentElement?.appendChild(fallback);
                        }}
                    />
                </Link>
                
                <div className="mx-auto hideOnMobile" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    flex: 1
                }}>
                    <Link 
                        href="/" 
                        className="nav-link"
                        style={{
                            color: '#000000',
                            padding: '0.75rem 1.5rem',
                            textDecoration: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Inicio
                    </Link>
                    <Link 
                        href="/anuncios" 
                        className="nav-link"
                        style={{
                            color: '#000000',
                            padding: '0.75rem 1.5rem',
                            textDecoration: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Anuncios
                    </Link>
                    <Link 
                        href="/guia" 
                        className="nav-link"
                        style={{
                            color: '#000000',
                            padding: '0.75rem 1.5rem',
                            textDecoration: 'none',
                            fontWeight: 500,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Guía
                    </Link>
                </div>
            </div>
        </nav>
    );
}


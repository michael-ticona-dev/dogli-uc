import React from 'react';

export default function Footer() {
    return (
        <footer 
            id="footer_round" 
            className="hideOnMobile mt-2"
        >
            <div id="footer" style={{ padding: '1rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div style={{ 
                            flex: '1 1 50%', 
                            marginBottom: '0.5rem',
                            fontWeight: 'bold'
                        }}>
                            <strong>©2025 DogLi</strong>
                        </div>
                        <div style={{ 
                            flex: '1 1 50%',
                            textAlign: 'right'
                        }}>
                            <a style={{ marginRight: '0.5rem' }}>País/Regiones</a>| 
                            <a style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>Razas de perros</a>| 
                            <a style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>Contacto</a>| 
                            <a style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>Ayuda</a>| 
                            <a style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>Información jurídica</a>| 
                            <a style={{ marginLeft: '0.5rem' }}>Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


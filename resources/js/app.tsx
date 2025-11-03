import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

console.log('🚀 app.tsx está cargando...');

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Esperar a que el DOM esté listo antes de inicializar Inertia
function initInertia() {
    console.log('🔄 Inicializando Inertia...');
    const appElement = document.getElementById('app');
    if (!appElement) {
        console.error('❌ CRÍTICO: No se encontró el elemento #app. Reintentando en 100ms...');
        setTimeout(initInertia, 100);
        return;
    }
    
    console.log('✅ Elemento #app encontrado:', appElement);

    createInertiaApp({
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob('./pages/**/*.tsx'),
            ),
        setup({ el, App, props }) {
            if (!el) {
                console.error('❌ Inertia: No se encontró el elemento root. Buscando #app...');
                el = document.getElementById('app');
                if (!el) {
                    console.error('❌ Inertia: El elemento #app no existe en el DOM');
                    return;
                }
            }
            console.log('✅ Inertia: Inicializando aplicación en elemento:', el);
            const root = createRoot(el);
            root.render(<App {...props} />);
        },
        progress: {
            color: '#4B5563',
        },
    });

    console.log('✅ Inertia App creado exitosamente');
}

// Asegurar que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInertia);
} else {
    // DOM ya está listo
    initInertia();
}

// This will set light / dark mode on load...
initializeTheme();

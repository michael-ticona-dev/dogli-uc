import { useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function NuevoAnuncio({ accion }: { accion?: string }) {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth?.user;

    useEffect(() => {
        // Si el usuario está autenticado, redirigir a mascotas/create
        if (isAuthenticated) {
            router.visit('/mascotas/create');
        } else {
            // Si no está autenticado, redirigir a login con mensaje
            router.visit('/login', {
                data: {
                    intended: '/mascotas/create',
                    message: 'Para publicar un anuncio, primero debes iniciar sesión o crear una cuenta.'
                }
            });
        }
    }, [isAuthenticated]);

    return (
        <>
            <Head title="Redirigiendo..." />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600 mb-4"></div>
                    <h2 className="text-2xl font-bold text-slate-900">Redirigiendo...</h2>
                    <p className="text-slate-600 mt-2">
                        {isAuthenticated
                            ? 'Te estamos llevando al formulario de publicación.'
                            : 'Necesitas iniciar sesión primero.'}
                    </p>
                </div>
            </div>
        </>
    );
}

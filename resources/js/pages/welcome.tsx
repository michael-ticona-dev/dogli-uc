import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Heart, MapPin, MessageCircle, Users, Shield, BarChart, Camera, Search } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Dogli UC - Adopción Responsable de Animales">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Dogli UC
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            href={register()}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                        >
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                            Encuentra un Hogar para
                            <span className="text-blue-600 dark:text-blue-400"> Cada Mascota</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Conectamos a rescatistas, adoptantes y organizaciones protectoras en una
                            plataforma digital segura para promover la adopción responsable y reducir
                            el abandono animal.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-blue-500"
                                    >
                                        Comenzar
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="text-base font-semibold leading-6 text-gray-900 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                    >
                                        Ya tengo cuenta <span aria-hidden="true">→</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                            ¿Por qué elegir Dogli UC?
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Herramientas diseñadas para facilitar el proceso de adopción y crear
                            una comunidad comprometida con el bienestar animal.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
                        {[
                            {
                                name: 'Gestión de Animales',
                                description:
                                    'Registra, edita y gestiona el proceso de adopción de mascotas de manera sencilla.',
                                icon: Camera,
                            },
                            {
                                name: 'Geolocalización',
                                description:
                                    'Encuentra mascotas disponibles cerca de tu ubicación para facilitar el proceso de adopción.',
                                icon: MapPin,
                            },
                            {
                                name: 'Mensajería Interna',
                                description:
                                    'Comunícate de forma segura entre adoptantes y rescatistas directamente en la plataforma.',
                                icon: MessageCircle,
                            },
                            {
                                name: 'Sistema de Usuarios',
                                description:
                                    'Roles diferenciados para administradores, rescatistas y adoptantes con permisos adecuados.',
                                icon: Users,
                            },
                            {
                                name: 'Panel Administrativo',
                                description:
                                    'Control completo de publicaciones, usuarios y reportes con herramientas avanzadas.',
                                icon: Shield,
                            },
                            {
                                name: 'Estadísticas',
                                description:
                                    'Métricas de adopción y actividad para mejorar continuamente el proceso.',
                                icon: BarChart,
                            },
                        ].map((feature) => (
                            <div
                                key={feature.name}
                                className="flex flex-col rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {feature.name}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="bg-blue-600">
                        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    ¿Listo para hacer la diferencia?
                                </h2>
                                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                                    Únete a nuestra comunidad y ayuda a encontrar un hogar para
                                    mascotas que lo necesitan.
                                </p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link
                                        href={register()}
                                        className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm transition-colors hover:bg-gray-50"
                                    >
                                        Crear Cuenta Gratis
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    Dogli UC
                                </span>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Promoviendo la adopción responsable de animales en situación de calle
                            </p>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                                © {new Date().getFullYear()} Dogli UC. Todos los derechos reservados.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

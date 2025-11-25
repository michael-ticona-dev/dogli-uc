import { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Heart, MapPin, ShieldCheck, Camera, Coins, Users, Medal, Sparkles, BellRing, HandCoins, PawPrint, Share2, MessagesSquare } from 'lucide-react';
import Header from '@/components/dogli/Header';
import Navigation from '@/components/dogli/Navigation';
import Footer from '@/components/dogli/Footer';
import PetMap from '@/components/pet-map';
import type { PetCase } from '@/types';

const lostCases: PetCase[] = [
    {
        id: 1,
        user_id: 1,
        pet_id: 1,
        type: 'lost',
        status: 'open',
        lat: -16.409047,
        lng: -71.537451,
        reward_amount: 600,
        description: 'Husky hembra vista por Parque Selva Alegre, lleva collar lila y responde a Luna.',
        created_at: '2025-01-15T00:00:00Z',
        pet: {
            id: 1,
            name: 'Luna',
            species: 'Perro',
            breed: 'Husky',
            gender: 'Hembra',
            color: 'Blanca',
        },
    },
    {
        id: 2,
        user_id: 2,
        pet_id: 2,
        type: 'lost',
        status: 'open',
        lat: -16.4231,
        lng: -71.5305,
        reward_amount: 350,
        description: 'Mestizo café extraviado cerca del terminal terrestre. Tiene chip registrado.',
        created_at: '2025-01-12T00:00:00Z',
        pet: {
            id: 2,
            name: 'Chaska',
            species: 'Perro',
            breed: 'Mestizo',
            gender: 'Macho',
            color: 'Café',
        },
    },
    {
        id: 3,
        user_id: 3,
        pet_id: 3,
        type: 'lost',
        status: 'open',
        lat: -16.3982,
        lng: -71.5369,
        reward_amount: 500,
        description: 'Beagle juvenil perdido en Yanahuara. Última vez visto con chaleco rojo.',
        created_at: '2025-01-10T00:00:00Z',
        pet: {
            id: 3,
            name: 'Milo',
            species: 'Perro',
            breed: 'Beagle',
            gender: 'Macho',
            color: 'Tricolor',
        },
    },
];

const adoptionHighlights = [
    {
        name: 'Killa',
        shelter: 'Refugio Patitas Felices',
        mood: 'Tranquila, ideal para departamentos en Arequipa',
        tags: ['Esterilizada', 'Vacunas al día', 'Sociable con niños'],
        photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
        status: 'Listo para adoptar',
    },
    {
        name: 'Toby',
        shelter: 'Asociación Vida Animal',
        mood: 'Juguetón y listo para familias activas',
        tags: ['Adiestrado', 'Microchip', 'Se lleva con otros perros'],
        photo: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=600&q=80',
        status: 'En recuperación',
    },
    {
        name: 'Nuna',
        shelter: 'Albergue Sol y Huellas',
        mood: 'Cachorra rescatada, necesita hogar responsable',
        tags: ['Desparasitada', 'Lista para adopción', 'Seguimiento post-adopción'],
        photo: 'https://images.unsplash.com/photo-1504598291285-4a0b1be9aa61?auto=format&fit=crop&w=600&q=80',
        status: 'Urgente',
    },
];

const socialFeed = [
    {
        title: 'Nuevo álbum desde Albergue Sol y Huellas',
        author: 'Equipo de Sol y Huellas',
        content: 'Subimos las fotos de los cachorros rescatados en Cayma. Ayúdanos a compartirlos para que encuentren hogar en Arequipa.',
        reactions: '132 me gusta',
        comments: '28 comentarios',
    },
    {
        title: 'Recompensa activa en Yanahuara',
        author: 'Fiorella Muñoz',
        content: 'Busco a Luna (Husky). Hay S/600 de recompensa. Última ubicación: Parque Selva Alegre. Gracias por las alertas del mapa.',
        reactions: '210 apoyos',
        comments: '16 pistas verificadas',
    },
    {
        title: 'Administrador verificó nuevas fotos',
        author: 'Moderación Dogli UC',
        content: 'Fotos y descripciones aprobadas para 5 albergues. Mantenemos la red libre de spam y con contenido verificado.',
        reactions: 'Proceso en vivo',
        comments: 'Moderación activa',
    },
];

const shelterProfiles = [
    {
        name: 'Refugio Patitas Felices',
        focus: 'Adopción responsable y campañas de esterilización en Cercado',
        donations: 'Recibimos donaciones para alimento y cirugías',
        followers: '2.1k seguidores',
    },
    {
        name: 'Asociación Vida Animal',
        focus: 'Rescate de emergencias y seguimiento post-adopción',
        donations: 'Necesitamos apoyo para transporte y medicinas',
        followers: '1.6k seguidores',
    },
    {
        name: 'Albergue Sol y Huellas',
        focus: 'Programas con colegios y visitas guiadas en Arequipa',
        donations: 'Dona para kits de vacunación y microchips',
        followers: '940 seguidores',
    },
];

export default function DogliIndex() {
    useEffect(() => {
        document.body.classList.add('page-loaded');
    }, []);

    return (
        <>
            <Head title="DogLi UC - Red social de adopción y recompensas en Arequipa">
                <meta
                    name="description"
                    content="Red social para adopción responsable, refugios y recompensas por mascotas perdidas en Arequipa, Perú."
                />
                <meta name="keywords" content="adopción, refugios, recompensas, Arequipa, mascotas" />
                <link
                    rel="preconnect"
                    href="https://fonts.bunny.net"
                />
                <link
                    href="https://fonts.bunny.net/css?family=space-grotesk:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen bg-white text-slate-900"
                style={{ fontFamily: '"Space Grotesk", var(--font-sans), sans-serif' }}
            >
                <Header />
                <Navigation />

                <main className="space-y-16 pb-24" role="main">
                    {/* Hero */}
                    <section className="relative overflow-hidden px-6 py-12 lg:py-16" aria-labelledby="hero-title">
                        <div className="absolute inset-0 bg-[#FEF3C7]" />
                        <div className="relative mx-auto max-w-6xl">
                            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700 border border-blue-100">
                                        <MapPin className="h-4 w-4 text-blue-600" />
                                        <span>Arequipa, Perú · Radar activo y comunidad social</span>
                                    </div>
                                    <h1 id="hero-title" className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                                        Red social ligera para refugios, adoptantes y recompensas
                                    </h1>
                                    <p className="text-lg text-slate-700">
                                        Inicia sesión como usuario, albergue o administrador. Publica animales en adopción con fotos, recibe donaciones,
                                        y usa el mapa para ofrecer recompensas por cada mascota perdida en Arequipa.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Link
                                            href="/register"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow"
                                        >
                                            Crear mi perfil
                                            <Sparkles className="h-5 w-5" />
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-lg font-semibold text-slate-800 transition hover:border-blue-400 hover:text-blue-700"
                                        >
                                            Iniciar sesión
                                            <Heart className="h-5 w-5 text-blue-600" />
                                        </Link>
                                        <Link
                                            href="/mascotas/create"
                                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FB7185] px-6 py-3 text-lg font-semibold text-[#FB7185] transition hover:bg-[#FFE4E6]"
                                        >
                                            Publicar adopción o mascota perdida
                                            <Share2 className="h-5 w-5" />
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-700 sm:grid-cols-4">
                                        {[
                                            { label: 'Roles activos', value: 'Usuario · Albergue · Admin' },
                                            { label: 'Recompensas', value: 'S/600+ activas' },
                                            { label: 'Refugios', value: '15 en Arequipa' },
                                            { label: 'Moderación', value: 'Fotos y mensajes verificados' },
                                        ].map((item) => (
                                            <div key={item.label} className="rounded-xl bg-white p-4 shadow-sm border border-slate-100">
                                                <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                                                <p className="mt-1 text-base font-semibold text-slate-900">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">Radar de recompensas</p>
                                            <p className="text-3xl font-semibold text-blue-700">Arequipa Centro</p>
                                        </div>
                                        <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                                            En tiempo real
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {lostCases.map((pet) => (
                                            <div
                                                key={pet.id}
                                                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-blue-50 p-4"
                                            >
                                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl border border-blue-100">
                                                    🐾
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm text-blue-700">Recompensa S/{pet.reward_amount}</p>
                                                        <span className="text-xs text-slate-500">Perdido</span>
                                                    </div>
                                                    <p className="font-semibold text-slate-900">{pet.pet?.name}</p>
                                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                                        <MapPin className="h-3 w-3" />
                                                        <span>Zona: {pet.description.split('.')[0]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-800 border border-orange-100">
                                        Usa tu cuenta para reclamar una recompensa, subir evidencias y coordinar la entrega segura.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Roles */}
                    <section className="px-6 py-12">
                        <div className="mx-auto max-w-6xl">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Roles y autenticación</p>
                                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Un inicio de sesión para cada tipo de usuario</h2>
                                </div>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                                >
                                    Crear cuenta ahora
                                    <Heart className="h-4 w-4 text-orange-500" />
                                </Link>
                            </div>
                            <div className="mt-8 grid gap-6 md:grid-cols-3">
                                {[
                                    {
                                        title: 'Usuario adoptante',
                                        desc: 'Sigue albergues, guarda favoritos, chatea y solicita adopciones.',
                                        icon: <Users className="h-5 w-5 text-blue-600" />,
                                        accent: 'from-blue-50 to-white',
                                    },
                                    {
                                        title: 'Albergue / Asociación',
                                        desc: 'Publica animales con fotos, recibe donaciones y muestra tu perfil verificado.',
                                        icon: <Camera className="h-5 w-5 text-blue-600" />,
                                        accent: 'from-blue-50 to-white',
                                    },
                                    {
                                        title: 'Administrador',
                                        desc: 'Verifica fotos, modera mensajes y aprueba solicitudes de recompensa.',
                                        icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
                                        accent: 'from-blue-50 to-white',
                                    },
                                ].map((role) => (
                                    <div
                                        key={role.title}
                                        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${role.accent}`} />
                                        <div className="relative space-y-3">
                                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800 border border-blue-100">
                                                {role.icon}
                                                <span>{role.title}</span>
                                            </div>
                                            <p className="text-slate-700">{role.desc}</p>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <BellRing className="h-4 w-4 text-blue-600" />
                                                <span>Notificaciones sociales y alertas por zona</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Social feed */}
                    <section className="px-6 py-12">
                        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-[#FFE4E6] p-8 shadow-lg">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Modo social</p>
                                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Feed colaborativo de adopciones y hallazgos</h2>
                                    <p className="mt-2 text-slate-600">
                                        Historias, álbumes con fotos, publicaciones de albergues y reportes de recompensas moderados por el administrador.
                                    </p>
                                </div>
                                <Link
                                    href="/mascotas"
                                    className="inline-flex items-center gap-2 rounded-full border border-[#FB7185] px-4 py-2 text-sm font-semibold text-[#FB7185] transition hover:bg-[#FFE4E6]"
                                >
                                    Ver anuncios y timeline
                                    <MessagesSquare className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="mt-6 grid gap-4 lg:grid-cols-3">
                                {socialFeed.map((item) => (
                                    <div key={item.title} className="rounded-2xl border border-[#FEE2E2] bg-white p-5">
                                        <p className="text-xs text-[#FB7185]">{item.author}</p>
                                        <p className="mt-1 text-lg font-semibold text-slate-900">{item.title}</p>
                                        <p className="mt-2 text-sm text-slate-700">{item.content}</p>
                                        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                                            <span>{item.reactions}</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-300" />
                                            <span>{item.comments}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Mapa y recompensas */}
                    <section className="px-6 py-12">
                        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-5">
                            <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Mapa en Arequipa</p>
                                        <h3 className="text-2xl font-bold text-slate-900">Mascotas perdidas por zona</h3>
                                        <p className="text-sm text-slate-600">Activa las alertas y ofrece recompensas geolocalizadas.</p>
                                    </div>
                                    <Link
                                        href="/mascotas"
                                        className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                                    >
                                        Abrir radar
                                    </Link>
                                </div>
                                <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                                    <PetMap cases={lostCases} />
                                </div>
                                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
                                    <span className="rounded-full bg-blue-50 px-3 py-1">Arequipa Cercado</span>
                                    <span className="rounded-full bg-blue-50 px-3 py-1">Yanahuara</span>
                                    <span className="rounded-full bg-blue-50 px-3 py-1">Cayma</span>
                                    <span className="rounded-full bg-blue-50 px-3 py-1">Alto Selva Alegre</span>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-6 shadow-lg">
                                    <div className="flex items-center gap-3">
                                        <Coins className="h-10 w-10 text-orange-500" />
                                        <div>
                                            <p className="text-sm text-orange-700">Sistema de recompensas</p>
                                            <p className="text-2xl font-bold text-slate-900">Ofrece y reclama con pruebas</p>
                                        </div>
                                    </div>
                                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                                        <li className="flex items-start gap-2">
                                            <Medal className="mt-0.5 h-4 w-4 text-orange-500" />
                                            <span>Asignación de recompensa por usuario o albergue, con validación del administrador.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <HandCoins className="mt-0.5 h-4 w-4 text-orange-500" />
                                            <span>Reclama con fotos y ubicación. El admin revisa pruebas antes de liberar el pago.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <ShieldCheck className="mt-0.5 h-4 w-4 text-orange-500" />
                                            <span>Moderación de mensajes y fotos para evitar fraude y spam.</span>
                                        </li>
                                    </ul>
                                    <Link
                                        href="/mascotas?type=lost"
                                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow"
                                    >
                                        Ver casos con recompensa
                                        <ArrowRightIcon />
                                    </Link>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Perfiles de albergues</p>
                                    <h3 className="text-xl font-bold text-slate-900">Donaciones, fotos y seguidores</h3>
                                    <div className="mt-4 space-y-4">
                                        {shelterProfiles.map((shelter) => (
                                            <div key={shelter.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-slate-900">{shelter.name}</p>
                                                    <span className="text-xs text-slate-500">{shelter.followers}</span>
                                                </div>
                                                <p className="mt-1 text-sm text-slate-700">{shelter.focus}</p>
                                                <div className="mt-2 flex items-center justify-between text-xs text-blue-700">
                                                    <span>{shelter.donations}</span>
                                                    <Link
                                                        href="/refugios"
                                                        className="rounded-full bg-blue-50 px-3 py-1 font-semibold transition hover:bg-blue-100"
                                                    >
                                                        Ver perfil
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Adopciones */}
                    <section className="px-6 py-12">
                        <div className="mx-auto max-w-6xl">
                            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">Animales en adopción</p>
                                    <h2 className="text-3xl font-bold text-slate-900">Publicaciones con fotos desde albergues verificados</h2>
                                    <p className="text-slate-600">Cada adopción tiene seguimiento y chat entre el albergue y el adoptante.</p>
                                </div>
                                <Link
                                    href="/mascotas"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow"
                                >
                                    Explorar adopciones
                                    <PawPrint className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="mt-6 grid gap-6 md:grid-cols-3">
                                {adoptionHighlights.map((pet) => (
                                    <div
                                        key={pet.name}
                                        className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
                                    >
                                        <div className="h-44 w-full overflow-hidden">
                                            <img
                                                src={pet.photo}
                                                alt={pet.name}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-2 p-5">
                                            <p className="text-sm text-blue-700">{pet.shelter}</p>
                                            <p className="text-xl font-bold text-slate-900">{pet.name}</p>
                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                                                pet.status === 'Listo para adoptar' ? 'bg-[#DCFCE7] text-[#166534]' :
                                                pet.status === 'En recuperación' ? 'bg-[#FFEDD5] text-[#9A3412]' :
                                                'bg-[#FEE2E2] text-[#B91C1C]'
                                            }`}>
                                                {pet.status}
                                            </span>
                                            <p className="text-sm text-slate-700">{pet.mood}</p>
                                            <div className="flex flex-wrap gap-2 text-xs text-blue-700">
                                                {pet.tags.map((tag) => (
                                                    <span key={tag} className="rounded-full bg-blue-50 px-3 py-1">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between pt-2 text-sm text-slate-700">
                                                <span>Donaciones habilitadas</span>
                                                <Link
                                                    href="/refugios"
                                                    className="rounded-full border border-[#FB7185] px-3 py-1 font-semibold text-[#FB7185] transition hover:bg-[#FFE4E6]"
                                                >
                                                    Donar al refugio
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Flujo */}
                    <section className="px-6 py-12">
                        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                            <div className="grid gap-8 md:grid-cols-4">
                                {[
                                    {
                                        title: '1. Crea tu cuenta',
                                        desc: 'Selecciona si eres usuario, albergue o administrador. Autenticación diferenciada.',
                                        icon: <Users className="h-5 w-5 text-blue-600" />,
                                    },
                                    {
                                        title: '2. Publica con fotos',
                                        desc: 'Albergues suben animales en adopción y usuarios reportan mascotas perdidas con geolocalización.',
                                        icon: <Camera className="h-5 w-5 text-blue-600" />,
                                    },
                                    {
                                        title: '3. Mapa y recompensas',
                                        desc: 'Asigna recompensas, reclama con pruebas y sigue el mapa de Arequipa por zonas.',
                                        icon: <MapPin className="h-5 w-5 text-blue-600" />,
                                    },
                                    {
                                        title: '4. Moderación activa',
                                        desc: 'El administrador verifica mensajes, fotos y pruebas de pago para mantener la red segura.',
                                        icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
                                    },
                                ].map((step) => (
                                    <div key={step.title} className="space-y-2 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-800">
                                            {step.icon}
                                            <span>{step.title}</span>
                                        </div>
                                        <p className="text-sm text-slate-700">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA final */}
                    <section className="px-6">
                        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-blue-50 via-white to-orange-50 p-10 text-center shadow-lg">
                            <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold">Arequipa lista</p>
                            <h2 className="text-3xl font-bold text-slate-900">Activa tu rol y comienza a ayudar hoy</h2>
                            <p className="max-w-3xl text-lg text-slate-700">
                                Inicia sesión, sigue a tus albergues favoritos, dona, reporta animales perdidos en tu zona y reclama recompensas con la
                                supervisión del administrador.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:shadow"
                                >
                                    Crear cuenta gratis
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center gap-2 rounded-2xl border border-blue-200 px-6 py-3 text-lg font-semibold text-blue-700 transition hover:bg-blue-50"
                                >
                                    Ya tengo cuenta
                                    <Heart className="h-5 w-5 text-orange-500" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
}

function ArrowRightIcon() {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

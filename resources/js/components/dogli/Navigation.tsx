import { Link } from '@inertiajs/react';
import { Gift, MapPin, PawPrint, ShieldCheck, Sparkles } from 'lucide-react';

export default function Navigation() {
    const items = [
        { label: 'Inicio', href: '/' },
        { label: 'Radar', href: '/mascotas' },
        { label: 'Refugios', href: '/refugios' },
        { label: 'Recompensas', href: '/mascotas?type=lost' },
        { label: 'Guía', href: '/guia' },
    ];

    return (
        <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
                        <PawPrint className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">Comunidad Arequipa</p>
                        <p className="text-lg font-bold text-slate-900">DogLi UC</p>
                    </div>
                </Link>

                <div className="flex flex-1 flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                    {items.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="rounded-full px-4 py-2 transition hover:bg-emerald-50 hover:text-emerald-700"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 transition hover:border-emerald-400 hover:text-emerald-700"
                    >
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        Iniciar sesión
                    </Link>
                    <Link
                        href="/register"
                        className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md"
                    >
                        <Sparkles className="h-4 w-4" />
                        Crear cuenta
                    </Link>
                    <Link
                        href="/refugios"
                        className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs text-emerald-700 transition hover:bg-emerald-100 sm:flex"
                    >
                        <Gift className="h-4 w-4" />
                        Donar a un albergue
                    </Link>
                </div>
            </div>
        </nav>
    );
}

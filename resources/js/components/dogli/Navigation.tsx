import { Link, usePage } from '@inertiajs/react';
import { Gift, MapPin, PawPrint, ShieldCheck, Sparkles, User, LogOut, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import UserAvatar from '@/components/user-avatar';
import type { SharedData } from '@/types';

export default function Navigation() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth?.user;
    const [showUserMenu, setShowUserMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const items = [
        { label: 'Inicio', href: '/' },
        { label: 'Radar', href: '/mascotas' },
        { label: 'Refugios', href: '/refugios' },
        { label: 'Recompensas', href: '/mascotas?type=lost' },
        { label: 'Guía', href: '/guia' },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                    {isAuthenticated && auth.user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 transition hover:bg-emerald-100"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>

                            {/* User Menu */}
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 transition hover:border-emerald-400 hover:bg-emerald-50"
                                >
                                    <UserAvatar user={auth.user} size="sm" />
                                    <span className="hidden sm:inline">{auth.user.name}</span>
                                    <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg py-2">
                                        <div className="px-4 py-3 border-b border-slate-100">
                                            <p className="text-sm font-semibold text-slate-900">{auth.user.name}</p>
                                            <p className="text-xs text-slate-500">{auth.user.email}</p>
                                        </div>

                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>

                                        <Link
                                            href="/settings/profile"
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Configuración
                                        </Link>

                                        <div className="border-t border-slate-100 mt-2 pt-2">
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Cerrar sesión
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
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
                        </>
                    )}

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

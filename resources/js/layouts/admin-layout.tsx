import { PropsWithChildren } from 'react';
import { Head, Link } from '@inertiajs/react';
import { route } from '@/lib/route';
import { LayoutDashboard, ShieldCheck, AlertTriangle, LogOut, Home } from 'lucide-react';
import { User } from '@/types';

interface Props {
    user: User;
}

export default function AdminLayout({ children, user }: PropsWithChildren<Props>) {
    const navigation = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: 'Verificaciones', href: route('admin.verifications'), icon: ShieldCheck },
        { name: 'Moderación', href: route('admin.moderation'), icon: AlertTriangle },
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
            <Head title="Admin Panel" />

            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
                <div className="p-6">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <span className="text-purple-400">Admin</span>Panel
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${window.location.pathname === item.href
                                    ? 'bg-purple-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link
                        href={route('dashboard')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
                    >
                        <Home size={20} />
                        Volver al Sitio
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64">
                <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center justify-between px-8">
                    <h1 className="font-semibold text-lg">Panel de Administración</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Admin: {user?.name}</span>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

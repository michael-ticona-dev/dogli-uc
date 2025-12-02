export default function Footer() {
    const links = [
        { label: 'Radar en Arequipa', href: '/mascotas' },
        { label: 'Refugios verificados', href: '/refugios' },
        { label: 'Recompensas activas', href: '/mascotas?type=lost' },
        { label: 'Panel administrador', href: '/admin' },
    ];

    return (
        <footer className="border-t border-slate-200 bg-[#F3F4F6] text-slate-700">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <img
                        src="/Pagina/logo.webp"
                        alt="DogLi UC"
                        className="h-8 w-auto mb-2"
                    />
                    <p className="text-sm text-slate-600">Arequipa, Perú — adopciones, refugios y recompensas geolocalizadas.</p>
                    <p className="text-xs text-slate-500">© {new Date().getFullYear()} DogLi. Comunidad segura y moderada.</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="rounded-full bg-white px-3 py-2 text-[#4B5563] transition hover:text-[#22C55E] hover:bg-white"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

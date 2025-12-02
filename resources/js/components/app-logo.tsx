export default function AppLogo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <img
                src="/Pagina/logo.webp"
                alt="Dogli UC Logo"
                className="h-8 w-auto object-contain"
            />
            <span className="truncate leading-tight font-semibold text-lg">
                Dogli UC
            </span>
        </div>
    );
}

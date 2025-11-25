import { BellRing, Heart, MapPin, ShieldCheck } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white text-slate-900 shadow-sm">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100">
                        <Heart className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-emerald-600 font-semibold">Red social de mascotas</p>
                        <p className="text-lg font-semibold leading-tight text-slate-900">DogLi UC · Arequipa</p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                        Radar por zonas
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        Moderación admin
                    </span>
                    <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-100">
                        <BellRing className="h-4 w-4 text-emerald-600" />
                        Alertas y recompensas
                    </span>
                </div>
            </div>
        </header>
    );
}

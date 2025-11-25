import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-[#F9FAFB] px-6 py-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                                <AppLogoIcon className="size-9 fill-current text-emerald-600" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                            <p className="text-sm text-slate-600">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

// Simple route helper that maps route names to URLs
// This is a temporary solution until Wayfinder routes are properly configured

export function route(name: string, params?: any): string {
    const routes: Record<string, (params?: any) => string> = {
        'dashboard': () => '/dashboard',
        'mascotas.index': (p?: any) => {
            if (p?.type) return `/mascotas?type=${p.type}`;
            return '/mascotas';
        },
        'mascotas.create': () => '/mascotas/create',
        'mascotas.show': (id: number) => `/mascotas/${id}`,
        'mascotas.store': () => '/mascotas',
        'refugios.index': () => '/refugios',
        'refugios.show': (id: number) => `/refugios/${id}`,
        'donaciones.create': (id: number) => `/refugios/${id}/donar`,
        'donaciones.store': (id: number) => `/refugios/${id}/donar`,
        'perfil.show': (id: number) => `/perfil/${id}`,
        'perfil.follow': (id: number) => `/perfil/${id}/follow`,
        'perfil.unfollow': (id: number) => `/perfil/${id}/unfollow`,
        'recompensas.create': (id: number) => `/mascotas/${id}/reclamar-recompensa`,
        'recompensas.store': (id: number) => `/mascotas/${id}/reclamar-recompensa`,
        'recompensas.manage': (id: number) => `/mascotas/${id}/gestionar-reclamaciones`,
        'recompensas.approve': (id: number) => `/reclamaciones/${id}/aprobar`,
        'recompensas.reject': (id: number) => `/reclamaciones/${id}/rechazar`,
        'recompensas.paid': (id: number) => `/reclamaciones/${id}/marcar-pagado`,
        'admin.dashboard': () => '/admin',
        'admin.verifications': () => '/admin/verificaciones',
        'admin.verifications.approve': (id: number) => `/admin/verificaciones/${id}/approve`,
        'admin.verifications.reject': (id: number) => `/admin/verificaciones/${id}/reject`,
        'admin.moderation': () => '/admin/moderacion',
        'admin.moderation.resolve': (id: number) => `/admin/moderacion/${id}/resolve`,
    };

    const routeFn = routes[name];
    if (!routeFn) {
        console.warn(`Route ${name} not found, returning /`);
        return '/';
    }

    return routeFn(params);
}

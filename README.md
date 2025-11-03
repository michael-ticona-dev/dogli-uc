feat(ui,dx): landing Dogli UC + mejoras Inertia/Vite; desactiva SSR

- config/inertia.php: SSR desactivado ('enabled' => false); se mantiene URL del servidor SSR para futura reactivación.
- resources/js/app.tsx: bootstrap de Inertia movido a initInertia() con logs de diagnóstico, reintentos si falta #app y comprobaciones extra antes de montar.
- resources/js/pages/welcome.tsx: reemplazo total por landing de Dogli UC (hero, estadísticas, pasos, testimonios, CTA, iconos lucide-react).
- resources/js/types/index.d.ts: tipos compartidos ajustados para permitir auth.user: User | null en Auth y SharedData.
- resources/views/app.blade.php: limpieza de texto de prueba; scripts inline para auditar carga de Inertia y detectar errores de Vite/HMR.
- vite.config.ts: servidor de desarrollo configurado (host 127.0.0.1, puerto 5173, HMR en la misma IP).
- public/debug.html, public/test.html: utilidades estáticas para verificar conexión Vite/Inertia.

BREAKING CHANGE: SSR queda deshabilitado. Si producción dependía de SSR, volver a 'enabled' => true o revertir este commit.

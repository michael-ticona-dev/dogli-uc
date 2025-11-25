// Import custom route helper
import type { route as routeType } from '@/lib/route';

declare global {
    const route: typeof routeType;
}

export { };

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Map, Heart, Home, PawPrint, LayoutDashboard, Building2 } from 'lucide-react';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Inicio',
        href: route('home'),
        icon: Home,
    },
    {
        title: 'Dashboard',
        href: route('dashboard'),
        icon: LayoutDashboard,
    },
    {
        title: 'Radar de Mascotas',
        href: route('mascotas.index'),
        icon: Map,
    },
    {
        title: 'Refugios',
        href: route('refugios.index'),
        icon: Building2,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Donar',
        href: route('refugios.index'), // Redirect to shelters list to choose one
        icon: Heart,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <div className="flex items-center gap-3">
                                    <AppLogoIcon className="h-8 w-8" />
                                    <span className="font-bold text-lg">DogLi UC</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

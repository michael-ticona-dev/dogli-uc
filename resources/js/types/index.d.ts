export interface User {
    id: number;
    name: string;
    email: string;
    type: 'user' | 'shelter' | 'admin';
    is_verified: boolean;
    verification_requested_at?: string;
    bio?: string;
    avatar_path?: string;
    phone?: string;
    shelter_profile?: ShelterProfile;
}

export interface ShelterProfile {
    id: number;
    official_name: string;
    address?: string;
    website?: string;
    bio?: string;
    verified_at?: string;
    logo_path?: string;
    banner_path?: string;
}

export interface Pet {
    id: number;
    name: string;
    species: string;
    breed?: string;
    color?: string;
    gender?: string;
    photo_path?: string;
}

export interface PetCase {
    id: number;
    user_id: number;
    pet_id: number;
    type: 'lost' | 'found' | 'adoption';
    status: 'open' | 'closed' | 'resolved';
    lat: number;
    lng: number;
    reward_amount?: number;
    description: string;
    resolved_at?: string;
    created_at: string;
    pet?: Pet;
    user?: User;
}

export interface Pagination<T> {
    data: T[];
    links: any[];
    meta: any;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: any;
    isActive?: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: string | { url: string };
}

export interface Comment {
    id: number;
    user_id: number;
    pet_case_id: number;
    content: string;
    parent_id?: number;
    created_at: string;
    user?: User;
}

export interface Auth {
    user: User | null;
}

export interface SharedData {
    auth: Auth;
    [key: string]: any;
}

export interface Message {
    id: number;
    conversation_id: number;
    sender_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
    sender?: User;
}

export interface Conversation {
    id: number;
    user_one_id: number;
    user_two_id: number;
    pet_case_id?: number;
    created_at: string;
    updated_at: string;
    user_one?: User;
    user_two?: User;
    pet_case?: PetCase;
    messages?: Message[];
}

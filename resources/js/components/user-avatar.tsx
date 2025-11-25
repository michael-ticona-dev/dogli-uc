import { type User } from '@/types';

interface UserAvatarProps {
    user: User | { name: string; avatar_path?: string };
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-12 w-12 text-base',
    lg: 'h-16 w-16 text-xl',
    xl: 'h-24 w-24 text-3xl',
};

const colors = [
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
];

export default function UserAvatar({ user, size = 'md', className = '' }: UserAvatarProps) {
    // Get initials from name
    const getInitials = (name: string): string => {
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Get consistent color based on name
    const getColor = (name: string): string => {
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    const initials = getInitials(user.name);
    const bgColor = getColor(user.name);

    if (user.avatar_path) {
        return (
            <img
                src={user.avatar_path}
                alt={user.name}
                className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
            />
        );
    }

    return (
        <div
            className={`flex items-center justify-center rounded-full font-bold text-white ${bgColor} ${sizeClasses[size]} ${className}`}
        >
            {initials}
        </div>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { MessageSquare, User as UserIcon } from 'lucide-react';
import { Conversation, User } from '@/types';

interface ChatIndexProps {
    conversations: Conversation[];
}

export default function ChatIndex({ conversations }: ChatIndexProps) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const getOtherUser = (conversation: Conversation) => {
        return conversation.user_one_id === user.id ? conversation.user_two : conversation.user_one;
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Mensajes', href: route('chat.index') }]}>
            <Head title="Mensajes" />

            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-800">Mensajes</h1>
                    </div>

                    {conversations.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {conversations.map((conversation) => {
                                const otherUser = getOtherUser(conversation);
                                const lastMessage = conversation.messages?.[0];
                                const isUnread = lastMessage && !lastMessage.is_read && lastMessage.sender_id !== user.id;

                                return (
                                    <Link
                                        key={conversation.id}
                                        href={route('chat.show', conversation.id)}
                                        className={`block p-4 hover:bg-gray-50 transition ${isUnread ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                <UserIcon className="text-gray-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className={`font-semibold text-gray-900 truncate ${isUnread ? 'font-bold' : ''}`}>
                                                        {otherUser?.name || 'Usuario'}
                                                    </h3>
                                                    {lastMessage && (
                                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                            {new Date(lastMessage.created_at).toLocaleDateString()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className={`text-sm truncate ${isUnread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                                        {lastMessage ? (
                                                            <>
                                                                {lastMessage.sender_id === user.id && 'Tú: '}
                                                                {lastMessage.content}
                                                            </>
                                                        ) : (
                                                            <span className="italic text-gray-400">Sin mensajes</span>
                                                        )}
                                                    </p>
                                                    {conversation.pet_case && (
                                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                                                            {conversation.pet_case.pet?.name || 'Mascota'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <MessageSquare className="text-gray-400 h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes mensajes</h3>
                            <p>Cuando contactes a alguien por una mascota, la conversación aparecerá aquí.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Send, ArrowLeft, User as UserIcon } from 'lucide-react';
import { Conversation, Message, User } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { router } from '@inertiajs/react';

interface ChatShowProps {
    conversation: Conversation;
    messages: Message[];
}

export default function ChatShow({ conversation, messages }: ChatShowProps) {
    const { auth } = usePage().props as any;
    const user = auth.user;
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [localMessages, setLocalMessages] = useState(messages);

    const { data, setData, post, processing, reset } = useForm({
        content: '',
    });

    const otherUser = conversation.user_one_id === user.id ? conversation.user_two : conversation.user_one;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        setLocalMessages(messages);
        scrollToBottom();
    }, [messages]);

    // Polling for new messages
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['messages'], preserveUrl: true });
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.content.trim()) return;

        post(`/chat/${conversation.id}`, {
            onSuccess: () => {
                reset();
                scrollToBottom();
            },
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Mensajes', href: route('chat.index') },
            { title: otherUser?.name || 'Chat', href: '#' }
        ]}>
            <Head title={`Chat con ${otherUser?.name}`} />

            <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] p-4 flex flex-col">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-white z-10">
                        <Link href={route('chat.index')} className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="text-gray-500 h-6 w-6" />
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-gray-900">{otherUser?.name}</h2>
                            {conversation.pet_case && (
                                <Link
                                    href={route('mascotas.show', conversation.pet_case.id)}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Sobre: {conversation.pet_case.pet?.name}
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {localMessages.map((message) => {
                            const isMe = message.sender_id === user.id;
                            return (
                                <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${isMe
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                        }`}>
                                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                                        <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                                            {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                disabled={processing}
                            />
                            <button
                                type="submit"
                                disabled={processing || !data.content.trim()}
                                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

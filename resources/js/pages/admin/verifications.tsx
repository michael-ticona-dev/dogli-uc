import AdminLayout from '@/layouts/admin-layout';
import { User } from '@/types';
import { CheckCircle, XCircle, Shield } from 'lucide-react';
import { router } from '@inertiajs/react';
import { route } from '@/lib/route';
import { useState } from 'react';

interface Props {
    auth: { user: User };
    shelters: {
        data: User[];
        links: any[];
    };
}

export default function Verifications({ auth, shelters }: Props) {
    const [rejectingId, setRejectingId] = useState<number | null>(null);
    const [reason, setReason] = useState('');

    const handleApprove = (id: number) => {
        if (confirm('¿Estás seguro de verificar este albergue?')) {
            router.post(route('admin.verifications.approve', id));
        }
    };

    const handleReject = (id: number) => {
        if (!reason.trim()) return;
        router.post(route('admin.verifications.reject', id), { reason });
        setRejectingId(null);
        setReason('');
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Verificación de Albergues</h1>
                <p className="text-gray-600">Revisa y aprueba las solicitudes de verificación de albergues.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {shelters.data.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {shelters.data.map((shelter) => (
                            <div key={shelter.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                                            <Shield size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold">{shelter.shelter_profile?.official_name || shelter.name}</h3>
                                            <div className="text-sm text-gray-500 mb-2">
                                                Registrado el {new Date(shelter.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                                <div><span className="font-semibold">Email:</span> {shelter.email}</div>
                                                <div><span className="font-semibold">Teléfono:</span> {shelter.phone || 'N/A'}</div>
                                                <div><span className="font-semibold">Dirección:</span> {shelter.shelter_profile?.address || 'N/A'}</div>
                                                <div><span className="font-semibold">Web:</span> {shelter.shelter_profile?.website || 'N/A'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 min-w-[150px]">
                                        {rejectingId === shelter.id ? (
                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                <input
                                                    type="text"
                                                    placeholder="Razón del rechazo..."
                                                    className="w-full text-sm border-gray-300 rounded mb-2"
                                                    value={reason}
                                                    onChange={(e) => setReason(e.target.value)}
                                                    autoFocus
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleReject(shelter.id)}
                                                        className="flex-1 bg-red-600 text-white text-xs py-1 rounded hover:bg-red-700"
                                                    >
                                                        Confirmar
                                                    </button>
                                                    <button
                                                        onClick={() => setRejectingId(null)}
                                                        className="flex-1 bg-gray-200 text-gray-700 text-xs py-1 rounded hover:bg-gray-300"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleApprove(shelter.id)}
                                                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                                                >
                                                    <CheckCircle size={18} />
                                                    Aprobar
                                                </button>
                                                <button
                                                    onClick={() => setRejectingId(shelter.id)}
                                                    className="flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition"
                                                >
                                                    <XCircle size={18} />
                                                    Rechazar
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-gray-500">
                        <Shield size={48} className="mx-auto mb-4 opacity-30" />
                        <p>No hay solicitudes de verificación pendientes.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { route } from '@/lib/route';
import UserAvatar from '@/components/user-avatar';
import { PetCase, User } from '@/types';
import { CheckCircle, XCircle, DollarSign, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface RewardClaim {
    id: number;
    pet_case_id: number;
    claimer: User;
    status: 'pending' | 'approved' | 'rejected' | 'paid';
    proof: string;
    amount: number;
    rejection_reason?: string;
    approved_at?: string;
    paid_at?: string;
    created_at: string;
}

interface Props {
    petCase: PetCase;
    claims: RewardClaim[];
}

export default function ManageClaims({ petCase, claims }: Props) {
    const [rejectionReason, setRejectionReason] = useState('');
    const [rejectingClaimId, setRejectingClaimId] = useState<number | null>(null);

    const handleApprove = (claimId: number) => {
        router.post(route('recompensas.approve', claimId));
    };

    const handleReject = (claimId: number) => {
        if (!rejectionReason.trim()) {
            alert('Por favor proporciona una razón para el rechazo');
            return;
        }
        router.post(route('recompensas.reject', claimId), {
            rejection_reason: rejectionReason,
        });
        setRejectingClaimId(null);
        setRejectionReason('');
    };

    const handleMarkAsPaid = (claimId: number) => {
        if (confirm('¿Confirmas que has pagado esta recompensa? Esta acción marcará el caso como resuelto.')) {
            router.post(route('recompensas.paid', claimId));
        }
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: { label: 'Pendiente', className: 'bg-yellow-100 text-yellow-700' },
            approved: { label: 'Aprobado', className: 'bg-green-100 text-green-700' },
            rejected: { label: 'Rechazado', className: 'bg-red-100 text-red-700' },
            paid: { label: 'Pagado', className: 'bg-blue-100 text-blue-700' },
        };
        const badge = badges[status as keyof typeof badges];
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>
                {badge.label}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Mascotas', href: route('mascotas.index') },
            { title: petCase.pet?.name || 'Mascota', href: route('mascotas.show', petCase.id) },
            { title: 'Gestionar Reclamaciones', href: route('recompensas.manage', petCase.id) }
        ]}>
            <Head title={`Gestionar Reclamaciones - ${petCase.pet?.name}`} />

            <div className="max-w-5xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Reclamaciones de Recompensa</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Para: {petCase.pet?.name} • Recompensa: S/ {petCase.reward_amount}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-purple-600">{claims.length}</div>
                            <div className="text-sm text-gray-500">Reclamaciones</div>
                        </div>
                    </div>
                </div>

                {/* Claims List */}
                {claims.length > 0 ? (
                    <div className="space-y-4">
                        {claims.map((claim) => (
                            <div
                                key={claim.id}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <UserAvatar user={claim.claimer} size="lg" />
                                        <div>
                                            <div className="font-bold text-lg">{claim.claimer.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Reclamado el {new Date(claim.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(claim.status)}
                                        <div className="text-2xl font-bold text-green-600">
                                            ${claim.amount}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm font-semibold text-gray-500 mb-2">Detalles de cómo encontró la mascota:</div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-gray-700 dark:text-gray-300">
                                        {claim.proof}
                                    </div>
                                </div>

                                {claim.status === 'rejected' && claim.rejection_reason && (
                                    <div className="mb-4">
                                        <div className="text-sm font-semibold text-red-600 mb-2">Razón del Rechazo:</div>
                                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-red-700 dark:text-red-300">
                                            {claim.rejection_reason}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-3">
                                    {claim.status === 'pending' && (
                                        <>
                                            <Button
                                                onClick={() => handleApprove(claim.id)}
                                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle size={18} />
                                                Aprobar
                                            </Button>
                                            {rejectingClaimId === claim.id ? (
                                                <div className="flex gap-2 flex-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Razón del rechazo..."
                                                        value={rejectionReason}
                                                        onChange={(e) => setRejectionReason(e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                    <Button
                                                        onClick={() => handleReject(claim.id)}
                                                        variant="destructive"
                                                    >
                                                        Confirmar
                                                    </Button>
                                                    <Button
                                                        onClick={() => setRejectingClaimId(null)}
                                                        variant="outline"
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Button
                                                    onClick={() => setRejectingClaimId(claim.id)}
                                                    variant="outline"
                                                    className="flex items-center gap-2"
                                                >
                                                    <XCircle size={18} />
                                                    Rechazar
                                                </Button>
                                            )}
                                        </>
                                    )}

                                    {claim.status === 'approved' && (
                                        <Button
                                            onClick={() => handleMarkAsPaid(claim.id)}
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                                        >
                                            <DollarSign size={18} />
                                            Marcar como Pagado
                                        </Button>
                                    )}

                                    {claim.status === 'paid' && (
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <CheckCircle size={20} />
                                            <span className="font-semibold">
                                                Pagado el {new Date(claim.paid_at!).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
                        <Clock size={64} className="mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-bold mb-2">No hay reclamaciones aún</h3>
                        <p className="text-gray-500">
                            Cuando alguien reclame la recompensa, aparecerá aquí para que la revises.
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

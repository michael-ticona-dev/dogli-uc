import AdminLayout from '@/layouts/admin-layout';
import { User } from '@/types';
import { AlertTriangle, CheckCircle, Trash2, Ban } from 'lucide-react';
import { router } from '@inertiajs/react';
import { route } from '@/lib/route';
import { useState } from 'react';

interface Report {
    id: number;
    reason: string;
    details: string;
    created_at: string;
    reporter: User;
    reportable_type: string;
    reportable_id: number;
    reportable: any;
}

interface Props {
    auth: { user: User };
    reports: {
        data: Report[];
        links: any[];
    };
}

export default function Moderation({ auth, reports }: Props) {
    const [notes, setNotes] = useState('');
    const [selectedReport, setSelectedReport] = useState<number | null>(null);

    const handleResolve = (id: number, action: 'dismiss' | 'delete_content' | 'ban_user') => {
        if (action !== 'dismiss' && !confirm('¿Estás seguro de realizar esta acción?')) return;

        router.post(route('admin.moderation.resolve', id), {
            action,
            admin_notes: notes
        });

        setSelectedReport(null);
        setNotes('');
    };

    return (
        <AdminLayout user={auth.user}>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Moderación de Contenido</h1>
                <p className="text-gray-600">Revisa los reportes de contenido inapropiado.</p>
            </div>

            <div className="space-y-4">
                {reports.data.length > 0 ? (
                    reports.data.map((report) => (
                        <div key={report.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-red-100 rounded-lg text-red-600">
                                    <AlertTriangle size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-lg text-red-600">{report.reason}</h3>
                                        <span className="text-sm text-gray-500">
                                            {new Date(report.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        Reportado por <span className="font-semibold">{report.reporter.name}</span>: "{report.details}"
                                    </p>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 border border-gray-200 dark:border-gray-600">
                                        <div className="text-xs font-bold text-gray-500 uppercase mb-2">
                                            Contenido Reportado ({report.reportable_type.split('\\').pop()})
                                        </div>
                                        {/* Render content preview based on type */}
                                        {report.reportable_type.includes('PetCase') && (
                                            <div>
                                                <div className="font-bold">{report.reportable?.pet?.name || 'Mascota'}</div>
                                                <div className="text-sm">{report.reportable?.description}</div>
                                            </div>
                                        )}
                                        {report.reportable_type.includes('Comment') && (
                                            <div className="italic">"{report.reportable?.content}"</div>
                                        )}
                                        {report.reportable_type.includes('User') && (
                                            <div className="flex items-center gap-2">
                                                <div className="font-bold">{report.reportable?.name}</div>
                                                <div className="text-sm text-gray-500">{report.reportable?.email}</div>
                                            </div>
                                        )}
                                    </div>

                                    {selectedReport === report.id ? (
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <textarea
                                                className="w-full border-gray-300 rounded mb-3 text-sm"
                                                placeholder="Notas del administrador (opcional)..."
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                rows={2}
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleResolve(report.id, 'dismiss')}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
                                                >
                                                    <CheckCircle size={16} />
                                                    Descartar
                                                </button>
                                                <button
                                                    onClick={() => handleResolve(report.id, 'delete_content')}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-orange-100 text-orange-700 py-2 rounded hover:bg-orange-200"
                                                >
                                                    <Trash2 size={16} />
                                                    Borrar Contenido
                                                </button>
                                                <button
                                                    onClick={() => handleResolve(report.id, 'ban_user')}
                                                    className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 rounded hover:bg-red-200"
                                                >
                                                    <Ban size={16} />
                                                    Banear Usuario
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setSelectedReport(null)}
                                                className="w-full mt-2 text-xs text-gray-500 hover:underline"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedReport(report.id)}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                                        >
                                            Resolver Reporte
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center text-gray-500">
                        <CheckCircle size={48} className="mx-auto mb-4 text-green-500 opacity-50" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Todo limpio</h3>
                        <p>No hay reportes de contenido pendientes de revisión.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

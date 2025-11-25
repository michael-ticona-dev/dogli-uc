import AdminLayout from '@/layouts/admin-layout';
import { User } from '@/types';
import { Users, Building2, AlertTriangle, FileText } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { route } from '@/lib/route';

interface Props {
    auth: { user: User };
    stats: {
        total_users: number;
        total_shelters: number;
        pending_verifications: number;
        active_cases: number;
        pending_reports: number;
    };
    recentReports: any[];
    pendingShelters: any[];
}

export default function AdminDashboard({ auth, stats, recentReports, pendingShelters }: Props) {
    return (
        <AdminLayout user={auth.user}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <Users className="text-blue-600" size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.total_users}</div>
                    <div className="text-sm text-gray-500">Usuarios Totales</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <Building2 className="text-purple-600" size={24} />
                        </div>
                        {stats.pending_verifications > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                {stats.pending_verifications} Pendientes
                            </span>
                        )}
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.total_shelters}</div>
                    <div className="text-sm text-gray-500">Albergues Registrados</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                            <FileText className="text-green-600" size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.active_cases}</div>
                    <div className="text-sm text-gray-500">Casos Activos</div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                            <AlertTriangle className="text-red-600" size={24} />
                        </div>
                        {stats.pending_reports > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                                {stats.pending_reports} Nuevos
                            </span>
                        )}
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.pending_reports}</div>
                    <div className="text-sm text-gray-500">Reportes Pendientes</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pending Verifications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Verificaciones Pendientes</h2>
                        <Link href={route('admin.verifications')} className="text-purple-600 hover:underline text-sm">
                            Ver todas
                        </Link>
                    </div>

                    {pendingShelters.length > 0 ? (
                        <div className="space-y-4">
                            {pendingShelters.map((shelter) => (
                                <div key={shelter.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <div className="font-semibold">{shelter.shelter_profile?.official_name || shelter.name}</div>
                                        <div className="text-sm text-gray-500">Solicitado: {new Date(shelter.verification_requested_at).toLocaleDateString()}</div>
                                    </div>
                                    <Link href={route('admin.verifications')}>
                                        <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium hover:bg-purple-200">
                                            Revisar
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            No hay verificaciones pendientes
                        </div>
                    )}
                </div>

                {/* Recent Reports */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Reportes Recientes</h2>
                        <Link href={route('admin.moderation')} className="text-purple-600 hover:underline text-sm">
                            Ver todos
                        </Link>
                    </div>

                    {recentReports.length > 0 ? (
                        <div className="space-y-4">
                            {recentReports.map((report) => (
                                <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div>
                                        <div className="font-semibold text-red-600">{report.reason}</div>
                                        <div className="text-sm text-gray-500">Reportado por: {report.reporter?.name}</div>
                                    </div>
                                    <Link href={route('admin.moderation')}>
                                        <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm font-medium hover:bg-gray-300">
                                            Ver
                                        </button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            No hay reportes pendientes
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

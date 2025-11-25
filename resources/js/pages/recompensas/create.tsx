import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { route } from '@/lib/route';
import { PetCase } from '@/types';
import { AlertCircle, Award, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

interface Props {
    petCase: PetCase;
}

export default function ClaimReward({ petCase }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        proof: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('recompensas.store', petCase.id));
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Mascotas', href: route('mascotas.index') },
            { title: petCase.pet?.name || 'Mascota', href: route('mascotas.show', petCase.id) },
            { title: 'Reclamar Recompensa', href: route('recompensas.create', petCase.id) }
        ]}>
            <Head title={`Reclamar Recompensa - ${petCase.pet?.name}`} />

            <div className="max-w-3xl mx-auto p-6">
                {/* Reward Info Card */}
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-lg p-8 mb-6 text-white">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-4 bg-white/20 backdrop-blur rounded-full">
                            <Award size={32} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Recompensa Disponible</h1>
                            <p className="text-yellow-100">Por ayudar a encontrar a {petCase.pet?.name}</p>
                        </div>
                    </div>
                    <div className="text-5xl font-bold mb-2">S/ {petCase.reward_amount}</div>
                    <div className="text-yellow-100">Monto ofrecido por el dueño</div>
                </div>

                {/* Pet Case Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">Información del Caso</h2>
                    <div className="space-y-3">
                        <div>
                            <div className="text-sm text-gray-500">Mascota</div>
                            <div className="font-semibold">{petCase.pet?.name} - {petCase.pet?.species}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Dueño</div>
                            <div className="font-semibold">{petCase.user?.name}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Ubicación Reportada</div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-gray-400" />
                                <span>{petCase.lat}, {petCase.lng}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Descripción</div>
                            <div className="text-gray-700 dark:text-gray-300">{petCase.description}</div>
                        </div>
                    </div>
                </div>

                {/* Claim Form */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-4">Detalles de tu Reclamación</h2>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                        <div className="flex gap-3">
                            <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                            <div className="text-sm text-blue-900 dark:text-blue-100">
                                <div className="font-semibold mb-1">Importante</div>
                                <p>El dueño revisará tu reclamación antes de aprobar el pago. Asegúrate de proporcionar detalles específicos sobre cómo encontraste a la mascota.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="proof">
                                ¿Cómo encontraste a la mascota? *
                            </Label>
                            <Textarea
                                id="proof"
                                value={data.proof}
                                onChange={(e) => setData('proof', e.target.value)}
                                placeholder="Describe en detalle cómo y dónde encontraste a la mascota. Incluye la fecha, hora, ubicación exacta, y cualquier detalle que ayude a verificar tu reclamación..."
                                rows={6}
                                className="mt-2"
                                required
                            />
                            <InputError message={errors.proof} className="mt-2" />
                            <div className="text-sm text-gray-500 mt-2">
                                Mínimo 20 caracteres. Sé lo más específico posible.
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                disabled={processing || data.proof.length < 20}
                                className="flex-1"
                                size="lg"
                            >
                                {processing ? 'Enviando...' : 'Enviar Reclamación'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                                disabled={processing}
                                size="lg"
                            >
                                Cancelar
                            </Button>
                        </div>

                        <div className="text-sm text-gray-500 text-center">
                            Al enviar esta reclamación, confirmas que has encontrado a la mascota y que la información proporcionada es verídica.
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

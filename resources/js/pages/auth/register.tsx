import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { User, Building2, Shield } from 'lucide-react';

export default function Register() {
    const [accountType, setAccountType] = useState<'user' | 'shelter'>('user');

    return (
        <AuthLayout
            title="Crea tu cuenta en DogLi UC"
            description="Elige tu tipo de cuenta y completa tus datos para publicar, adoptar o gestionar refugios."
        >
            <Head title="Registro" />

            {/* Account Type Selection */}
            <div className="mb-6">
                <Label className="mb-3 block">Tipo de cuenta</Label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setAccountType('user')}
                        className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${accountType === 'user'
                                ? 'border-[#22C55E] bg-[#ECFDF3]'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <User className={accountType === 'user' ? 'text-[#22C55E]' : 'text-gray-400'} size={32} />
                        <div>
                            <div className="font-semibold">Usuario</div>
                            <div className="text-xs text-muted-foreground">Adopta, sigue refugios y reclama recompensas</div>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={() => setAccountType('shelter')}
                        className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all ${accountType === 'shelter'
                                ? 'border-[#22C55E] bg-[#ECFDF3]'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <Building2 className={accountType === 'shelter' ? 'text-[#22C55E]' : 'text-gray-400'} size={32} />
                        <div>
                            <div className="font-semibold">Refugio / Asociación</div>
                            <div className="text-xs text-muted-foreground">Publica adopciones, recibe donaciones y muestra tu perfil</div>
                        </div>
                    </button>
                </div>
            </div>

            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="type" value={accountType} />

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    {accountType === 'shelter' ? 'Nombre de la organización' : 'Nombre completo'}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder={accountType === 'shelter' ? 'Nombre del refugio' : 'Tu nombre'}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {accountType === 'shelter' && (
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Teléfono de contacto</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        tabIndex={3}
                                        name="phone"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            )}

                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirmar contraseña
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="••••••••"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            {accountType === 'shelter' && (
                                <div className="rounded-lg bg-emerald-50 p-4 text-sm">
                                    <div className="flex gap-2">
                                        <Shield className="h-5 w-5 flex-shrink-0 text-emerald-600" />
                                        <div>
                                            <div className="font-semibold text-emerald-900">
                                                Verificación de refugio
                                            </div>
                                            <div className="text-emerald-700">
                                                Tras registrarte, envía tus documentos para obtener la insignia verificada y habilitar donaciones.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-[#22C55E] hover:bg-[#16A34A] text-white"
                                tabIndex={6}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Crear cuenta {accountType === 'shelter' ? 'de refugio' : ''}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            ¿Ya tienes cuenta?{' '}
                            <TextLink href={login()} tabIndex={7}>
                                Inicia sesión
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

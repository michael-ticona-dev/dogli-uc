<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>


        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name',     'Laravel') }}</title>

        <link rel="icon" href="/Pagina/icono.webp" type="image/webp">
        <link rel="apple-touch-icon" href="/Pagina/icono.webp">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
        <meta name="csrf-token" content="{{ csrf_token() }}">
    </head>
    <body class="font-sans antialiased">
        @inertia
        
        {{-- Script de diagnóstico para verificar que Inertia se está cargando --}}
        <script>
            window.addEventListener('DOMContentLoaded', function() {
                const app = document.getElementById('app');
                if (app) {
                    console.log('✅ Elemento #app encontrado');
                    const dataPage = app.getAttribute('data-page');
                    if (dataPage) {
                        console.log('✅ Atributo data-page encontrado');
                        try {
                            const pageData = JSON.parse(dataPage);
                            console.log('✅ Datos de Inertia:', pageData);
                        } catch (e) {
                            console.error('❌ Error al parsear data-page:', e);
                        }
                    } else {
                        console.error('❌ No se encontró el atributo data-page');
                    }
                } else {
                    console.error('❌ No se encontró el elemento #app');
                }
            });
            
            // Verificar si los scripts de Vite se cargan
            window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('vite') || e.filename && e.filename.includes('5173')) {
                    console.error('❌ Error al cargar Vite:', e.message, e.filename);
                }
            }, true);
        </script>
    </body>
</html>

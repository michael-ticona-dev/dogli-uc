<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PetImageAnalyzer
{
    /**
     * Analiza una imagen de mascota usando AWS Rekognition
     * 
     * @param string $imageUrl URL de la imagen a analizar
     * @return array ['tipo' => string, 'posible_raza' => array, 'colores' => array]
     */
    public function analyze(string $imageUrl): array
    {
        $apiUrl = config('services.aws.rekognition_api_url');

        if (empty($apiUrl)) {
            Log::warning('AWS Rekognition API URL not configured');
            return $this->getDefaultResponse();
        }

        try {
            $payload = [];
            
            // Check if it's a Data URI (Base64)
            if (str_starts_with($imageUrl, 'data:image')) {
                // Extract the base64 part
                $parts = explode(',', $imageUrl);
                if (count($parts) >= 2) {
                    $payload['imagen_base64'] = $parts[1];
                } else {
                    // Fallback if parsing fails, though it shouldn't for valid Data URIs
                    $payload['imagen_base64'] = $imageUrl;
                }
            } else {
                $payload['image_url'] = $imageUrl;
            }

            $response = Http::timeout(15)->post($apiUrl, $payload);

            if ($response->successful()) {
                $data = $response->json();
                
                return [
                    'tipo' => $data['tipo'] ?? 'No identificado',
                    'posible_raza' => $data['posible_raza'] ?? [],
                    'colores' => $data['colores'] ?? []
                ];
            }

            Log::error('AWS Rekognition API error', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return $this->getDefaultResponse();

        } catch (\Exception $e) {
            Log::error('Error calling AWS Rekognition API', [
                'message' => $e->getMessage()
            ]);

            return $this->getDefaultResponse();
        }
    }

    /**
     * Obtiene la raza principal detectada
     */
    public function getPrimaryBreed(array $analysisResult): string
    {
        if (empty($analysisResult['posible_raza'])) {
            return 'Mestizo/Desconocida';
        }

        return $analysisResult['posible_raza'][0];
    }

    /**
     * Obtiene el color principal
     */
    public function getPrimaryColor(array $analysisResult): string
    {
        if (empty($analysisResult['colores'])) {
            return '#808080'; // Gris por defecto
        }

        return $analysisResult['colores'][0];
    }

    /**
     * Verifica si es una mascota válida (perro o gato)
     */
    public function isValidPet(array $analysisResult): bool
    {
        $tipo = $analysisResult['tipo'] ?? '';
        return in_array($tipo, ['Perro', 'Gato']);
    }

    /**
     * Respuesta por defecto cuando falla el análisis
     */
    private function getDefaultResponse(): array
    {
        return [
            'tipo' => 'No identificado',
            'posible_raza' => [],
            'colores' => []
        ];
    }
}

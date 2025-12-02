# Integración de APIs - DogLi UC

## 📚 APIs Integradas

### 1. AWS Rekognition (vía API Gateway)
Análisis automático de imágenes de mascotas para detectar raza, especie y colores.

### 2. LocationIQ
Búsqueda y geocodificación de direcciones en Arequipa.

---

## ⚙️ Configuración

### Paso 1: Variables de Entorno

Agrega estas variables a tu archivo `.env` (NO lo subas a Git):

```bash
# AWS Rekognition - API Gateway
AWS_REKOGNITION_API_URL=https://tu-api-gateway-url.amazonaws.com/prod/analyze-pet

# LocationIQ
LOCATIONIQ_API_KEY=pk.tu_clave_aqui
```

### Paso 2: Verificar Archivos

Estos archivos fueron creados/modificados:

#### Backend
- `config/services.php` - Configuración de servicios externos
- `app/Services/PetImageAnalyzer.php` - Servicio para AWS Rekognition
- `app/Http/Controllers/MascotaController.php` - Endpoint `analyzeImage()`
- `routes/web.php` - Ruta POST para análisis

#### Frontend
- `resources/js/components/location-search.tsx` - Buscador de ubicaciones
- `resources/js/pages/mascotas/create.tsx` - Formulario renovado

---

## 🚀 Uso

### AWS Rekognition - Análisis de Imágenes

**Endpoint:** `POST /mascotas/analyze-image`

**Request:**
```json
{
  "image_url": "https://ejemplo.com/foto.jpg"
}
```

**Response (éxito):**
```json
{
  "success": true,
  "data": {
    "tipo": "Perro",
    "raza_principal": "Golden Retriever",
    "todas_razas": ["Golden Retriever", "Retriever"],
    "color_principal": "#d2b48c",
    "todos_colores": ["#d2b48c", "#8b4513", "#fffff0"]
  },
  "message": "¡Es un Perro de raza Golden Retriever!"
}
```

**Response (error - no es mascota):**
```json
{
  "success": false,
  "message": "No se detectó ningún perro o gato en la imagen..."
}
```

### LocationIQ - Búsqueda de Ubicaciones

**API Endpoint:** `https://us1.locationiq.com/v1/search`

**Parámetros:**
- `key` - Tu API key
- `q` - Texto de búsqueda
- `format` - json
- `limit` - Número de resultados (ej: 5)
- `countrycodes` - pe (solo Perú)

**Ejemplo desde el componente:**
```tsx
<LocationSearch 
    onLocationSelect={(lat, lng, displayName) => {
        console.log(`Ubicación: ${displayName}`);
        console.log(`Coordenadas: ${lat}, ${lng}`);
    }}
/>
```

---

## 🎨 Características del Nuevo Formulario

### 1. **Análisis de Imagen con IA**
- Pega la URL de una imagen de tu mascota
- Click en "Analizar" 
- La IA detecta automáticamente:
  - Especie (Perro/Gato)
  - Raza
  - Colores dominantes
- Auto-completa los campos del formulario

### 2. **Búsqueda de Ubicación**
- Escribe una dirección (ej: "Universidad Católica San Pablo")
- Selecciona de la lista de resultados
- El mapa se centra automáticamente
- También puedes hacer clic directo en el mapa

### 3. **UI Mejorada**
- Diseño moderno con gradientes
- Feedback visual en tiempo real
- Estados de carga animados
- Alertas de error/éxito claras
- Responsive (funciona en móvil y desktop)

---

## 🧪 Pruebas

### Probar AWS Rekognition

1. Inicia el servidor: `composer dev` o `php artisan serve`
2. Ve a: http://localhost:8000/mascotas/create
3. En la sección "Análisis de Imagen con IA":
   - Pega una URL de imagen (ej: `https://example.com/dog.jpg`)
   - Click "Analizar"
4. Verifica que:
   - Aparece "Análisis completado"
   - Muestra el tipo, raza y colores
   - El campo "Especie" se actualiza automáticamente

**URL de prueba:**
```
https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg
```

### Probar LocationIQ

1. En el formulario de crear mascota
2. En la sección "Ubicación":
   - Escribe "Parque Lambramani" o "UCSP Arequipa"
   - Click "Buscar"
3. Verifica que:
   - Aparecen resultados
   - Al seleccionar uno, el mapa se mueve
   - Las coordenadas se actualizan

---

## 🐛 Solución de Problemas

### Error: "No se detectó ningún perro o gato"
**Causa:** La imagen no es clara o no contiene una mascota
**Solución:** Usa una imagen con mejor calidad donde se vea claramente al animal

### Error: "Error al analizar la imagen"
**Causa:** La URL de la API Gateway es incorrecta o no está configurada
**Solución:** 
1. Verifica `.env` → `AWS_REKOGNITION_API_URL`
2. Asegúrate que la URL termine en `/analyze-pet` o similar
3. Ejecuta `php artisan config:clear`

### Error: LocationIQ no funciona
**Causa:** API key inválida o no configurada
**Solución:**
1. Verifica `.env` → `LOCATIONIQ_API_KEY=pk.xxxxx`
2. Ejecuta `npm run build` para recompilar el frontend
3. Verifica que `.env` tenga `VITE_LOCATIONIQ_API_KEY="${LOCATIONIQ_API_KEY}"`

### El mapa no se ve
**Causa:** Conflictos de CSS con Leaflet
**Solución:** 
- El import `import 'leaflet/dist/leaflet.css';` debe estar al inicio

---

## 📊 Flujo Completo del Usuario

1. Usuario accede a "Publicar Caso"
2. Sube imagen → IA detecta raza automáticamente
3. Busca su ubicación → LocationIQ autocompleta
4. Completa descripción y detalles
5. Envía formulario → Se crea el caso con toda la información

---

## 🔒 Seguridad

- ✅ Las API keys están en `.env` (no en Git)
- ✅ CSRF token en todas las peticiones
- ✅ Validación de URL en backend
- ✅ LocationIQ key solo se usa en frontend (operaciones de lectura)

---

## 📦 Dependencias

Ya instaladas (verificado en `package.json`):
- `leaflet` - Mapas
- `react-leaflet` - Componentes React para Leaflet
- `lucide-react` - Iconos

---

## ✅ Checklist de Deploy

Antes de subir a producción:

- [ ] Agregar variables `AWS_REKOGNITION_API_URL` y `LOCATIONIQ_API_KEY` en el servidor
- [ ] Ejecutar `composer install --optimize-autoloader --no-dev`
- [ ] Ejecutar `npm run build`
- [ ] Ejecutar `php artisan config:cache`
- [ ] Ejecutar `php artisan route:cache`
- [ ] Verificar que `.env` tenga las claves correctas
- [ ] Probar el formulario de creación de mascotas

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs: `storage/logs/laravel.log`
2. Abre la consola del navegador (F12) para ver errores de JavaScript
3. Verifica que todas las variables de entorno estén configuradas

---

**¡Listo! 🎉** Ahora tu plataforma tiene IA para identificar mascotas y búsqueda inteligente de ubicaciones.

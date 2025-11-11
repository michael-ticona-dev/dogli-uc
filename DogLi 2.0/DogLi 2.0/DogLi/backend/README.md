# Backend API para DogLi

## Requisitos

- PHP 7.4 o superior
- MySQL 5.7 o superior (o MariaDB)
- Extensiones PHP: PDO, PDO_MySQL, JSON

## Instalación

### 1. Crear la base de datos

Ejecuta el script SQL para crear la base de datos y las tablas:

```bash
mysql -u root -p < database.sql
```

O desde phpMyAdmin:
1. Abre phpMyAdmin
2. Ve a la pestaña "SQL"
3. Copia y pega el contenido de `database.sql`
4. Ejecuta el script

### 2. Configurar la conexión

Edita el archivo `config.php` y modifica las credenciales de la base de datos:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'dogli_db');
define('DB_USER', 'tu_usuario');
define('DB_PASS', 'tu_contraseña');
```

### 3. Configurar el servidor web

#### Con XAMPP/WAMP:
1. Copia la carpeta `backend` a `htdocs` (XAMPP) o `www` (WAMP)
2. Accede a: `http://localhost/backend/api_anuncios.php`

#### Con servidor PHP integrado:
```bash
cd backend
php -S localhost:8000
```

Accede a: `http://localhost:8000/api_anuncios.php`

## Endpoints de la API

### GET - Obtener todos los anuncios
```
GET /api_anuncios.php
```

Respuesta:
```json
{
    "success": true,
    "message": "Anuncios obtenidos exitosamente",
    "data": [
        {
            "id": 1,
            "accion": "perdido",
            "nombre_perro": "Max",
            "raza": "Labrador",
            ...
        }
    ]
}
```

### GET - Obtener un anuncio por ID
```
GET /api_anuncios.php?id=1
```

### POST - Crear un nuevo anuncio
```
POST /api_anuncios.php
Content-Type: application/json

{
    "accion": "perdido",
    "nombre_perro": "Max",
    "raza": "Labrador",
    "tamano": "Mediano",
    "color_principal": "Marrón",
    "pelo": "Corto",
    "pelaje": "Sólido",
    "orejas": "Caídas/Colgantes",
    "distrito": "Arequipa",
    "calle": "Av. Principal 123",
    "contexto": "Se perdió en el parque",
    "contacto": "924 233 242",
    "coordenadas": "-16.409047,-71.537451",
    "imagen": "data:image/jpeg;base64,...",
    "plan": "gratis"
}
```

### PUT - Actualizar un anuncio
```
PUT /api_anuncios.php?id=1
Content-Type: application/json

{
    "nombre_perro": "Max Actualizado",
    "contacto": "999 999 999"
}
```

### DELETE - Eliminar un anuncio
```
DELETE /api_anuncios.php?id=1
```

## Pruebas

### Con cURL:
```bash
# Obtener todos los anuncios
curl http://localhost/backend/api_anuncios.php

# Crear un anuncio
curl -X POST http://localhost/backend/api_anuncios.php \
  -H "Content-Type: application/json" \
  -d '{
    "accion": "perdido",
    "raza": "Labrador",
    "tamano": "Mediano",
    "color_principal": "Marrón",
    "pelo": "Corto",
    "pelaje": "Sólido",
    "orejas": "Caídas/Colgantes",
    "distrito": "Arequipa",
    "calle": "Av. Principal",
    "contexto": "Test",
    "contacto": "123456789"
  }'
```

### Con Postman:
1. Importa la colección de endpoints
2. Configura la URL base: `http://localhost/backend`
3. Prueba cada endpoint

## Seguridad

⚠️ **Importante para producción:**
- Cambia las credenciales de la base de datos
- Implementa autenticación (tokens JWT)
- Valida y sanitiza todos los inputs
- Implementa rate limiting
- Usa HTTPS
- Guarda imágenes como archivos, no en base64
- Implementa CORS específico para tu dominio

## Estructura de Archivos

```
backend/
├── config.php          # Configuración de la base de datos
├── api_anuncios.php    # API principal
├── database.sql        # Script de creación de base de datos
└── README.md          # Esta documentación
```

## Solución de Problemas

### Error de conexión a la base de datos:
- Verifica que MySQL esté corriendo
- Verifica las credenciales en `config.php`
- Verifica que la base de datos exista

### Error 500:
- Revisa los logs de error de PHP
- Verifica los permisos de la carpeta
- Verifica que las extensiones PHP estén habilitadas

### CORS errors:
- Verifica que los headers CORS estén configurados en `config.php`
- Verifica que el frontend esté haciendo las peticiones correctamente


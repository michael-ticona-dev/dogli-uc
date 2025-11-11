# 🗄️ Migración a MySQL - Guía Completa

## ✅ Lo que se ha creado

### 1. **Backend PHP con API REST**
- `backend/config.php` - Configuración de la base de datos
- `backend/api_anuncios.php` - API REST para gestionar anuncios
- `backend/database.sql` - Script para crear la base de datos
- `backend/api_config.js` - Configuración del frontend para usar la API

### 2. **Modificaciones en el Frontend**
- `check.html` - Ahora guarda en MySQL en lugar de localStorage
- `script_anuncios.js` - Lee anuncios desde MySQL
- Sistema de fallback: Si MySQL falla, usa localStorage

## 🚀 Instalación Paso a Paso

### Paso 1: Configurar MySQL

1. **Instala XAMPP** (si no lo tienes):
   - Descarga: https://www.apachefriends.org/
   - Instala XAMPP
   - Inicia Apache y MySQL desde el panel de control

2. **Crea la base de datos**:
   ```bash
   # Opción 1: Desde la línea de comandos
   mysql -u root -p < backend/database.sql
   
   # Opción 2: Desde phpMyAdmin
   # 1. Abre http://localhost/phpmyadmin
   # 2. Ve a la pestaña "SQL"
   # 3. Copia y pega el contenido de backend/database.sql
   # 4. Ejecuta el script
   ```

### Paso 2: Configurar la conexión

Edita `backend/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'dogli_db');
define('DB_USER', 'root');          // Tu usuario de MySQL
define('DB_PASS', '');              // Tu contraseña de MySQL
```

### Paso 3: Configurar la URL de la API

Edita `backend/api_config.js`:

```javascript
// Para XAMPP local:
const API_BASE_URL = 'http://localhost/backend/api_anuncios.php';

// Para servidor PHP integrado:
const API_BASE_URL = 'http://localhost:8000/api_anuncios.php';

// Para producción:
const API_BASE_URL = 'https://tudominio.com/backend/api_anuncios.php';
```

### Paso 4: Probar la API

1. **Inicia el servidor**:
   - XAMPP: Asegúrate de que Apache esté corriendo
   - Servidor PHP: `php -S localhost:8000` en la carpeta backend

2. **Prueba la API**:
   ```bash
   # Desde el navegador:
   http://localhost/backend/api_anuncios.php
   
   # Deberías ver:
   {
       "success": true,
       "message": "Anuncios obtenidos exitosamente",
       "data": []
   }
   ```

### Paso 5: Probar el flujo completo

1. Abre `Nuevo_anuncio/paso1.html` en el navegador
2. Llena el formulario completo
3. Al finalizar, el anuncio se guardará en MySQL
4. Ve a `Anuncios/Anuncios.html` para ver los anuncios

## 📊 Estructura de la Base de Datos

### Tabla: `anuncios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT | ID único del anuncio |
| accion | ENUM | 'perdido' o 'encontrado' |
| nombre_perro | VARCHAR(100) | Nombre del perro |
| raza | VARCHAR(100) | Raza del perro |
| tamano | ENUM | 'Pequeño', 'Mediano', 'Grande' |
| color_principal | VARCHAR(50) | Color principal |
| color_secundario | VARCHAR(50) | Color secundario |
| pelo | ENUM | 'Corto', 'Largo', 'Duro/Rizado' |
| pelaje | ENUM | 'Sólido', 'Manchas/Pinto', 'Atigrado/Merlé' |
| orejas | ENUM | Tipo de orejas |
| distrito | VARCHAR(100) | Distrito |
| calle | VARCHAR(255) | Calle o referencia |
| contexto | TEXT | Descripción |
| contacto | VARCHAR(50) | Teléfono de contacto |
| coordenadas | VARCHAR(50) | Coordenadas GPS |
| imagen | LONGTEXT | Imagen en base64 |
| imagen_nombre | VARCHAR(255) | Nombre del archivo |
| plan | ENUM | 'gratis', 'prioritario', 'maxima' |
| fecha_perdido_encontrado | DATE | Fecha del suceso |
| fecha_creacion | TIMESTAMP | Fecha de creación |
| fecha_actualizacion | TIMESTAMP | Fecha de actualización |
| activo | TINYINT(1) | 1 = activo, 0 = eliminado |

## 🔌 Endpoints de la API

### GET - Obtener todos los anuncios
```
GET /api_anuncios.php
```

### GET - Obtener un anuncio por ID
```
GET /api_anuncios.php?id=1
```

### POST - Crear un anuncio
```
POST /api_anuncios.php
Content-Type: application/json

{
    "accion": "perdido",
    "raza": "Labrador",
    "tamano": "Mediano",
    ...
}
```

### PUT - Actualizar un anuncio
```
PUT /api_anuncios.php?id=1
Content-Type: application/json

{
    "nombre_perro": "Max Actualizado"
}
```

### DELETE - Eliminar un anuncio
```
DELETE /api_anuncios.php?id=1
```

## 🔄 Sistema de Fallback

El sistema está diseñado para funcionar de dos maneras:

1. **Primario**: Intenta guardar/leer desde MySQL
2. **Fallback**: Si MySQL falla, usa localStorage

Esto asegura que la aplicación funcione incluso si hay problemas con la conexión a la base de datos.

## 🔒 Seguridad (Importante para Producción)

⚠️ **Antes de desplegar en producción:**

1. **Cambiar credenciales**:
   - Usa un usuario de MySQL dedicado
   - Usa contraseñas seguras
   - No uses 'root' en producción

2. **Implementar autenticación**:
   - Tokens JWT
   - Sesiones PHP
   - Validación de usuarios

3. **Validar inputs**:
   - Sanitizar todos los datos
   - Validar tipos de datos
   - Protección contra SQL injection (ya implementado con PDO)

4. **HTTPS**:
   - Usa certificados SSL
   - Encripta las comunicaciones

5. **CORS**:
   - Configura CORS específico para tu dominio
   - No uses `Access-Control-Allow-Origin: *` en producción

6. **Imágenes**:
   - Guarda imágenes como archivos, no en base64
   - Valida tipos de archivo
   - Limita el tamaño de archivos

## 🐛 Solución de Problemas

### Error: "Error de conexión a la base de datos"
- Verifica que MySQL esté corriendo
- Verifica las credenciales en `config.php`
- Verifica que la base de datos exista

### Error: "CORS policy"
- Verifica que los headers CORS estén configurados
- Verifica que la URL de la API sea correcta
- Usa un servidor web (Apache/Nginx) en lugar del servidor PHP integrado

### Error: "404 Not Found"
- Verifica que la ruta del archivo sea correcta
- Verifica que Apache esté corriendo
- Verifica los permisos de los archivos

### Los anuncios no se guardan
- Abre la consola del navegador (F12)
- Revisa los errores en la pestaña "Console"
- Revisa la pestaña "Network" para ver las peticiones a la API

## 📝 Próximos Pasos

1. **Mejorar el manejo de imágenes**:
   - Guardar imágenes como archivos en el servidor
   - Crear thumbnails
   - Validar tipos y tamaños

2. **Implementar búsqueda**:
   - Búsqueda por distrito
   - Búsqueda por raza
   - Filtros avanzados

3. **Implementar autenticación**:
   - Sistema de usuarios
   - Edición de anuncios propios
   - Eliminación de anuncios

4. **Optimizar rendimiento**:
   - Paginación de anuncios
   - Caché de consultas
   - Índices en la base de datos

## 📚 Recursos

- [Documentación de PDO](https://www.php.net/manual/es/book.pdo.php)
- [Documentación de MySQL](https://dev.mysql.com/doc/)
- [Documentación de Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)


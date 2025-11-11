# 📍 Ubicación de Almacenamiento de Datos

## ⚠️ ACTUALIZACIÓN: Sistema Migrado a MySQL

**El sistema ahora guarda los datos en MySQL en lugar de localStorage.**

### Sistema Actual (MySQL)

- **Ubicación**: Base de datos MySQL
- **Tabla**: `anuncios` en la base de datos `dogli_db`
- **Backend**: API PHP REST (`backend/api_anuncios.php`)
- **Persistencia**: Permanente en el servidor

### Sistema de Fallback (localStorage)

Si la conexión a MySQL falla, el sistema automáticamente usa localStorage como respaldo.

## 📊 Almacenamiento de Datos

### 1. **Datos Temporales (Durante el Formulario)**
- **Ubicación**: `sessionStorage` del navegador
- **Clave**: `temp_anuncio_en_proceso`
- **Duración**: Solo durante la sesión actual
- **Cuándo se guarda**: En cada paso del formulario
- **Qué contiene**: Datos del anuncio en proceso

### 2. **Anuncios Completos (Permanentes)**
- **Ubicación Principal**: Base de datos MySQL (`dogli_db.anuncios`)
- **Ubicación Fallback**: `localStorage` del navegador (si MySQL falla)
- **Clave Fallback**: `anuncios_guardados`
- **Cuándo se guarda**: Al finalizar en `check.html`
- **Qué contiene**: Todos los anuncios publicados

## 🔄 Flujo de Datos Actualizado

```
Paso 1 → sessionStorage (temp_anuncio_en_proceso)
   ↓
Paso 2 → sessionStorage (temp_anuncio_en_proceso) + coordenadas
   ↓
Paso 3 → sessionStorage (temp_anuncio_en_proceso) + imagen
   ↓
Paso 4 → sessionStorage (temp_anuncio_en_proceso) + plan
   ↓
check.html → API PHP → MySQL (anuncios_guardados)
   ↓ (si falla) → localStorage (anuncios_guardados)
   ↓
sessionStorage se limpia
   ↓
Anuncios.html → API PHP → MySQL (anuncios_guardados)
   ↓ (si falla) → localStorage (anuncios_guardados)
```

## 🗄️ Base de Datos MySQL

### Estructura de la Tabla `anuncios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INT | ID único del anuncio (auto-increment) |
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

## 📁 Archivos del Backend

- **backend/config.php**: Configuración de la base de datos
- **backend/api_anuncios.php**: API REST para gestionar anuncios
- **backend/database.sql**: Script para crear la base de datos
- **backend/api_config.js**: Configuración del frontend para usar la API

## 🔍 Cómo Ver los Datos

### Ver datos en MySQL:

1. Abre phpMyAdmin: `http://localhost/phpmyadmin`
2. Selecciona la base de datos `dogli_db`
3. Haz clic en la tabla `anuncios`
4. Ve a la pestaña "Examinar" para ver los datos

### Ver datos en localStorage (fallback):

1. Abre las **Herramientas de Desarrollador** (F12)
2. Ve a la pestaña **Application** (o **Aplicación**)
3. Expande **Local Storage**
4. Busca la clave: `anuncios_guardados`

## 🚀 Configuración

### 1. Configurar MySQL

Edita `backend/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'dogli_db');
define('DB_USER', 'tu_usuario');
define('DB_PASS', 'tu_contraseña');
```

### 2. Configurar URL de la API

Edita `backend/api_config.js`:

```javascript
const API_BASE_URL = 'http://localhost/backend/api_anuncios.php';
```

## ✅ Ventajas del Sistema MySQL

- ✅ Los datos se guardan en el servidor
- ✅ Los datos persisten permanentemente
- ✅ Múltiples usuarios pueden ver los mismos anuncios
- ✅ Los datos se respaldan automáticamente
- ✅ Escalable para muchos anuncios
- ✅ Búsquedas y filtros eficientes

## 📝 Notas

- El sistema tiene **fallback automático** a localStorage si MySQL no está disponible
- Los datos temporales siguen usando sessionStorage durante el formulario
- Para producción, asegúrate de configurar las credenciales de MySQL correctamente
- Ver `MIGRACION_MYSQL.md` para la guía completa de instalación


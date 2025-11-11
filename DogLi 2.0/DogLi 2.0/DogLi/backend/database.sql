-- ============================================================
-- BASE DE DATOS PARA DOGLI - ANUNCIOS DE PERROS
-- ============================================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS dogli_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE dogli_db;

-- Tabla de anuncios
CREATE TABLE IF NOT EXISTS anuncios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    accion ENUM('perdido', 'encontrado') NOT NULL DEFAULT 'perdido',
    nombre_perro VARCHAR(100) DEFAULT NULL,
    raza VARCHAR(100) NOT NULL,
    tamano ENUM('Pequeño', 'Mediano', 'Grande') NOT NULL,
    color_principal VARCHAR(50) NOT NULL,
    color_secundario VARCHAR(50) DEFAULT NULL,
    pelo ENUM('Corto', 'Largo', 'Duro/Rizado') NOT NULL,
    pelaje ENUM('Sólido', 'Manchas/Pinto', 'Atigrado/Merlé') NOT NULL,
    orejas ENUM('Paradas/Erectas', 'Caídas/Colgantes', 'Semi-erectas') NOT NULL,
    distrito VARCHAR(100) NOT NULL,
    calle VARCHAR(255) NOT NULL,
    contexto TEXT NOT NULL,
    contacto VARCHAR(50) NOT NULL,
    coordenadas VARCHAR(50) DEFAULT NULL COMMENT 'Formato: lat,lng',
    imagen LONGTEXT DEFAULT NULL COMMENT 'Imagen en base64',
    imagen_nombre VARCHAR(255) DEFAULT NULL,
    plan ENUM('gratis', 'prioritario', 'maxima') DEFAULT 'gratis',
    fecha_perdido_encontrado DATE NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1,
    INDEX idx_accion (accion),
    INDEX idx_distrito (distrito),
    INDEX idx_fecha_creacion (fecha_creacion),
    INDEX idx_activo (activo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla para almacenar imágenes por separado (opcional, más eficiente)
-- Si decides guardar imágenes como archivos en lugar de base64
CREATE TABLE IF NOT EXISTS imagenes_anuncios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anuncio_id INT NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(500) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (anuncio_id) REFERENCES anuncios(id) ON DELETE CASCADE,
    INDEX idx_anuncio_id (anuncio_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar datos de ejemplo (opcional)
-- INSERT INTO anuncios (
--     accion, nombre_perro, raza, tamano, color_principal, color_secundario,
--     pelo, pelaje, orejas, distrito, calle, contexto, contacto, plan, fecha_perdido_encontrado
-- ) VALUES (
--     'perdido', 'Max', 'Labrador', 'Mediano', 'Marrón', 'Blanco',
--     'Corto', 'Sólido', 'Caídas/Colgantes', 'Arequipa', 'Av. Principal 123',
--     'Se perdió en el parque cerca del centro', '924 233 242', 'gratis', CURDATE()
-- );


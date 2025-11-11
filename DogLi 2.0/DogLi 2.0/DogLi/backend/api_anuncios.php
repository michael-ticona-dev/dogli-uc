<?php
/**
 * API para gestionar anuncios de perros
 * Endpoints:
 * - GET /api_anuncios.php - Obtener todos los anuncios
 * - GET /api_anuncios.php?id=1 - Obtener un anuncio por ID
 * - POST /api_anuncios.php - Crear un nuevo anuncio
 * - PUT /api_anuncios.php?id=1 - Actualizar un anuncio
 * - DELETE /api_anuncios.php?id=1 - Eliminar un anuncio
 */

require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pdo = getDBConnection();

// Obtener ID de la URL si existe
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    case 'GET':
        // Obtener anuncios
        if ($id) {
            // Obtener un anuncio específico
            getAnuncio($pdo, $id);
        } else {
            // Obtener todos los anuncios
            getAnuncios($pdo);
        }
        break;
        
    case 'POST':
        // Crear un nuevo anuncio
        createAnuncio($pdo);
        break;
        
    case 'PUT':
        // Actualizar un anuncio
        if (!$id) {
            sendJSONResponse(false, 'ID de anuncio requerido', null, 400);
        }
        updateAnuncio($pdo, $id);
        break;
        
    case 'DELETE':
        // Eliminar un anuncio (soft delete)
        if (!$id) {
            sendJSONResponse(false, 'ID de anuncio requerido', null, 400);
        }
        deleteAnuncio($pdo, $id);
        break;
        
    default:
        sendJSONResponse(false, 'Método no permitido', null, 405);
        break;
}

/**
 * Obtener todos los anuncios activos
 */
function getAnuncios($pdo) {
    try {
        // Permitir ver todos los anuncios (incluyendo inactivos) si se pasa el parámetro all=1
        $verTodos = isset($_GET['all']) && $_GET['all'] == '1';
        
        if ($verTodos) {
            // Ver todos los anuncios (para administración)
            $stmt = $pdo->prepare("
                SELECT 
                    id,
                    accion,
                    nombre_perro,
                    raza,
                    tamano,
                    color_principal,
                    color_secundario,
                    pelo,
                    pelaje,
                    orejas,
                    distrito,
                    calle,
                    contexto,
                    contacto,
                    coordenadas,
                    imagen,
                    imagen_nombre,
                    plan,
                    activo,
                    DATE_FORMAT(fecha_perdido_encontrado, '%d/%m/%Y') as fecha_perdido_encontrado,
                    DATE_FORMAT(fecha_creacion, '%d/%m/%Y') as fecha_creacion,
                    fecha_actualizacion
                FROM anuncios 
                ORDER BY fecha_creacion DESC
            ");
        } else {
            // Ver solo anuncios activos (para el sitio web)
            $stmt = $pdo->prepare("
                SELECT 
                    id,
                    accion,
                    nombre_perro,
                    raza,
                    tamano,
                    color_principal,
                    color_secundario,
                    pelo,
                    pelaje,
                    orejas,
                    distrito,
                    calle,
                    contexto,
                    contacto,
                    coordenadas,
                    imagen,
                    imagen_nombre,
                    plan,
                    DATE_FORMAT(fecha_perdido_encontrado, '%d/%m/%Y') as fecha_perdido_encontrado,
                    DATE_FORMAT(fecha_creacion, '%d/%m/%Y') as fecha_creacion,
                    fecha_actualizacion
                FROM anuncios 
                WHERE activo = 1 
                ORDER BY fecha_creacion DESC
            ");
        }
        
        $stmt->execute();
        $anuncios = $stmt->fetchAll();
        
        sendJSONResponse(true, 'Anuncios obtenidos exitosamente', $anuncios);
    } catch (PDOException $e) {
        error_log("Error al obtener anuncios: " . $e->getMessage());
        sendJSONResponse(false, 'Error al obtener anuncios', null, 500);
    }
}

/**
 * Obtener un anuncio por ID
 */
function getAnuncio($pdo, $id) {
    try {
        $stmt = $pdo->prepare("
            SELECT 
                id,
                accion,
                nombre_perro,
                raza,
                tamano,
                color_principal,
                color_secundario,
                pelo,
                pelaje,
                orejas,
                distrito,
                calle,
                contexto,
                contacto,
                coordenadas,
                imagen,
                imagen_nombre,
                plan,
                DATE_FORMAT(fecha_perdido_encontrado, '%d/%m/%Y') as fecha_perdido_encontrado,
                DATE_FORMAT(fecha_creacion, '%d/%m/%Y') as fecha_creacion,
                fecha_actualizacion
            FROM anuncios 
            WHERE id = ? AND activo = 1
        ");
        $stmt->execute([$id]);
        $anuncio = $stmt->fetch();
        
        if (!$anuncio) {
            sendJSONResponse(false, 'Anuncio no encontrado', null, 404);
        }
        
        sendJSONResponse(true, 'Anuncio obtenido exitosamente', $anuncio);
    } catch (PDOException $e) {
        error_log("Error al obtener anuncio: " . $e->getMessage());
        sendJSONResponse(false, 'Error al obtener anuncio', null, 500);
    }
}

/**
 * Crear un nuevo anuncio
 */
function createAnuncio($pdo) {
    try {
        // Obtener datos del POST
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Validar datos requeridos
        $required = ['accion', 'raza', 'tamano', 'color_principal', 'pelo', 'pelaje', 'orejas', 'distrito', 'calle', 'contexto', 'contacto'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                sendJSONResponse(false, "El campo '$field' es requerido", null, 400);
            }
        }
        
        // Validar y formatear fecha
        $fechaPerdidoEncontrado = isset($data['fecha_perdido_encontrado']) 
            ? $data['fecha_perdido_encontrado'] 
            : date('Y-m-d');
        
        // Validar tamaño de imagen
        if (isset($data['imagen']) && strlen($data['imagen']) > MAX_IMAGE_SIZE) {
            sendJSONResponse(false, 'La imagen es demasiado grande. Tamaño máximo: ' . (MAX_IMAGE_SIZE / 1024 / 1024) . 'MB', null, 400);
        }
        
        // Insertar anuncio
        $stmt = $pdo->prepare("
            INSERT INTO anuncios (
                accion, nombre_perro, raza, tamano, color_principal, color_secundario,
                pelo, pelaje, orejas, distrito, calle, contexto, contacto,
                coordenadas, imagen, imagen_nombre, plan, fecha_perdido_encontrado
            ) VALUES (
                :accion, :nombre_perro, :raza, :tamano, :color_principal, :color_secundario,
                :pelo, :pelaje, :orejas, :distrito, :calle, :contexto, :contacto,
                :coordenadas, :imagen, :imagen_nombre, :plan, :fecha_perdido_encontrado
            )
        ");
        
        $stmt->execute([
            ':accion' => $data['accion'],
            ':nombre_perro' => $data['nombre_perro'] ?? null,
            ':raza' => $data['raza'],
            ':tamano' => $data['tamano'],
            ':color_principal' => $data['color_principal'],
            ':color_secundario' => $data['color_secundario'] ?? null,
            ':pelo' => $data['pelo'],
            ':pelaje' => $data['pelaje'],
            ':orejas' => $data['orejas'],
            ':distrito' => $data['distrito'],
            ':calle' => $data['calle'],
            ':contexto' => $data['contexto'],
            ':contacto' => $data['contacto'],
            ':coordenadas' => $data['coordenadas'] ?? null,
            ':imagen' => $data['imagen'] ?? null,
            ':imagen_nombre' => $data['imagen_nombre'] ?? null,
            ':plan' => $data['plan'] ?? 'gratis',
            ':fecha_perdido_encontrado' => $fechaPerdidoEncontrado
        ]);
        
        $id = $pdo->lastInsertId();
        
        sendJSONResponse(true, 'Anuncio creado exitosamente', ['id' => $id], 201);
    } catch (PDOException $e) {
        error_log("Error al crear anuncio: " . $e->getMessage());
        sendJSONResponse(false, 'Error al crear anuncio: ' . $e->getMessage(), null, 500);
    }
}

/**
 * Actualizar un anuncio
 */
function updateAnuncio($pdo, $id) {
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Construir query dinámicamente
        $fields = [];
        $values = [':id' => $id];
        
        $allowedFields = [
            'accion', 'nombre_perro', 'raza', 'tamano', 'color_principal', 'color_secundario',
            'pelo', 'pelaje', 'orejas', 'distrito', 'calle', 'contexto', 'contacto',
            'coordenadas', 'imagen', 'imagen_nombre', 'plan', 'fecha_perdido_encontrado', 'activo'
        ];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = :$field";
                $values[":$field"] = $data[$field];
            }
        }
        
        if (empty($fields)) {
            sendJSONResponse(false, 'No hay campos para actualizar', null, 400);
        }
        
        $sql = "UPDATE anuncios SET " . implode(', ', $fields) . " WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);
        
        if ($stmt->rowCount() === 0) {
            sendJSONResponse(false, 'Anuncio no encontrado', null, 404);
        }
        
        sendJSONResponse(true, 'Anuncio actualizado exitosamente');
    } catch (PDOException $e) {
        error_log("Error al actualizar anuncio: " . $e->getMessage());
        sendJSONResponse(false, 'Error al actualizar anuncio', null, 500);
    }
}

/**
 * Eliminar un anuncio (soft delete)
 */
function deleteAnuncio($pdo, $id) {
    try {
        $stmt = $pdo->prepare("UPDATE anuncios SET activo = 0 WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() === 0) {
            sendJSONResponse(false, 'Anuncio no encontrado', null, 404);
        }
        
        sendJSONResponse(true, 'Anuncio eliminado exitosamente');
    } catch (PDOException $e) {
        error_log("Error al eliminar anuncio: " . $e->getMessage());
        sendJSONResponse(false, 'Error al eliminar anuncio', null, 500);
    }
}

?>


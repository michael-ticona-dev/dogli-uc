<?php
/**
 * Configuración de la base de datos
 * IMPORTANTE: Modifica estos valores con tus credenciales de MySQL
 */

// Configuración de la base de datos
define('DB_HOST', 'localhost');        // Host de la base de datos
define('DB_NAME', 'dogli_db');         // Nombre de la base de datos
define('DB_USER', 'root');             // Usuario de MySQL
define('DB_PASS', '');                 // Contraseña de MySQL (vacía por defecto en XAMPP)
define('DB_CHARSET', 'utf8mb4');       // Codificación

// Configuración de la aplicación
define('APP_TIMEZONE', 'America/Lima'); // Zona horaria (Arequipa, Perú)
define('MAX_IMAGE_SIZE', 5 * 1024 * 1024); // Tamaño máximo de imagen: 5MB

// Configuración de CORS (permite peticiones desde el frontend)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configurar zona horaria
date_default_timezone_set(APP_TIMEZONE);

/**
 * Función para conectar a la base de datos
 */
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // En producción, no mostrar el error completo por seguridad
        error_log("Error de conexión a la base de datos: " . $e->getMessage());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error de conexión a la base de datos'
        ]);
        exit();
    }
}

/**
 * Función para enviar respuestas JSON
 */
function sendJSONResponse($success, $message = '', $data = null, $statusCode = 200) {
    http_response_code($statusCode);
    $response = [
        'success' => $success,
        'message' => $message
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eliminar Anuncio - DogLi</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        body {
            background-color: #f8f9fa;
            padding: 50px 20px;
        }
        .container {
            max-width: 600px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-header bg-danger text-white">
                <h4>Eliminar Anuncio de Romario</h4>
            </div>
            <div class="card-body">
                <p>Esta página te ayuda a eliminar el anuncio de "Romario".</p>
                
                <h5>Opción 1: Desde phpMyAdmin (Recomendado)</h5>
                <ol>
                    <li>Abre phpMyAdmin: <a href="http://localhost/phpmyadmin" target="_blank">http://localhost/phpmyadmin</a></li>
                    <li>Selecciona la base de datos <code>dogli_db</code></li>
                    <li>Haz clic en la tabla <code>anuncios</code></li>
                    <li>Busca el anuncio con nombre "Romario"</li>
                    <li>Haz clic en el icono de eliminar (🗑️) o marca la casilla y haz clic en "Eliminar"</li>
                </ol>

                <h5>Opción 2: Desde SQL</h5>
                <p>Ejecuta este comando en phpMyAdmin (pestaña SQL):</p>
                <pre class="bg-light p-3"><code>-- Eliminar por nombre
UPDATE anuncios SET activo = 0 WHERE nombre_perro = 'Romario';

-- O eliminar permanentemente (¡CUIDADO!)
DELETE FROM anuncios WHERE nombre_perro = 'Romario';</code></pre>

                <h5>Opción 3: Desde la página de administración</h5>
                <p><a href="admin_anuncios.html" class="btn btn-primary">Ir a Administración de Anuncios</a></p>

                <h5>Opción 4: Buscar por ID</h5>
                <p>Si conoces el ID del anuncio, puedes eliminarlo directamente:</p>
                <form method="GET" action="api_anuncios.php" class="mt-3">
                    <div class="form-group">
                        <label>ID del Anuncio:</label>
                        <input type="number" name="id" class="form-control" placeholder="Ej: 1" required>
                    </div>
                    <p class="text-muted small">
                        Nota: Para eliminar usando la API, necesitas usar una herramienta como Postman o curl:
                        <code>DELETE http://localhost/backend/api_anuncios.php?id=1</code>
                    </p>
                </form>
            </div>
        </div>
    </div>
</body>
</html>


// ============================================================
// CONFIGURACIÓN DE LA API
// ============================================================

// URL base de la API (cambia esto por la URL de tu servidor)
const API_BASE_URL = 'http://localhost/backend/api_anuncios.php';
// Si usas el servidor PHP integrado: 'http://localhost:8000/api_anuncios.php'
// Si está en producción: 'https://tudominio.com/backend/api_anuncios.php'

// Función para hacer peticiones a la API
async function apiRequest(endpoint = '', method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }
        
        const url = endpoint ? `${API_BASE_URL}?${endpoint}` : API_BASE_URL;
        const response = await fetch(url, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Error en la petición');
        }
        
        return result;
    } catch (error) {
        console.error('Error en la petición API:', error);
        throw error;
    }
}

// Función para obtener todos los anuncios
async function obtenerAnunciosAPI() {
    const response = await apiRequest('', 'GET');
    return response.data || [];
}

// Función para obtener un anuncio por ID
async function obtenerAnuncioAPI(id) {
    try {
        const response = await apiRequest(`id=${id}`, 'GET');
        return response.data || null;
    } catch (error) {
        console.error('Error al obtener anuncio:', error);
        return null;
    }
}

// Función para guardar un anuncio
async function guardarAnuncioAPI(anuncio) {
    try {
        // Preparar datos para la API
        const datosAPI = {
            accion: anuncio.accion || 'perdido',
            nombre_perro: anuncio.nombre_perro || null,
            raza: anuncio.raza || '',
            tamano: anuncio.tamano || '',
            color_principal: anuncio.color_principal || '',
            color_secundario: anuncio.color_secundario || null,
            pelo: anuncio.pelo || '',
            pelaje: anuncio.pelaje || '',
            orejas: anuncio.orejas || '',
            distrito: anuncio.distrito || '',
            calle: anuncio.calle || '',
            contexto: anuncio.contexto || '',
            contacto: anuncio.contacto || '',
            coordenadas: anuncio.coordenadas || null,
            imagen: anuncio.imagen || null,
            imagen_nombre: anuncio.imagenNombre || null,
            plan: anuncio.plan || 'gratis',
            fecha_perdido_encontrado: anuncio.fechaPerdidoEncontrado || new Date().toISOString().split('T')[0]
        };
        
        const response = await apiRequest('', 'POST', datosAPI);
        return response.data.id || null;
    } catch (error) {
        console.error('Error al guardar anuncio:', error);
        throw error;
    }
}

// Función para actualizar un anuncio
async function actualizarAnuncioAPI(id, datos) {
    try {
        const response = await apiRequest(`id=${id}`, 'PUT', datos);
        return response.success;
    } catch (error) {
        console.error('Error al actualizar anuncio:', error);
        throw error;
    }
}

// Función para eliminar un anuncio
async function eliminarAnuncioAPI(id) {
    try {
        const response = await apiRequest(`id=${id}`, 'DELETE');
        return response.success;
    } catch (error) {
        console.error('Error al eliminar anuncio:', error);
        throw error;
    }
}


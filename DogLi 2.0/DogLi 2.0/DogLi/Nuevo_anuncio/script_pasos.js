// ============================================================
// SISTEMA DE GESTIÓN DE DATOS DE ANUNCIOS
// ============================================================

// Clave para almacenar datos temporales del anuncio en proceso
const TEMP_ANUNCIO_KEY = 'temp_anuncio_en_proceso';
const ANUNCIOS_KEY = 'anuncios_guardados';

// Función para obtener o crear ID de sesión de anuncio
function getAnuncioSessionId() {
    let sessionId = sessionStorage.getItem('anuncio_session_id');
    if (!sessionId) {
        sessionId = 'anuncio_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('anuncio_session_id', sessionId);
    }
    return sessionId;
}

// Función para guardar datos temporales del anuncio
function guardarDatosTemporales(datos) {
    const sessionId = getAnuncioSessionId();
    const datosActuales = obtenerDatosTemporales();
    const datosCombinados = { ...datosActuales, ...datos };
    sessionStorage.setItem(TEMP_ANUNCIO_KEY, JSON.stringify(datosCombinados));
}

// Función para obtener datos temporales del anuncio
function obtenerDatosTemporales() {
    const datos = sessionStorage.getItem(TEMP_ANUNCIO_KEY);
    return datos ? JSON.parse(datos) : {};
}

// Función para limpiar datos temporales
function limpiarDatosTemporales() {
    sessionStorage.removeItem(TEMP_ANUNCIO_KEY);
    sessionStorage.removeItem('anuncio_session_id');
}

// Función para guardar un anuncio completo
function guardarAnuncio(anuncio) {
    let anuncios = obtenerAnuncios();
    // Agregar ID único y fecha de creación
    anuncio.id = 'anuncio_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    anuncio.fechaCreacion = new Date().toISOString();
    anuncios.push(anuncio);
    localStorage.setItem(ANUNCIOS_KEY, JSON.stringify(anuncios));
    limpiarDatosTemporales();
    return anuncio.id;
}

// Función para obtener todos los anuncios
function obtenerAnuncios() {
    const anuncios = localStorage.getItem(ANUNCIOS_KEY);
    return anuncios ? JSON.parse(anuncios) : [];
}

// Función para convertir imagen a base64
function convertirImagenABase64(file, callback) {
    if (!file) {
        callback(null);
        return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Data de Opciones
    // ----------------------------------------------------

    const DISTRITOS_AREQUIPA = [
        "Alto Selva Alegre", 
        "Arequipa", 
        "Cayma", 
        "Cerro Colorado", 
        "Characato", 
        "Chiguata", 
        "Jacobo Hunter", 
        "La Joya", 
        "Mariano Melgar", 
        "Miraflores", 
        "Mollebaya", 
        "Paucarpata", 
        "Pocsi", 
        "Polobaya", 
        "Quequeña", 
        "Sabandía", 
        "Sachaca", 
        "San Juan de Siguas", 
        "San Juan de Tarucani", 
        "Santa Isabel de Siguas", 
        "Santa Rita de Siguas", 
        "Socabaya", 
        "Tiabaya", 
        "Uchumayo", 
        "Vitor", 
        "Yanahuara", 
        "Yarabamba", 
        "Yura"
    ].sort();

    const COLORES_PERRO = [
        "Negro", 
        "Blanco", 
        "Marrón (Café)", 
        "Gris", 
        "Canela (Rojo)", 
        "Crema (Beige)", 
        "Dorado",
        "Tricolor (3 colores)",
        "Otros/Inusual"
    ].sort();

    // ----------------------------------------------------
    // 2. Lógica para Poblar Selectores
    // ----------------------------------------------------

    const poblarSelector = (selectId, dataArray, placeholderText, allowEmpty = false) => {
        const select = document.getElementById(selectId);
        if (!select) return;

        select.innerHTML = ''; 

        // Opción inicial (placeholder)
        let defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = placeholderText;
        defaultOption.disabled = true;
        
        // La opción inicial es seleccionada por defecto si no se permite vacío
        if (!allowEmpty) { 
             defaultOption.selected = true; 
        } else {
             // Si se permite vacío (como el color secundario), lo hacemos seleccionable
             defaultOption.selected = true; 
             defaultOption.disabled = false;
        }

        select.appendChild(defaultOption);

        // Llenar el Select con datos
        dataArray.forEach(item => {
            let option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    };

    // Poblar Distritos y Colores (solo si estamos en paso1)
    if (document.getElementById('distrito')) {
        poblarSelector('distrito', DISTRITOS_AREQUIPA, "Seleccione un Distrito");
    }
    if (document.getElementById('color-principal')) {
        poblarSelector('color-principal', COLORES_PERRO, "Seleccione el Color Principal");
    }
    if (document.getElementById('color-secundario')) {
        poblarSelector('color-secundario', COLORES_PERRO, "No aplica o no visible", true);
    }

    // ----------------------------------------------------
    // 3. Lógica Condicional del Formulario (Mostrar/Ocultar Nombre)
    // ----------------------------------------------------

    const urlParams = new URLSearchParams(window.location.search);
    const accion = urlParams.get('accion') || 'perdido'; // Por defecto 'perdido'
    
    const campoNombreDiv = document.getElementById('campo-nombre-perro');
    const inputNombre = document.getElementById('nombre-perro');

    if (accion === 'perdido') {
        // Muestra el campo extra y lo hace requerido
        if (campoNombreDiv) {
            campoNombreDiv.style.display = 'block';
        }
        if (inputNombre) {
            inputNombre.setAttribute('required', 'required'); 
        }
    } else {
        // Encontrado o sin parámetro: asegura que esté oculto y no sea requerido
        if (campoNombreDiv) {
            campoNombreDiv.style.display = 'none';
        }
        if (inputNombre) {
            inputNombre.removeAttribute('required');
        }
    }

    // Guardar la acción en los datos temporales
    guardarDatosTemporales({ accion: accion });

    // ----------------------------------------------------
    // 4. Manejo del Paso 1 - Guardar datos y continuar
    // ----------------------------------------------------
    const btnContinuarPaso1 = document.getElementById('btn-continuar-paso1');
    const form = document.getElementById('anuncio-form');
    
    if (btnContinuarPaso1 && form) {
        btnContinuarPaso1.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Guardar datos del paso 1
            guardarDatosTemporales({
                nombre_perro: data.nombre_perro || '',
                raza: data.raza,
                tamano: data.tamano,
                color_principal: data.color_principal,
                color_secundario: data.color_secundario || '',
                pelo: data.pelo,
                pelaje: data.pelaje,
                orejas: data.orejas,
                distrito: data.distrito,
                calle: data.calle,
                contexto: data.contexto,
                contacto: data.contacto
            });
            
            // Redirigir al siguiente paso
            window.location.href = 'paso2.html?accion=' + accion;
        });
    }

    // ----------------------------------------------------
    // 5. Manejo del Paso 2 - Guardar coordenadas
    // ----------------------------------------------------
    const latlngInput = document.getElementById('latlng');
    if (latlngInput && window.location.pathname.includes('paso2.html')) {
        // Guardar coordenadas cuando cambien
        const observer = new MutationObserver(function(mutations) {
            const latlng = latlngInput.value;
            if (latlng) {
                guardarDatosTemporales({ coordenadas: latlng });
            }
        });
        observer.observe(latlngInput, { attributes: true, attributeFilter: ['value'] });
        
        // También escuchar cambios directos
        latlngInput.addEventListener('input', function() {
            if (this.value) {
                guardarDatosTemporales({ coordenadas: this.value });
            }
        });
    }

    // ----------------------------------------------------
    // 6. Manejo del Paso 3 - Guardar foto
    // ----------------------------------------------------
    const imageInput = document.getElementById('image');
    if (imageInput && window.location.pathname.includes('paso3.html')) {
        imageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                convertirImagenABase64(this.files[0], function(base64) {
                    if (base64) {
                        guardarDatosTemporales({ imagen: base64, imagenNombre: imageInput.files[0].name });
                    }
                });
            }
        });
    }

    // ----------------------------------------------------
    // 7. Manejo del Paso 4 - Guardar plan seleccionado
    // ----------------------------------------------------
    if (window.location.pathname.includes('paso4.html')) {
        // Guardar el plan cuando se hace clic en los botones
        const planLinks = document.querySelectorAll('a.btn-plan, a[href*="check.html"]');
        planLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Obtener el plan del parámetro data-plan o de la URL
                let plan = this.getAttribute('data-plan');
                if (!plan) {
                    const href = this.getAttribute('href');
                    if (href && href.includes('plan=')) {
                        const match = href.match(/plan=([^&]+)/);
                        if (match) {
                            plan = match[1];
                        }
                    }
                }
                // Si aún no hay plan, determinar por el texto
                if (!plan) {
                    const buttonText = this.textContent.trim();
                    if (buttonText.includes('Opción 2') || buttonText.includes('prioritario')) {
                        plan = 'prioritario';
                    } else if (buttonText.includes('Opción 3') || buttonText.includes('máxima')) {
                        plan = 'maxima';
                    } else {
                        plan = 'gratis';
                    }
                }
                if (plan) {
                    guardarDatosTemporales({ plan: plan });
                }
            });
        });
    }

    // ----------------------------------------------------
    // 8. Manejo de check.html - Capturar plan de URL si existe
    // ----------------------------------------------------
    if (window.location.pathname.includes('check.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const plan = urlParams.get('plan');
        if (plan) {
            guardarDatosTemporales({ plan: plan });
        }
    }
});
// ============================================================
// SISTEMA DE CARGA Y MUESTRA DE ANUNCIOS
// ============================================================

// Función para obtener todos los anuncios guardados (desde MySQL)
async function obtenerAnunciosGuardados() {
    // Intentar obtener desde la API (MySQL)
    if (typeof obtenerAnunciosAPI === 'function') {
        try {
            const anuncios = await obtenerAnunciosAPI();
            // Si la API responde correctamente (incluso si está vacío), usar esos datos
            return Array.isArray(anuncios) ? anuncios : [];
        } catch (error) {
            console.warn('Error al obtener anuncios de la API, usando localStorage:', error);
            // Continuar al fallback
        }
    } else {
        console.warn('API no disponible, usando localStorage');
    }
    
    // Fallback: obtener de localStorage si la API falla o no está disponible
    try {
        const anuncios = localStorage.getItem('anuncios_guardados');
        return anuncios ? JSON.parse(anuncios) : [];
    } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return [];
    }
}

// Función para formatear el tamaño para mostrar
function formatearTamano(tamano) {
    if (!tamano) return '';
    const tamanoLower = tamano.toLowerCase();
    if (tamanoLower.includes('pequeño') || tamanoLower.includes('pequeña')) return 'pequeña';
    if (tamanoLower.includes('mediano') || tamanoLower.includes('media')) return 'media';
    if (tamanoLower.includes('grande')) return 'grande';
    return tamano;
}

// Función para obtener el texto del género
function obtenerGenero(accion, nombre) {
    // Por ahora, asumimos que si tiene nombre es probablemente conocido
    // Esto podría mejorarse si se agrega un campo de género en el formulario
    return 'perro'; // Por defecto
}

// Función para obtener colores como string
function obtenerColoresString(colorPrincipal, colorSecundario) {
    const colores = [];
    if (colorPrincipal) colores.push(colorPrincipal.toLowerCase());
    if (colorSecundario && colorSecundario !== 'No aplica o no visible' && colorSecundario !== '') {
        colores.push(colorSecundario.toLowerCase());
    }
    return colores.join(', ');
}

// Función para formatear fecha
function formatearFecha(fechaISO) {
    if (!fechaISO) return new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    try {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
        return new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
}

// Función para crear el HTML de un anuncio
function crearHTMLAnuncio(anuncio) {
    const nombre = anuncio.nombre_perro || 'Sin nombre';
    const accion = anuncio.accion === 'perdido' ? 'perdido' : 'encontrado';
    const statusClass = accion === 'perdido' ? 'status-lost' : 'status-found';
    const statusText = accion === 'perdido' ? 'perdido' : 'encontrado';
    
    // Determinar género y terminación
    const generoText = 'perro';
    const terminacion = accion === 'perdido' ? 'o' : 'o';
    
    // Compatibilidad con formato de API (fecha_perdido_encontrado) y localStorage (fechaPerdidoEncontrado)
    const fechaPerdidoEncontrado = anuncio.fecha_perdido_encontrado || anuncio.fechaPerdidoEncontrado || formatearFecha(anuncio.fecha_creacion || anuncio.fechaCreacion);
    const fechaPublicacion = formatearFecha(anuncio.fecha_creacion || anuncio.fechaCreacion);
    
    // Compatibilidad con formato de API (imagen_nombre) y localStorage (imagenNombre)
    const imagenSrc = anuncio.imagen || '../IMG/logo_DogLi.png';
    const imagenAlt = `Foto de perro ${statusText} - ${nombre}`;
    
    const colores = obtenerColoresString(anuncio.color_principal, anuncio.color_secundario);
    const lugar = `${anuncio.distrito || ''}${anuncio.calle ? ', ' + anuncio.calle : ''}`.trim();
    
    // Determinar si mostrar raza
    const razaHTML = anuncio.raza ? `<p><span>Raza:</span> ${anuncio.raza}</p>` : '';
    
    // Escapar el nombre para evitar problemas con comillas en HTML
    const nombreEscapado = nombre.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    
    return `
    <div class="anuncio-card-modern" data-anuncio-id="${anuncio.id}">
        <div class="row">
            <div class="col-6 col-md-auto mb-1 order1">
                <img class="item-view" data-id-item="${anuncio.id}" src="${imagenSrc}" alt="${imagenAlt}" title="${imagenAlt}" width="160" height="160" style="object-fit: cover;">
            </div>
            <div class="col-12 col-md order3 anuncio-details">
                <p class="anuncio-status">
                    "${nombre}" <strong>${generoText}</strong> <span class="${statusClass}"><strong>${statusText}${terminacion}</strong></span> el ${fechaPerdidoEncontrado}
                </p>
                <div class="anuncio-attributes">
                    <p><span>Tamaño:</span> ${formatearTamano(anuncio.tamano)}</p>
                    ${razaHTML}
                    ${colores ? `<p><span>Colores:</span> ${colores}</p>` : ''}
                    ${anuncio.pelo ? `<p><span>Pelo:</span> ${anuncio.pelo.toLowerCase()}</p>` : ''}
                    ${anuncio.pelaje ? `<p><span>Pelaje:</span> ${anuncio.pelaje.toLowerCase()}</p>` : ''}
                    ${anuncio.orejas ? `<p><span>Orejas:</span> ${anuncio.orejas.toLowerCase()}</p>` : ''}
                    ${lugar ? `<p><span>Lugar:</span> ${lugar}</p>` : ''}
                </div>
                <div class="anuncio-tags">
                    <p><span>Contacto</span> <span class="tag-positive">${anuncio.contacto || 'No disponible'}</span></p>
                </div>
            </div>
            <div class="col-6 col-md-3 text-right btn-edit order2">
                <small>${fechaPublicacion}</small><br>
                <button type="button" class="btn-eliminar-anuncio btn btn-danger btn-sm mt-2" 
                        data-anuncio-id="${anuncio.id}" 
                        data-anuncio-nombre="${nombreEscapado}" 
                        title="Eliminar anuncio">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </div>
        </div>
    </div>
    `;
}

// Función para cargar y mostrar anuncios
async function cargarAnuncios() {
    const contenedorAnuncios = document.getElementById('anuncios-dinamicos');
    const contenedorAnunciosEstaticos = document.querySelector('.item-list tbody');
    
    if (!contenedorAnuncios && !contenedorAnunciosEstaticos) {
        console.error('No se encontró contenedor para anuncios');
        return;
    }
    
    // Mostrar indicador de carga
    if (contenedorAnuncios) {
        contenedorAnuncios.innerHTML = '<p class="text-center">Cargando anuncios...</p>';
    }
    
    try {
        // Obtener anuncios desde la API (MySQL)
        const anuncios = await obtenerAnunciosGuardados();
        
        if (anuncios && anuncios.length > 0) {
            let htmlAnuncios = '';
            
            // Los anuncios ya vienen ordenados desde la API, pero por si acaso:
            anuncios.sort((a, b) => {
                const fechaA = new Date(a.fecha_creacion || a.fechaCreacion || 0);
                const fechaB = new Date(b.fecha_creacion || b.fechaCreacion || 0);
                return fechaB - fechaA;
            });
            
            anuncios.forEach(anuncio => {
                htmlAnuncios += crearHTMLAnuncio(anuncio);
            });
            
            if (contenedorAnuncios) {
                contenedorAnuncios.innerHTML = htmlAnuncios;
            } else if (contenedorAnunciosEstaticos) {
                contenedorAnunciosEstaticos.innerHTML = htmlAnuncios;
            }
            
            // No necesitamos agregar listeners aquí porque usamos delegación de eventos
            // Los listeners se agregan una vez en DOMContentLoaded
        } else {
            // Si no hay anuncios
            if (contenedorAnuncios) {
                contenedorAnuncios.innerHTML = '<p class="text-center">No hay anuncios publicados aún. <a href="../Nuevo_anuncio/paso1.html?accion=perdido">Publica el primero</a></p>';
            }
        }
    } catch (error) {
        console.error('Error al cargar anuncios:', error);
        if (contenedorAnuncios) {
            contenedorAnuncios.innerHTML = '<p class="text-center text-danger">Error al cargar los anuncios. Por favor, recarga la página.</p>';
        }
    }
}

// Función para manejar clicks en botones de eliminar (delegación de eventos)
// Esta función se ejecuta cuando se hace click en cualquier parte del contenedor
function manejarClickEliminar(e) {
    // Verificar si el click fue en un botón de eliminar o en sus hijos (icono)
    const boton = e.target.closest('.btn-eliminar-anuncio');
    if (!boton) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const id = parseInt(boton.getAttribute('data-anuncio-id'));
    let nombre = boton.getAttribute('data-anuncio-nombre');
    
    // Decodificar el nombre (convertir entidades HTML de vuelta a caracteres)
    if (nombre) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = nombre;
        nombre = tempDiv.textContent || tempDiv.innerText || nombre;
    }
    
    if (id && nombre) {
        eliminarAnuncioDesdeWeb(id, nombre);
    }
}

// Función para agregar event listeners a los botones de eliminar
function agregarEventListenersEliminar() {
    // Usar delegación de eventos en el contenedor
    // Esto permite que funcione incluso si los elementos se agregan dinámicamente
    const contenedorAnuncios = document.getElementById('anuncios-dinamicos') || document.querySelector('.item-list tbody');
    if (!contenedorAnuncios) return;
    
    // Agregar listener solo una vez (usar {once: false} para que funcione siempre)
    // Como usamos delegación de eventos, no necesitamos agregarlo cada vez
    if (!contenedorAnuncios.hasAttribute('data-eliminar-listener')) {
        contenedorAnuncios.setAttribute('data-eliminar-listener', 'true');
        contenedorAnuncios.addEventListener('click', manejarClickEliminar);
    }
}

// Función para eliminar un anuncio desde la página web
async function eliminarAnuncioDesdeWeb(id, nombre) {
    // Confirmar eliminación
    if (!confirm(`¿Estás seguro de que deseas eliminar el anuncio de "${nombre}"?\n\nEsta acción no se puede deshacer.`)) {
        return;
    }
    
    // Mostrar mensaje de carga
    const anuncioCard = document.querySelector(`[data-anuncio-id="${id}"]`);
    if (anuncioCard) {
        const btnEliminar = anuncioCard.querySelector('.btn-eliminar-anuncio');
        if (btnEliminar) {
            btnEliminar.disabled = true;
            btnEliminar.innerHTML = '<i class="bi bi-hourglass-split"></i> Eliminando...';
        }
    }
    
    try {
        // Intentar eliminar desde la API (MySQL)
        if (typeof eliminarAnuncioAPI === 'function') {
            const resultado = await eliminarAnuncioAPI(id);
            if (resultado) {
                // Eliminar también de localStorage si existe
                try {
                    const anuncios = JSON.parse(localStorage.getItem('anuncios_guardados') || '[]');
                    const anunciosFiltrados = anuncios.filter(a => a.id != id);
                    localStorage.setItem('anuncios_guardados', JSON.stringify(anunciosFiltrados));
                } catch (e) {
                    console.warn('Error al eliminar de localStorage:', e);
                }
                
                // Mostrar mensaje de éxito
                mostrarMensajeEliminacion(`Anuncio de "${nombre}" eliminado exitosamente`, 'success');
                
                // Ocultar el anuncio con animación
                if (anuncioCard) {
                    anuncioCard.style.transition = 'opacity 0.3s, transform 0.3s';
                    anuncioCard.style.opacity = '0';
                    anuncioCard.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        anuncioCard.remove();
                        // Si no quedan anuncios, mostrar mensaje
                        const container = document.getElementById('anuncios-dinamicos');
                        if (container && container.children.length === 0) {
                            container.innerHTML = '<p class="text-center">No hay anuncios publicados aún. <a href="../Nuevo_anuncio/paso1.html?accion=perdido">Publica el primero</a></p>';
                        }
                    }, 300);
                }
                return;
            }
        }
    } catch (error) {
        console.error('Error al eliminar anuncio:', error);
        
        // Fallback: eliminar de localStorage
        try {
            const anuncios = JSON.parse(localStorage.getItem('anuncios_guardados') || '[]');
            const anunciosFiltrados = anuncios.filter(a => a.id != id);
            localStorage.setItem('anuncios_guardados', JSON.stringify(anunciosFiltrados));
            
            // Ocultar el anuncio
            if (anuncioCard) {
                anuncioCard.style.transition = 'opacity 0.3s, transform 0.3s';
                anuncioCard.style.opacity = '0';
                anuncioCard.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    anuncioCard.remove();
                }, 300);
            }
            
            mostrarMensajeEliminacion(`Anuncio de "${nombre}" eliminado localmente`, 'warning');
        } catch (e) {
            mostrarMensajeEliminacion(`Error al eliminar el anuncio: ${error.message}`, 'danger');
        }
    } finally {
        // Restaurar botón si aún existe
        if (anuncioCard) {
            const btnEliminar = anuncioCard.querySelector('.btn-eliminar-anuncio');
            if (btnEliminar) {
                btnEliminar.disabled = false;
                btnEliminar.innerHTML = '<i class="bi bi-trash"></i> Eliminar';
            }
        }
    }
}

// Función para mostrar mensaje de eliminación
function mostrarMensajeEliminacion(mensaje, tipo) {
    // Crear elemento de mensaje si no existe
    let mensajeDiv = document.getElementById('mensaje-eliminacion');
    if (!mensajeDiv) {
        mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje-eliminacion';
        mensajeDiv.className = 'alert';
        mensajeDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);';
        document.body.appendChild(mensajeDiv);
    }
    
    // Configurar mensaje
    const tipos = {
        'success': 'alert-success',
        'danger': 'alert-danger',
        'warning': 'alert-warning',
        'info': 'alert-info'
    };
    
    mensajeDiv.className = `alert ${tipos[tipo] || 'alert-info'}`;
    mensajeDiv.innerHTML = `
        <strong>${tipo === 'success' ? '✓' : tipo === 'danger' ? '✗' : '⚠'}</strong> ${mensaje}
        <button type="button" class="close" onclick="this.parentElement.remove()" aria-label="Cerrar">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    mensajeDiv.style.display = 'block';
    
    // Ocultar automáticamente después de 5 segundos
    setTimeout(() => {
        if (mensajeDiv && mensajeDiv.parentElement) {
            mensajeDiv.style.transition = 'opacity 0.3s';
            mensajeDiv.style.opacity = '0';
            setTimeout(() => {
                if (mensajeDiv && mensajeDiv.parentElement) {
                    mensajeDiv.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Cargar anuncios cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Hacer la función global después de que se defina
    window.eliminarAnuncioDesdeWeb = eliminarAnuncioDesdeWeb;
    document.body.classList.add('page-loaded');
    
    // Configurar delegación de eventos para botones de eliminar (una sola vez)
    agregarEventListenersEliminar();
    
    // Cargar y mostrar anuncios
    cargarAnuncios();
    
    // Google Tag Manager (código existente)
            window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				'language': 'es',
				'country': 'es'
  			});
			
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WZLVLPS');

    function gtm_event(name, value=null, data={}) {
				dataLayer.push({
					'event': name,
					'conversionValue': value,
					'data': data
				});
			}
   
    setTimeout(() => {
        if (typeof analytic_event === 'function') {
            analytic_event({"name":"screen_view"});
        }
    }, 500);
});


        
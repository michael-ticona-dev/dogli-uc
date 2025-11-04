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

    // Poblar Distritos y Colores
    poblarSelector('distrito', DISTRITOS_AREQUIPA, "Seleccione un Distrito");
    poblarSelector('color-principal', COLORES_PERRO, "Seleccione el Color Principal");
    
    // Para el color secundario, la primera opción es 'No aplica o no visible'
    poblarSelector('color-secundario', COLORES_PERRO, "No aplica o no visible", true);


    // ----------------------------------------------------
    // 3. Lógica Condicional del Formulario (Mostrar/Ocultar Nombre)
    // ----------------------------------------------------

    const urlParams = new URLSearchParams(window.location.search);
    const accion = urlParams.get('accion'); // Obtiene 'perdido' o 'encontrado'
    
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

    // ----------------------------------------------------
    // 4. Manejo de Envío de Formulario (Ejemplo)
    // ----------------------------------------------------
    const form = document.getElementById('anuncio-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Simulación de envío
            console.log("Datos del Anuncio (Acción:", accion, "):", data);
            
            let resumen = `Anuncio de ${accion === 'perdido' ? 'Perro Perdido' : 'Perro Encontrado'}:\n\n`;
            resumen += `Nombre: ${data.nombre_perro || 'N/A (Encontrado)'}\n`;
            resumen += `Raza: ${data.raza}\n`;
            resumen += `Tamaño/Pelo/Pelaje/Orejas: ${data.tamano} / ${data.pelo} / ${data.pelaje} / ${data.orejas}\n`;
            resumen += `Color (P/S): ${data.color_principal} / ${data.color_secundario || 'N/A'}\n`;
            resumen += `Lugar: ${data.distrito}, ${data.calle}\n`;
            resumen += `Contexto: ${data.contexto.substring(0, 50)}...`; // Recortar contexto

            alert(`¡Anuncio Publicado con Éxito!\n\n${resumen}`);
            // Aquí iría el código AJAX para enviar los datos al servidor
        });
    }
});
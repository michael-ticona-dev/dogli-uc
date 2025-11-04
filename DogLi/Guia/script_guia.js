

document.addEventListener('DOMContentLoaded', () => {
    
    // Selecciona todos los botones del acordeón
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            
            // 1. Alternar la clase 'active' en el botón presionado
            header.classList.toggle('active');

            // 2. Obtener el panel de contenido
            const panel = header.nextElementSibling;

            // 3. Animación de apertura/cierre (Innovación)
            // Usamos scrollHeight para obtener la altura real del contenido
            if (panel.style.maxHeight) {
                // Si ya está abierto (tiene maxHeight), ciérralo
                panel.style.maxHeight = null;
            } else {
                // Si está cerrado, ábrelo
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
            
           
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                }
            });
            
        });
    });

    // Opcional: Abrir el primer elemento por defecto
    if (accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }
});
# 🗑️ Cómo Eliminar un Anuncio - Guía Rápida

## Para eliminar el anuncio de "Romario" o cualquier otro anuncio

### Método 1: Desde phpMyAdmin (Más Fácil) ⭐

1. **Abre phpMyAdmin**:
   - Ve a: `http://localhost/phpmyadmin`
   - O desde XAMPP: Panel de Control → MySQL → Admin

2. **Selecciona la base de datos**:
   - En el menú izquierdo, haz clic en `dogli_db`

3. **Abre la tabla de anuncios**:
   - Haz clic en la tabla `anuncios`

4. **Busca el anuncio**:
   - Usa el buscador o desplázate hasta encontrar "Romario"
   - O ejecuta esta consulta en la pestaña SQL:
     ```sql
     SELECT * FROM anuncios WHERE nombre_perro LIKE '%Romario%';
     ```

5. **Elimina el anuncio**:
   - **Opción A (Soft Delete - Recomendado)**: Marca la casilla del anuncio y haz clic en "Editar", luego cambia `activo` a `0` y guarda
   - **Opción B (Eliminación permanente)**: Marca la casilla y haz clic en "Eliminar"

### Método 2: Desde SQL Directo

Abre phpMyAdmin → pestaña SQL y ejecuta:

```sql
-- Eliminar por nombre (soft delete - recomendado)
UPDATE anuncios SET activo = 0 WHERE nombre_perro = 'Romario';

-- O eliminar por ID (si conoces el ID)
UPDATE anuncios SET activo = 0 WHERE id = 1;

-- Eliminación permanente (¡CUIDADO! No se puede deshacer)
DELETE FROM anuncios WHERE nombre_perro = 'Romario';
```

### Método 3: Desde la Página de Administración

1. **Abre la página de administración**:
   - Ve a: `http://localhost/backend/admin_anuncios.html`

2. **Busca el anuncio**:
   - Usa el buscador para encontrar "Romario"
   - O desplázate hasta encontrarlo

3. **Elimina el anuncio**:
   - Haz clic en el botón "Eliminar" rojo
   - Confirma la eliminación

### Método 4: Desde la API (Para desarrolladores)

Usa una herramienta como Postman o curl:

```bash
# Eliminar por ID
curl -X DELETE "http://localhost/backend/api_anuncios.php?id=1"
```

O desde JavaScript en la consola del navegador:

```javascript
// Primero, carga la configuración de la API
fetch('http://localhost/backend/api_config.js')
  .then(response => response.text())
  .then(code => eval(code))
  .then(() => {
    // Buscar el ID del anuncio de Romario
    obtenerAnunciosAPI().then(anuncios => {
      const romario = anuncios.find(a => a.nombre_perro === 'Romario');
      if (romario) {
        eliminarAnuncioAPI(romario.id).then(() => {
          console.log('Anuncio eliminado');
        });
      }
    });
  });
```

## 🔍 Buscar el ID del Anuncio

Si necesitas encontrar el ID del anuncio de Romario:

```sql
SELECT id, nombre_perro, fecha_creacion 
FROM anuncios 
WHERE nombre_perro LIKE '%Romario%';
```

## ⚠️ Notas Importantes

1. **Soft Delete vs Eliminación Permanente**:
   - **Soft Delete** (`activo = 0`): El anuncio se oculta pero no se elimina de la base de datos. Se puede recuperar.
   - **Eliminación Permanente** (`DELETE`): El anuncio se elimina completamente. No se puede recuperar.

2. **Recomendación**: Usa Soft Delete (`UPDATE anuncios SET activo = 0`) en lugar de eliminación permanente, así puedes recuperar el anuncio si es necesario.

3. **Si el anuncio está en localStorage**: Si también guardaste el anuncio en localStorage del navegador, necesitas limpiarlo manualmente:
   - Abre las herramientas de desarrollador (F12)
   - Ve a Application → Local Storage
   - Busca `anuncios_guardados`
   - Elimina el anuncio del array

## 🆘 Solución de Problemas

### No encuentro el anuncio en phpMyAdmin:
- Verifica que estés en la base de datos correcta (`dogli_db`)
- Verifica que la tabla se llame `anuncios`
- Intenta buscar sin mayúsculas/minúsculas: `SELECT * FROM anuncios WHERE LOWER(nombre_perro) LIKE '%romario%';`

### El anuncio sigue apareciendo en el sitio:
- Asegúrate de que `activo = 0` en la base de datos
- Limpia la caché del navegador
- Verifica que la API esté funcionando correctamente

### Error al eliminar desde la API:
- Verifica que MySQL esté corriendo
- Verifica que la API esté accesible: `http://localhost/backend/api_anuncios.php`
- Revisa la consola del navegador para ver errores

## 📝 Archivos de Ayuda

- `backend/admin_anuncios.html` - Página de administración visual
- `backend/eliminar_anuncio.php` - Página de ayuda para eliminar anuncios
- `backend/api_anuncios.php` - API para gestionar anuncios

## 🎯 Método Rápido (Recomendado)

**Para eliminar el anuncio de Romario rápidamente:**

1. Abre: `http://localhost/phpmyadmin`
2. Selecciona: `dogli_db` → `anuncios`
3. Ejecuta en SQL:
   ```sql
   UPDATE anuncios SET activo = 0 WHERE nombre_perro = 'Romario';
   ```
4. ¡Listo! El anuncio ya no aparecerá en el sitio web.


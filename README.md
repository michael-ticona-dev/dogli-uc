# 🐶 Dogli UC

**Dogli UC** es una plataforma web moderna enfocada en la **adopción responsable de animales en situación de calle**, desarrollada con **Laravel**, **React**, y **MySQL**.  
Su propósito es conectar a **rescatistas, adoptantes y organizaciones protectoras**, fomentando una comunidad digital donde cada mascota tenga una oportunidad de encontrar un hogar.

---

## 🌟 Objetivos del proyecto

- Promover la **adopción responsable** y reducir el abandono animal.  
- Brindar una **plataforma intuitiva y accesible** para gestionar adopciones.  
- Facilitar la **interacción entre adoptantes y rescatistas** mediante herramientas seguras.  
- Implementar **tecnologías modernas y escalables** que garanticen un rendimiento óptimo.

---

## 🚀 Tecnologías principales

| Categoría | Tecnología |
|------------|-------------|
| **Frontend** | React + Vite |
| **Backend** | Laravel 11 (PHP 8.2+) |
| **Base de datos** | MySQL 8 |
| **Estilos** | TailwindCSS + Shadcn/UI |
| **Autenticación** | Laravel Sanctum / JWT |
| **Servidor de desarrollo** | PHP Artisan + Vite |
| **Control de versiones** | Git + GitHub |
| **CI/CD** | GitHub Actions |
| **Despliegue** | Render / Vercel / Laravel Forge |

---

## 🧩 Características principales

- 🐾 **Gestión de animales:** registro, edición y adopción de mascotas.
- 📸 **Galería de imágenes:** subida y vista de fotos optimizadas.
- 👤 **Sistema de usuarios:** roles de administrador, rescatista y adoptante.
- 💬 **Mensajería interna:** comunicación entre usuarios.
- 📍 **Geolocalización:** ver mascotas disponibles cercanas.
- 🧠 **Panel administrativo:** control de publicaciones, usuarios y reportes.
- 📱 **Interfaz responsiva:** adaptable a móviles y tablets.
- ⚙️ **Validaciones seguras:** formularios con reglas de negocio sólidas.
- 📊 **Estadísticas:** panel con métricas de adopción y actividad.

---

## 🧠 Flujo de trabajo con Git y ramas

El proyecto sigue una estrategia de **ramas protegidas** basada en GitHub Flow:

### 🌿 Estructura de ramas

| Rama | Descripción |
|-------|--------------|
| `main` | Rama principal protegida (solo merges aprobados vía Pull Request) |
| `rama-michael` | Desarrollador Full Stack / Líder |
| `rama-josua` | Frontend Developer |
| `rama-gerardo` | UX/UI Designer | 
| `rama-david` | Backend Developer |
| `rama-li` | QA y Documentación ---- el mas vago de vagos |

### 🚀 Flujo de desarrollo

1. Asegúrate de tener la última versión de `main`:
   ```bash
   git checkout main
   git pull origin main

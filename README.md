<div align="center">

# 🐶 **DOGLI-UC**
✨ *Sistema de Adopción y busqueda de mascotas*

![Banner](https://img.shields.io/badge/DOGLI--UC-Automated-blueviolet?style=for-the-badge&logo=github)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/tu-usuario/dogli-uc?style=flat-square)
![Stars](https://img.shields.io/github/stars/tu-usuario/dogli-uc?style=flat-square)

</div>

---

## 🧭 **Índice**
| Sección | Descripción |
|----------|-------------|
| [📘 Descripción](#-descripción) | Qué es y para qué sirve |
| [⚙️ Instalación](#️-instalación) | Cómo configurarlo |
| [🚀 Uso](#-uso) | Comandos básicos |
| [🧩 Convención de Commits](#-convención-de-commits) | Cómo escribir mensajes claros |
| [🌳 Flujo de Trabajo con Ramas](#-flujo-de-trabajo-con-ramas) | Organización de trabajo |
| [🔼 Subir Cambios](#-subir-cambios) | Cómo subir tus cambios |
| [🔁 Pull Requests](#-pull-requests) | Creación de PRs |
| [👨‍💻 Flujo de Desarrollo Completo](#-flujo-de-desarrollo-completo) | Desde el feature hasta el merge |
| [🧰 Limpieza y Configuración](#-limpieza-y-configuración) | Tips y atajos |
| [📊 Métricas del Proyecto](#-métricas-del-proyecto) | Estadísticas y datos |

---

## 📘 **Descripción**
> **DOGLI-UC** es una web y aplicativo para la adopción de perros, encontrar perros perdidos, etc.  
> Incluye buenas prácticas, flujos Git optimizados, herramientas para CI/CD y un enfoque en la automatización.

### 🚀 **Características Principales**
- **Modularidad**: Componentes reutilizables.
- **Colaboración**: Flujos de trabajo eficientes con Git y GitHub.
- **Automatización**: Scripts para setup y despliegue.
- **Tecnologías**: Node.js, React, Laravel.

📦 **Stack Tecnológico**:
| Tecnología | Uso |
|------------|-----|
| Node.js | Backend y scripts |
| GitHub CLI | Gestión de repositorios |

---

## ⚙️ **Instalación**
```bash
git clone https://github.com/michael-ticona-dev/dogli-uc.git
cd dogli-uc
npm install
```

### 📋 **Requisitos**
- Node.js >= 16
- Git
- GitHub CLI

---

## 🚀 **Uso**
```bash
npm run dev    # Inicia el servidor de desarrollo
npm start      # Construye y ejecuta en producción
npm test       # Ejecuta las pruebas
```

### 📋 **Scripts Disponibles**
| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm start` | Build y ejecución en producción |
| `npm test` | Ejecuta suite de pruebas |
| `npm run build` | Construye el proyecto |

---

## 🧩 **Convención de Commits**
Usamos [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial claro.

| Tipo | Descripción | Emoji | Ejemplo |
|------|-------------|:-----:|---------|
| `feat` | Nueva funcionalidad | ✨ | `feat: agregar autenticación con JWT` |
| `fix` | Corrección de errores | 🐛 | `fix: corregir bug en validación` |
| `docs` | Documentación | 📝 | `docs: actualizar README` |
| `style` | Cambios de formato/estilo | 🎨 | `style: formatear código con Prettier` |
| `refactor` | Mejora del código sin alterar comportamiento | ♻️ | `refactor: simplificar lógica de usuario` |
| `perf` | Optimización/rendimiento | ⚡ | `perf: mejorar velocidad de carga` |
| `test` | Pruebas | ✅ | `test: agregar tests para API` |
| `build` | Dependencias or builds | 📦 | `build: actualizar dependencias` |
| `ci` | Integración continua/despliegue | 👷 | `ci: configurar GitHub Actions` |
| `chore` | Mantenimiento/limpieza | 🔧 | `chore: limpiar archivos temporales` |
| `revert` | Reversión de cambios | ⏪ | `revert: deshacer commit anterior` |

---

## 🌳 **Flujo de Trabajo con Ramas**
Organizamos el trabajo con ramas para mantener el código limpio.

### 📋 **Comandos Básicos**
```bash
git branch                    # Lista ramas locales
git branch -r                 # Lista ramas remotas
git branch -a                 # Lista todas las ramas
git checkout main             # Cambia a main
git pull origin main          # Actualiza main
git checkout -b feature/nueva-funcionalidad  # Crea nueva rama
```
### 🌿 **Estructura de Ramas**
| Rama | Propósito |
|------|-----------|
| `main` | Código estable y listo para producción |
| `rama-michael` | Rama personal de Michael — desarrollo principal y mantenimiento general |
| `rama-li` | Rama personal de Li — desarrollo de componentes, documentación y optimización |
| `rama-david` | Rama personal de David — nuevas funciones y backend |
| `rama-gerardo` | Rama personal de Gerardo — integración y mejoras de frontend |
| `rama-josua` | Rama personal de Josua — diseño, interfaz y frontend |

---

## 🔼 **Subir Cambios**
```bash
git add .                                    # Agrega todos los cambios
git commit -m "feat: implementar nueva funcionalidad"  # Commit con mensaje
git push origin feature/nueva-funcionalidad  # Sube la rama
```

---

## 🔁 **Pull Requests**
Crea PRs para integrar cambios.

```bash
gh pr create \
  --base main \
  --head feature/nueva-funcionalidad \
  --title "feat: añadir nueva funcionalidad" \
  --body "Implementación completa y testada de la nueva funcionalidad."
```

### 🧭 **Comandos Útiles para PRs**
| Comando | Descripción |
|---------|-------------|
| `gh pr view --web` | Abre el PR en el navegador |
| `gh pr list` | Lista todos los PRs |
| `gh pr status` | Muestra el estado de tus PRs |
| `gh pr merge --squash` | Merge con squash |

---

## 👨‍💻 **Flujo de Desarrollo Completo**
1. **Actualiza main**: `git checkout main && git pull origin main`
2. **Crea rama**: `git checkout -b feature/nueva-feature`
3. **Desarrolla**: Haz cambios y commits.
4. **Sube**: `git push origin feature/nueva-feature`
5. **Crea PR**: Usa `gh pr create` para proponer cambios.

---

## 🧰 **Limpieza y Configuración**
```bash
# Elimina ramas locales que ya no existen en remoto
git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D

# Visualiza el historial
git log --oneline --graph --decorate

# Configura Git
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# Autentica GitHub CLI
gh auth login
```

### 📋 **Comandos Útiles**
| Comando | Descripción |
|---------|-------------|
| `git status` | Estado del repositorio |
| `git diff` | Diferencias en cambios |
| `git stash` | Guarda cambios temporalmente |
| `gh repo clone tu-usuario/dogli-uc` | Clona el repo |

---

<div align="center">

💜 **Desarrollado por el equipo DOGLI-UC**  
> “Colabora, automatiza y mejora cada commit.” 🚀

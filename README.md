#!/bin/bash
echo "🚀 Iniciando configuración completa del proyecto DOGLI-UC..."

if ! command -v git &> /dev/null; then
  echo "❌ Git no está instalado. Instálalo antes de continuar."
  exit 1
fi

if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI no está instalado. Instálalo con:"
  echo "sudo apt install gh   # o brew install gh / winget install GitHub.cli"
  exit 1
fi

cat > README.md << 'EOF'
<div align="center">

# 🐶 **DOGLI-UC**
✨ *Sistema de Gestión y Desarrollo Colaborativo*

![Banner](https://img.shields.io/badge/DOGLI--UC-Automated-blueviolet?style=for-the-badge&logo=github)
![Status](https://img.shields.io/badge/status-active-success?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

</div>

---

## 🧭 **Índice**
| Sección | Descripción |
|----------|-------------|
| [📘 Descripción](#-descripción) | Qué es y para qué sirve |
| [⚙️ Instalación](#️-instalación) | Cómo configurarlo |
| [🚀 Uso](#-uso) | Comandos básicos |
| [🧩 Convención de Commits](#-convención-de-commits) | Cómo escribir mensajes claros |
| [🌳 Flujo de Ramas](#-flujo-de-trabajo-con-ramas) | Organización de trabajo |
| [🔁 Pull Requests](#-pull-requests) | Creación de PRs |
| [👨‍💻 Flujo de Desarrollo](#-flujo-de-desarrollo-completo) | Desde el feature hasta el merge |
| [🧰 Comandos Útiles](#-limpieza-y-configuración) | Tips y atajos |

---

## 📘 **Descripción**
> Dogli-UC es un sistema de gestión modular pensado para equipos de desarrollo colaborativo.  
> Este proyecto incluye buenas prácticas, flujos Git optimizados y herramientas para CI/CD.

📦 **Stack principal**: Node.js, Vite, GitHub CLI, TailwindCSS, Hyprland.

---

## ⚙️ **Instalación**
git clone https://github.com/tu-usuario/dogli-uc.git
cd dogli-uc
npm install

---

## 🚀 **Uso**
npm run dev
npm start
npm test

---

## 🧩 **Convención de Commits**
| Tipo | Descripción | Emoji |
|------|-------------|:----:|
| feat | Nueva funcionalidad | ✨ |
| fix | Corrección de errores | 🐛 |
| docs | Documentación | 📝 |
| style | Cambios de formato / estilo | 🎨 |
| refactor | Mejora del código sin alterar comportamiento | ♻️ |
| perf | Optimización / rendimiento | ⚡ |
| test | Pruebas | ✅ |
| build | Dependencias o builds | 📦 |
| ci | Integración continua / despliegue | 👷 |
| chore | Mantenimiento / limpieza | 🔧 |
| revert | Reversión de cambios | ⏪ |

📘 **Ejemplos:**
git commit -m "feat: agregar autenticación con JWT"
git commit -m "fix: corregir bug en validación"
git commit -m "docs: actualizar README"

---

## 🌳 **Flujo de Trabajo con Ramas**
git branch
git branch -r
git branch -a
git checkout main
git pull origin main
git checkout -b feature/nueva-funcionalidad

---

## 🔼 **Subir Cambios**
git add .
git commit -m "feat: implementar nueva funcionalidad"
git push origin feature/nueva-funcionalidad

---

## 🔁 **Pull Requests**
gh pr create --base main --head feature/nueva-funcionalidad --title "feat: añadir nueva funcionalidad" --body "Implementación completa y testada de la nueva funcionalidad."

🧭 **Comandos útiles:**
gh pr view --web
gh pr list
gh pr status
gh pr merge --squash

---

## 👨‍💻 **Flujo de Desarrollo Completo**
git checkout main
git pull origin main
git checkout -b feature/nueva-feature
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-feature
gh pr create --base main --head feature/nueva-feature

---

## 🧰 **Limpieza y Configuración**
git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D
git log --oneline --graph --decorate
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
gh auth login

---

<div align="center">

💜 **Desarrollado por el equipo DOGLI-UC**  
> “Colabora, automatiza y mejora cada commit.” 🚀

![Divider](https://img.shields.io/badge/Made%20with-Bash-blue?style=flat-square&logo=gnubash)
</div>
EOF

echo "✅ Archivo README.md generado correctamente."
echo "📄 Mostrando contenido del README..."
cat README.md

git add README.md
git commit -m "docs: agregar README visual completo con tablas, emojis y guía de flujo"
git checkout -b feature/setup-readme || git switch -c feature/setup-readme
git push origin feature/setup-readme

gh pr create \
  --base main \
  --head feature/setup-readme \
  --title "docs: agregar README visual completo con emojis y guía de flujo" \
  --body "Se agrega un README.md estéticamente mejorado con tablas, íconos y estructura profesional para facilitar el desarrollo colaborativo del proyecto DOGLI-UC."

echo "✅ TODO COMPLETADO CON ÉXITO 🚀"
echo "🌐 Pull Request creado correctamente. Revisa en GitHub para hacer merge con main."

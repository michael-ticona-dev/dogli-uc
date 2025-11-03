#!/bin/bash


## 🚀 Instalación Automática del Proyecto

Copia y ejecuta este script en tu terminal para generar el README, crear la rama y abrir un Pull Request automáticamente:

```bash
#!/bin/bash
# 🐶 DOGLI-UC - SETUP COMPLETO
# ======================================================
# 🐶 DOGLI-UC - SCRIPT COMPLETO DE INICIALIZACIÓN Y FLUJO GIT
# ======================================================

echo "🚀 Iniciando configuración completa del proyecto DOGLI-UC..."

# ------------------------------------------
# Verificar dependencias
# ------------------------------------------
if ! command -v git &> /dev/null; then
  echo "❌ Git no está instalado. Instálalo antes de continuar."
  exit 1
fi

if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI no está instalado. Instálalo con:"
  echo "sudo apt install gh   # o brew install gh / winget install GitHub.cli"
  exit 1
fi

# ------------------------------------------
# Crear archivo README.md completo
# ------------------------------------------
cat > README.md << 'EOF'
# 🐶 DOGLI-UC

## 📘 Descripción
Dogli-UC es un sistema de gestión y desarrollo colaborativo.  
Este repositorio incluye una guía completa para trabajar en equipo con Git y GitHub.

## 📂 Tabla de Contenidos
- Instalación
- Uso
- Convención de Commits
- Flujo de Trabajo con Ramas
- Pull Requests
- Flujo de Desarrollo Completo
- Comandos Útiles

## ⚙️ Instalación
git clone https://github.com/tu-usuario/dogli-uc.git
cd dogli-uc
npm install

## 🚀 Uso
npm run dev
npm start
npm test

## 🧩 Convención de Commits
feat  → Nueva funcionalidad ✨
fix   → Corrección de errores 🐛
docs  → Documentación 📝
style → Cambios de estilo 🎨
refactor → Refactorización ♻️
perf  → Mejoras de rendimiento ⚡
test  → Pruebas ✅
build → Dependencias 📦
ci    → Integración continua 👷
chore → Mantenimiento 🔧
revert→ Revertir cambios ⏪

Ejemplos:
git commit -m "feat: agregar autenticación con JWT"
git commit -m "fix: corregir bug en el login"
git commit -m "docs: actualizar pasos de instalación"

## 🌳 Flujo de Trabajo con Ramas
git branch          # Ver ramas locales
git branch -r       # Ver ramas remotas
git branch -a       # Ver todas las ramas
git checkout main   # Cambiar a main
git pull origin main
git checkout -b feature/nueva-funcionalidad

## 🔼 Subir cambios
git add .
git commit -m "feat: implementar nueva funcionalidad"
git push origin feature/nueva-funcionalidad

## 🔁 Pull Requests
gh pr create --base main --head feature/nueva-funcionalidad --title "feat: añadir nueva funcionalidad" --body "Implementación completa de la funcionalidad."

Comandos útiles:
gh pr view --web
gh pr list
gh pr status
gh pr merge --squash

## 👨‍💻 Flujo de Desarrollo Completo
git checkout main
git pull origin main
git checkout -b feature/nueva-feature
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-feature
gh pr create --base main --head feature/nueva-feature

## 🧰 Limpieza y configuración
git fetch -p && git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D
git log --oneline --graph --decorate
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
gh auth login
EOF

echo "✅ Archivo README.md generado correctamente."
echo "📄 Mostrando contenido del README..."
cat README.md

# ------------------------------------------
# Subir cambios automáticamente en una nueva rama
# ------------------------------------------
echo "📦 Subiendo cambios en una nueva rama..."
git add README.md
git commit -m "docs: agregar README completo de flujo y comandos"
git checkout -b feature/setup-readme || git switch -c feature/setup-readme
git push origin feature/setup-readme

# ------------------------------------------
# Crear Pull Request
# ------------------------------------------
echo "🔄 Creando Pull Request automáticamente..."
gh pr create \
  --base main \
  --head feature/setup-readme \
  --title "docs: agregar README completo con flujo de trabajo" \
  --body "Este PR añade el README con toda la guía de trabajo, commits, ramas y comandos útiles."

echo "✅ TODO COMPLETADO CON ÉXITO 🚀"
echo "🌐 Pull Request creado. Revisa en GitHub para hacer merge con main."

# Configuración de CI/CD con GitHub Actions y GitHub Pages

##📋 Resumen

El proyecto utiliza **GitHub Actions** para automatizar el proceso de compilación, validación y despliegue a **GitHub Pages**. Cada vez que hagas un push a las ramas `main` o `master`, se ejecutará automáticamente el workflow.

## 🚀 Workflow Automatizado

### Pasos del flujo CI/CD:

1. **Checkout** - Descarga el código del repositorio
2. **Setup Node.js** - Configura Node.js v20 con caché de npm
3. **Install Dependencies** - Instala las dependencias del proyecto (`npm ci`)
4. **Linting** - Ejecuta validaciones (`npm run lint`)
5. **Build** - Compila el proyecto (`npm run build`)
6. **Upload Artifact** - Sube los archivos compilados
7. **Deploy** - Despliega en GitHub Pages

## ⚙️ Archivo de Configuración

El workflow está definido en: `.github/workflows/deploy.yml`

### Características principales:

```yaml
- Triggered on: push a main/master y pull requests
- Permissions: pages write, id-token write, contents read
- Runner: ubuntu-latest
- Node.js: v20 con caché
- Artifact path: build/
```

## 🔧 Configuración Requerida en GitHub

### 1. Habilitar GitHub Pages

1. Ve a **Settings** → **Pages** del repositorio
2. En **Build and deployment**:
   - **Source**: `GitHub Actions`
   - **Branch**: Automático (el workflow lo maneja)

### 2. Verificar Permisos de Actions

1. Ve a **Settings** → **Actions** → **General**
2. Asegúrate que:
   - **Workflow permissions**: `Read and write permissions`
   - **Allow GitHub Actions to create and approve pull requests**: ✓ (opcional)

### 3. Variables de Ambiente (si es necesario)

Si tu aplicación necesita variables de entorno:

1. Ve a **Settings** → **Secrets and variables** → **Actions**
2. Agregar los **Secrets** necesarios (ej: API keys, tokens)
3. Referenciarlos en el workflow con `${{ secrets.NOMBRE_SECRET }}`

## 📝 Archivo de Configuración Svelte Kit

El proyecto está preconfigurado para GitHub Pages con:

- **Adapter**: `@sveltejs/adapter-static`
- **Base path**: `/Maria-Cecilia-Ospina` (ajustar según el nombre del repo si es diferente)

Esto está en `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-static';

const repoName = 'Maria-Cecilia-Ospina';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    paths: {
      base: `/${repoName}`
    }
  }
};
```

**⚠️ Importante**: Cambia `repoName` si tu repositorio tiene otro nombre, o deja vacío si es el sitio personal (`username.github.io`).

## 🔍 Monitorear el Deployment

1. Ve a la pestaña **Actions** de tu repositorio
2. Haz un push para activar el workflow
3. Verás el estado de ejecución: `build` → `deploy`
4. Una vez completado, el sitio estará disponible en:

```
https://<USERNAME>.github.io/<REPO-NAME>/
```

o si es sitio personal:

```
https://<USERNAME>.github.io/
```

## 🐛 Troubleshooting

### El workflow falla en la construcción

- **Solución**: Revisa los logs en la pestaña **Actions**
- Verifica que `npm run build` funciona localmente

### El linting falla

- **Solución**: Ejecuta `npm run lint` localmente y corrige los errores

### Los cambios no aparecen en el sitio

- **Solución**: 
  - Limpia la caché del navegador (Ctrl+Shift+Delete)
  - Espera 5 minutos para que GitHub Pages actualice
  - Verifica en **Settings** → **Pages** que está habilitado

### Falta permisos en el workflow

- **Solución**: Ve a **Settings** → **Actions** → **General** y ajusta permisos

## 📚 Referenced Workflows Actions

- `actions/checkout@v4` - Descarga el repositorio
- `actions/setup-node@v4` - Configura Node.js
- `actions/upload-pages-artifact@v3` - Carga el sitio compilado
- `actions/deploy-pages@v4` - Despliega a GitHub Pages

## 🎯 Scripts del Proyecto

```bash
npm run dev       # Desarrollo local
npm run build     # Compilar para producción
npm run preview   # Preview del build
npm run lint      # Validar código
npm run check     # Chequeo de Svelte
```

---

**Última actualización**: Abril 2026

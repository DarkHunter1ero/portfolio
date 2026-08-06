# CV Diego Silva

Este proyecto utiliza **RenderCV** para generar el currículum vitae en PDF (inglés y español) y publicarlos automáticamente en el portfolio web.

## Cómo funciona

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Flujo de generación                         │
│                                                                     │
│  Diego_Silva_CV_EN.yaml  ──→  rendercv render  ──→  PDF            │
│  Diego_Silva_CV_ES.yaml  ──→  rendercv render  ──→  PDF            │
│                                                                     │
│  Los scripts mueven automáticamente cada PDF a:                     │
│                                                                     │
│  ../frontend/public/CV/EN/Diego_Silva_CV.pdf                       │
│  ../frontend/public/CV/ES/Diego_Silva_CV.pdf                       │
│                                                                     │
│  El frontend (Next.js) sirve estos archivos estáticamente desde:    │
│                                                                     │
│  /CV/EN/Diego_Silva_CV.pdf   ←  botón "Download CV" en inglés     │
│  /CV/ES/Diego_Silva_CV.pdf   ←  botón "Descargar CV" en español   │
└─────────────────────────────────────────────────────────────────────┘
```

### Integración con el frontend

El botón de descarga en la web está en `src/components/sections/hero/hero-cta.tsx`. Usa `useLocale()` de next-intl para detectar el idioma del usuario y servir el PDF correcto:

```tsx
const locale = useLocale();
const cvUrl = locale === "es" ? profile.cvUrlEs : profile.cvUrlEn;
// → /CV/ES/Diego_Silva_CV.pdf  o  /CV/EN/Diego_Silva_CV.pdf
```

Las rutas están definidas en `src/data/profile.ts`:

```typescript
cvUrlEn: "/CV/EN/Diego_Silva_CV.pdf",
cvUrlEs: "/CV/ES/Diego_Silva_CV.pdf",
```

**No hay que tocar nada en el frontend al regenerar CVs.** Los scripts pisan los PDFs existentes y Next.js los sirve automáticamente desde la carpeta `public/`.

## Requisitos

- **Python** (versión 3.7 o superior)

```powershell
python --version
```

- **RenderCV**

```powershell
pip install rendercv
```

## Generar el CV

Ejecutá los scripts desde la carpeta `renderCV-external` (no desde `scripts/`).

### Solo español

```powershell
.\scripts\generate-cv-es.ps1
```

Genera `../frontend/public/CV/ES/Diego_Silva_CV.pdf`.

### Solo inglés

```powershell
.\scripts\generate-cv-en.ps1
```

Genera `../frontend/public/CV/EN/Diego_Silva_CV.pdf`.

### Ambos idiomas

```powershell
.\scripts\generate-cv-all.ps1
```

Ejecuta español primero, después inglés.

### Qué hacen los scripts

1. Limpian la salida anterior del idioma correspondiente
2. Ejecutan `rendercv render` sobre el YAML
3. Mueven **solo el PDF** a `frontend/public/CV/<idioma>/`
4. Descartan el resto de archivos generados (HTML, Markdown, PNG, Typst)

## Editar el CV — regla de sincronización ⚠️

Los datos del CV viven en dos archivos YAML independientes:

- **Español** → `Diego_Silva_CV_ES.yaml`
- **Inglés**  → `Diego_Silva_CV_EN.yaml`

**Regla: si modificás uno, modificá el otro.**

Cada vez que agregues, quites o reordenes una sección, item, highlight o dato en un archivo, hacé el mismo cambio en el otro con su traducción correspondiente. Ambos archivos deben tener **exactamente la misma estructura** (misma cantidad de secciones, ítems y sub-ítems).

### Verificar sincronización

Antes de regenerar los PDFs, verificá que ambos archivos estén alineados:

```powershell
.\scripts\sync-check.ps1
```

Esto compara la cantidad de secciones, ítems principales y highlights entre ambos YAML. Si encontrás diferencias, corregilas antes de seguir.

### Después de editar

Editá el YAML correspondiente y ejecutá el script de ese idioma para regenerar:

```powershell
.\scripts\generate-cv-es.ps1   # o .\scripts\generate-cv-en.ps1
.\scripts\generate-cv-all.ps1  # o ambos a la vez
```

La foto de perfil (`foto_perfil.png`) es compartida por ambos YAML y debe estar en la raíz de `renderCV-external/`.

## Estructura del proyecto

```
renderCV-external/
├── Diego_Silva_CV_ES.yaml     # Datos del CV en español
├── Diego_Silva_CV_EN.yaml     # Datos del CV en inglés
├── foto_perfil.png            # Foto compartida por ambos CVs
├── scripts/
│   ├── generate-cv-es.ps1     # Genera PDF español → frontend/public/CV/ES/
│   ├── generate-cv-en.ps1     # Genera PDF inglés  → frontend/public/CV/EN/
│   ├── generate-cv-all.ps1    # Genera ambos
│   └── sync-check.ps1         # Verifica que EN y ES tengan la misma estructura
├── README.md
└── rendercv_output/           # Temporal (RenderCV escribe acá, los scripts lo limpian)

frontend/public/CV/            # Destino final — servido por Next.js
├── EN/Diego_Silva_CV.pdf      # CV en inglés
└── ES/Diego_Silva_CV.pdf      # CV en español
```

## Uso manual (sin scripts)

Si preferís ejecutar RenderCV directamente:

```powershell
# Español
rendercv render Diego_Silva_CV_ES.yaml
# Mover manualmente el PDF:
#   Move-Item Diego_Silva_CV.pdf ..\frontend\public\CV\ES\Diego_Silva_CV.pdf

# Inglés
rendercv render Diego_Silva_CV_EN.yaml
# Mover manualmente el PDF:
#   Move-Item Diego_Silva_CV.pdf ..\frontend\public\CV\EN\Diego_Silva_CV.pdf
```

## Notas técnicas

- RenderCV v2.6 tiene un bug en Windows: crashea al mostrar el checkmark `✓` en la terminal. Los scripts fuerzan UTF-8 y validan por existencia del archivo en vez del exit code, así que esto no afecta la generación.
- La carpeta `rendercv_output/` es solo temporal — RenderCV la crea automáticamente pero los scripts la limpian al terminar.

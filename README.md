# Portfolio de Sergio Fores

Portfolio personal que muestra una colección de obras artísticas en un formato visual y accesible.

## Características

- Galería masonry responsive
- Vista detallada de obras en modal
- Navegación por teclado
- Diseño completamente responsive
- Rendimiento optimizado
- Accesibilidad mejorada

## Estructura del Proyecto

```
sergiofores_portfolio_v2/
├── index.html
├── styles/
│   └── styles.css
├── scripts/
│   ├── gallery.js
│   ├── modal.js
│   ├── data.js
│   └── home.js
├── assets/
│   └── images/
└── data/
    └── artworks.json
```

## Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript (ES6+, Módulos)
- JSON para gestión de datos

## Instalación

1. Clona el repositorio
```bash
git clone [url-del-repositorio]
```

2. Navega al directorio del proyecto
```bash
cd sergiofores_portfolio_v2
```

3. Abre el proyecto con un servidor local
```bash
python -m http.server 8000
# o usa cualquier otro servidor local de tu preferencia
```

4. Visita `http://localhost:8000` en tu navegador

## Uso

### Estructura de Datos

Los datos de las obras se almacenan en `data/artworks.json` con la siguiente estructura:

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "image": "string",
  "technique": "string",
  "dimensions": "string",
  "year": "string",
  "exhibition": "string",
  "tags": ["string"],
  "details": "string"
}
```

### Añadir Nuevas Obras

1. Añade la imagen en `assets/images/`
2. Agrega la información de la obra en `data/artworks.json`
3. La galería se actualizará automáticamente

## Desarrollo

### Comandos Disponibles

- `git add .`: Prepara cambios para commit
- `git commit -m "mensaje"`: Crea un nuevo commit
- `git push`: Sube cambios al repositorio remoto

### Convenciones de Código

- Usa nombres descriptivos en español para funciones y variables
- Sigue el estilo camelCase para JavaScript
- Mantén los archivos CSS organizados por componentes
- Documenta las funciones principales

## Mantenimiento

- Revisa el CHANGELOG.md para ver el historial de cambios
- Sigue las guías de versiones semánticas para los releases
- Mantén actualizada la documentación con cada cambio significativo

## Licencia

Este proyecto es privado y todos los derechos están reservados.

## Contacto

Sergio Fores - [información de contacto]

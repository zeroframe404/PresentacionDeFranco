# Franco Martínez · Estudio Jurídico — Carta de presentación web

Versión web, interactiva y responsive de la carta de presentación de
**Franco Agustín Martínez Pandiani**, abogado — gestión de siniestros junto a
productores asesores de seguros.

Sitio estático, sin dependencias ni compilación: se publica tal cual en GitHub Pages.

---

## 1 · Publicar en GitHub Pages

1. En GitHub, entrá a **Settings → Pages**.
2. En **Build and deployment → Source**, elegí **GitHub Actions**.
3. Listo. Cada `push` a la rama por defecto publica el sitio automáticamente
   (workflow: `.github/workflows/deploy.yml`). También se puede lanzar a mano
   desde **Actions → Publicar en GitHub Pages → Run workflow**.

La URL queda en `https://<usuario>.github.io/<repositorio>/`.

> Alternativa sin Actions: en **Source** elegí *Deploy from a branch* → la rama
> por defecto, carpeta `/ (root)`. El archivo `.nojekyll` ya está incluido para que Jekyll no
> interfiera con la carpeta `assets/`.

---

## 2 · Editar el contenido

**Todo el texto vive en un solo archivo:** [`assets/js/content.js`](assets/js/content.js).
No hace falta tocar HTML ni CSS.

### Completar los datos de contacto

En la última diapositiva hay tres campos marcados como `[completar]`
(así venían en el PDF original). Buscá el bloque `fields` y reemplazalos:

```js
fields: [
  { icon: 'phone', label: 'Teléfono',  value: '+54 9 11 1234-5678', href: 'tel:+5491112345678' },
  { icon: 'mail',  label: 'Correo',    value: 'franco@estudio.com', href: 'mailto:franco@estudio.com' },
  { icon: 'badge', label: 'Matrícula', value: 'T° 000 F° 000',      href: null }
]
```

- `value` es lo que se ve en pantalla.
- `href` es el enlace: `tel:`, `mailto:` o `https://wa.me/54911...`.
  Dejalo en `null` si el dato no es un enlace (por ejemplo la matrícula).
- Mientras diga `[completar]`, el campo se muestra en gris y no es clickeable.

Para sumar WhatsApp, agregá un cuarto campo con `icon: 'whatsapp'`.

### Cambiar textos, agregar o quitar diapositivas

Cada elemento del array `slides` es una diapositiva. El campo `type` define
cómo se dibuja:

| `type`       | Para qué sirve                                              |
|--------------|-------------------------------------------------------------|
| `cover`      | Portada con la composición geométrica de la marca            |
| `statement`  | Frase destacada a página completa (fondo navy con `tone: 'dark'`) |
| `process`    | Pasos numerados (Cómo trabajo)                               |
| `pillars`    | Tarjetas con cabecera navy (Honorarios)                      |
| `path`       | Texto + escalera de instancias (Vía extrajudicial)           |
| `summary`    | Cuatro puntos con ícono                                      |
| `contact`    | Datos de contacto                                            |

Otros campos útiles en cualquier diapositiva:

- `nav` — nombre que aparece en el índice lateral y en los puntos de navegación.
- `num` — numeral grande de fondo (`'01'`, `'02'`…). Omitilo para que no salga.
- `tone: 'dark'` — pinta la diapositiva de navy a sangre.
- `id` — permite enlazar directo, por ejemplo con un botón `data-goto: 'contacto'`.

Íconos disponibles (campo `icon`): `handshake`, `scale`, `wallet`, `clock`,
`shield`, `check`, `doc`, `gavel`, `phone`, `mail`, `badge`, `whatsapp`, `pin`.
Están definidos en `assets/js/icons.js`.

---

## 3 · Cómo se navega

| Acción | PC | Móvil / tablet |
|---|---|---|
| Avanzar | `→` `↓` `Espacio` `AvPág`, rueda del mouse, flecha lateral | deslizar hacia la izquierda |
| Retroceder | `←` `↑` `RePág`, rueda del mouse, flecha lateral | deslizar hacia la derecha |
| Ir a una diapositiva | teclas `1`–`9`, puntos inferiores, índice lateral | puntos inferiores, índice lateral |
| Primera / última | `Inicio` / `Fin` | índice lateral |
| Índice | `O` o `M` | botón ☰ |
| Pantalla completa | `F` | botón ⛶ |
| Tema claro / oscuro | `T` | botón ☾ |
| Cerrar el índice | `Esc` | tocar fuera |

Cada diapositiva tiene su propia dirección (`.../#/4`), así que se puede
compartir un enlace directo a una sección.

En diapositivas cuyo contenido no entra en pantalla (típico en celulares),
el contenido se desplaza primero y recién al llegar al borde cambia de diapositiva.

---

## 4 · Detalles de diseño

- **Paleta tomada del PDF original**: navy `#1E3A5F`, azul `#1178A0`,
  tinta `#1D1D1B`, papel `#F6F8FA`.
- **Tipografías**: Playfair Display (títulos) e Inter (texto), con alternativas
  del sistema si Google Fonts no está disponible.
- **Dos temas**: claro (por defecto, sigue la preferencia del sistema) y oscuro.
  La elección queda guardada en el navegador.
- **Animaciones**: transiciones entre diapositivas con desenfoque y
  desplazamiento, y aparición escalonada de cada elemento. Todo con
  `transform`/`opacity` para que sea fluido también en celulares.
- **Accesibilidad**: respeta `prefers-reduced-motion`, navegación completa por
  teclado, foco visible y etiquetas ARIA.
- **Impresión**: `Ctrl/Cmd + P` exporta la presentación a PDF, una diapositiva
  por página.

---

## 5 · Estructura

```
index.html
assets/
  css/styles.css     tokens de marca, layout, fondo, controles, transiciones
  css/slides.css     estilos de cada tipo de diapositiva
  js/content.js      ← TEXTOS Y DATOS (lo único que hay que editar)
  js/icons.js        set de íconos SVG
  js/render.js       arma el HTML de cada diapositiva
  js/app.js          motor: navegación, gestos, teclado, tema, índice
.github/workflows/deploy.yml
```

## 6 · Verlo en local

No necesita servidor: alcanza con abrir `index.html` en el navegador.
Si preferís servirlo:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

# Franco Martínez · Estudio Jurídico — Carta de presentación web

Versión web, interactiva y responsive de la carta de presentación de
**Franco Agustín Martínez Pisani**, abogado — gestión de siniestros junto a
productores asesores de seguros.

Sitio estático, sin dependencias ni compilación: se publica tal cual en GitHub Pages.

---

## 1 · Publicación

GitHub Pages ya está activo. Cada `push` a `main` publica el sitio
automáticamente (workflow: `.github/workflows/deploy.yml`); también se puede
lanzar a mano desde **Actions → Publicar en GitHub Pages → Run workflow**.

La URL es `https://zeroframe404.github.io/PresentacionDeFranco/`.

> El archivo `.nojekyll` está incluido para que Jekyll no interfiera con la
> carpeta `assets/`.

### El PDF descargable

El botón **PDF** de la barra superior descarga
`carta-presentacion-franco-martinez.pdf`: una diapositiva por página, en A4
apaisado y en tema claro. **No hay que mantenerlo a mano**: lo genera el
propio workflow en cada publicación, abriendo el sitio con Chromium y
aplicando el CSS de impresión, así que siempre coincide con lo que está
publicado. Por eso el archivo está en `.gitignore` y no se versiona.

Para generarlo en local:

```bash
npm install --no-save playwright
npx playwright install chromium
node tools/build-pdf.mjs            # o: node tools/build-pdf.mjs otro-nombre.pdf
```

Si el PDF no está disponible (por ejemplo al abrir `index.html` directamente
desde el disco), el botón abre el diálogo de impresión, que también permite
guardar en PDF. El atajo de teclado es <kbd>D</kbd>.

---

## 2 · Editar el contenido

**Todo el texto vive en un solo archivo:** [`assets/js/content.js`](assets/js/content.js).
No hace falta tocar HTML ni CSS.

### Los datos de contacto

Están en el bloque `fields` de la última diapositiva:

```js
fields: [
  { icon: 'phone', label: 'Teléfono', value: '9 11 3827-7402',
    href: 'tel:+5491138277402' },

  { icon: 'mail',  label: 'Correo',   value: 'F.martinezpisani@gmail.com',
    href: 'mailto:F.martinezpisani@gmail.com' },

  { icon: 'badge', label: 'Matrícula', href: null, values: [
      { tag: 'CABA',      text: 'Tomo 157 · Folio 514' },
      { tag: 'Provincia', text: 'Tomo XXX · Folio 180' }
  ]}
]
```

- `value` es una sola línea; `values` son varias, cada una con su etiqueta.
- `href` es el enlace: `tel:`, `mailto:` o `https://wa.me/54911...`.
  Dejalo en `null` si el dato no es un enlace (por ejemplo la matrícula).
- Cualquier valor que contenga `[completar]` o `XXX` se muestra en gris y en
  cursiva, y la tarjeta deja de ser clickeable. Es el caso del tomo de la
  matrícula de Provincia, que todavía está pendiente.

**Para sumar WhatsApp**, agregá otro campo:

```js
{ icon: 'whatsapp', label: 'WhatsApp', value: '9 11 3827-7402',
  href: 'https://wa.me/5491138277402' }
```

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
| Descargar en PDF | `D` | botón PDF |
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
  por página, igual que el botón de descarga. En papel el numeral grande de
  sección se convierte en un folio discreto al pie y se ocultan los botones de
  navegación.

---

## 5 · Estructura

```
index.html
assets/
  css/styles.css     tokens de marca, layout, fondo, controles, impresión
  css/slides.css     estilos de cada tipo de diapositiva
  js/content.js      ← TEXTOS Y DATOS (lo único que hay que editar)
  js/icons.js        set de íconos SVG
  js/render.js       arma el HTML de cada diapositiva
  js/app.js          motor: navegación, gestos, teclado, tema, índice, PDF
tools/build-pdf.mjs  genera el PDF descargable desde el propio sitio
.github/workflows/deploy.yml
```

## 6 · Verlo en local

No necesita servidor: alcanza con abrir `index.html` en el navegador.
Si preferís servirlo:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

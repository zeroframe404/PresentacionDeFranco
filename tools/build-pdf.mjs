/* ===============================================================
   Genera el PDF descargable a partir del propio sitio.
   Usa Chromium con el CSS de impresión: una diapositiva por página,
   apaisada, con los fondos de marca.

     node tools/build-pdf.mjs [archivo-de-salida.pdf]
   =============================================================== */
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { statSync } from 'node:fs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT  = resolve(ROOT, process.argv[2] || 'carta-presentacion-franco-martinez.pdf');

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined
});

try {
  const page = await browser.newPage({ viewport: { width: 1123, height: 794 } });
  const problems = [];
  page.on('pageerror', (e) => problems.push(e.message));

  await page.goto(pathToFileURL(resolve(ROOT, 'index.html')).href, { waitUntil: 'load' });

  /* El PDF va a papel: tema claro y sin animaciones pendientes. */
  await page.emulateMedia({ colorScheme: 'light' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));

  /* Esperamos a que el deck esté armado y las tipografías cargadas. */
  await page.waitForFunction(() => document.querySelectorAll('.slide').length > 0);
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(600);

  const slides = await page.evaluate(() => document.querySelectorAll('.slide').length);
  if (problems.length) throw new Error('Errores en la página:\n' + problems.join('\n'));

  await page.pdf({
    path: OUT,
    width: '297mm',
    height: '210mm',
    landscape: false,          // el tamaño ya es apaisado
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  const kb = Math.round(statSync(OUT).size / 1024);
  console.log(`PDF generado: ${OUT} — ${slides} diapositivas, ${kb} kB`);
} finally {
  await browser.close();
}

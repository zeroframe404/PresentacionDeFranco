/* =============================================================
   ICONOS — SVG inline, sin dependencias externas
   ============================================================= */
(function (global) {
  'use strict';

  const svg = (p) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

  const ICONS = {
    /* — interfaz — */
    arrowLeft:   svg('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
    arrowRight:  svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    arrowDown:   svg('<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>'),
    close:       svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
    menu:        svg('<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h10"/>'),
    expand:      svg('<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>'),
    collapse:    svg('<path d="M3 8h3a2 2 0 0 0 2-2V3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/>'),
    moon:        svg('<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>'),
    sun:         svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'),

    /* — contenido — */
    handshake:   svg('<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2"/><path d="m14 15 2.5 2.5a1.4 1.4 0 0 0 2-2L14 11"/><path d="M3 11V7a1 1 0 0 1 1-1h3.5L11 9"/><path d="M13 6h3.8a1 1 0 0 1 .8.4L21 11"/><path d="M3 11h2.5l3.2 3.2a1.5 1.5 0 0 0 2.1-2.1L9 10.4"/>'),
    scale:       svg('<path d="M12 3v18"/><path d="M7 21h10"/><path d="M5 7h14"/><path d="M8 7 5 14h6Z"/><path d="M16 7l-3 7h6Z"/>'),
    wallet:      svg('<path d="M3 8a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><path d="M3 8v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M21 10h-4.5a2.5 2.5 0 0 0 0 5H21Z"/>'),
    clock:       svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>'),
    shield:      svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>'),
    check:       svg('<path d="M20 6 9 17l-5-5"/>'),
    doc:         svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>'),
    gavel:       svg('<path d="m14 12-7 7"/><path d="m5 17 2 2"/><path d="m16.5 3.5 4 4"/><path d="m13.5 6.5 4 4"/><path d="m18.5 5.5-6 6"/><path d="M4 21h8"/>'),
    phone:       svg('<path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z"/>'),
    mail:        svg('<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 7 7.7 5.2a1.5 1.5 0 0 0 1.6 0L20.5 7"/>'),
    badge:       svg('<path d="M12 2 4 5v6c0 5 3.4 9.3 8 11 4.6-1.7 8-6 8-11V5Z"/><circle cx="12" cy="10" r="2.4"/><path d="M8.5 16.5a4 4 0 0 1 7 0"/>'),
    whatsapp:    svg('<path d="M3 21l1.6-4.4A8.5 8.5 0 1 1 8 20.2Z"/><path d="M8.6 9.2c.2 1 .8 2 1.6 2.8.8.8 1.8 1.4 2.8 1.6l.9-1.2 2 .9v1.6c-1.7.4-3.9-.5-5.6-2.2S8 8.9 8.4 7.2H10l.9 2Z"/>'),
    pin:         svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>')
  };

  ICONS.get = (n) => ICONS[n] || ICONS.check;
  global.ICONS = ICONS;
})(window);

/* ===============================================================
   CONTENIDO DE LA PRESENTACIÓN
   ---------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR PARA CAMBIAR
      TEXTOS Y DATOS DE CONTACTO. El diseño se adapta solo.

   Los textos provienen de la carta de presentación original (PDF),
   con la redacción llevada a un registro jurídico y formal.
   Cualquier dato que quede como "[completar]" o con "XXX" se muestra
   en gris y en cursiva, para que se note que falta cargarlo.
   =============================================================== */

const DECK = {

  /* ── Datos de marca ─────────────────────────────────────────── */
  meta: {
    monogram:   'FM',
    studio:     'Franco Martínez',
    studioSub:  'Estudio Jurídico',
    person:     'Franco Agustín Martínez Pisani',
    role:       'Abogado',
    tagline:    'Gestión de siniestros junto a productores asesores de seguros.',
    docTitle:   'Franco Martínez · Estudio Jurídico — Carta de presentación'
  },

  /* ── Diapositivas ───────────────────────────────────────────── */
  slides: [

    /* ── Portada ─────────────────────────────────────────────── */
    {
      id: 'inicio',
      nav: 'Portada',
      type: 'cover',
      eyebrow: 'Carta de presentación',
      /* Sin "name": la marca FM · Franco Martínez identifica la
         portada y la bajada pasa a ser el titular. */
      tagline: 'Gestión de siniestros junto a productores asesores de seguros.',
      role: 'Abogado',
      cta:      { label: 'Ver presentación', target: 1 },
      ctaGhost: { label: 'Contacto',         target: 'contacto' }
    },

    /* ── 01 · Quién soy ──────────────────────────────────────── */
    {
      id: 'quien-soy',
      nav: 'Quién soy',
      type: 'statement',
      num: '01',
      kicker: 'Carta de presentación',
      title: 'Soy abogado y trabajo junto a productores asesores de seguros en la gestión de los siniestros de sus clientes.',
      text: 'Mi forma de trabajo es directa, con reglas claras desde el inicio y orientada a que el cliente perciba su indemnización a la mayor brevedad posible.',
      tone: 'dark'
    },

    /* ── 02 · Metodología de trabajo ─────────────────────────── */
    {
      id: 'como-trabajo',
      nav: 'Metodología',
      type: 'process',
      num: '02',
      kicker: 'Carta de presentación',
      title: 'Metodología de trabajo',
      steps: [
        { title: 'Contacto con el productor',   text: 'El productor trata directamente conmigo, de principio a fin.' },
        { title: 'Derivación de siniestros',    text: 'El productor me deriva los siniestros de sus clientes.' },
        { title: 'Análisis de viabilidad',      text: 'Examino cada caso y evalúo su viabilidad antes de avanzar.' },
        { title: 'Gestión del reclamo',         text: 'Impulso el reclamo ante la aseguradora para que el cliente perciba su indemnización.' },
        { title: 'Comunicación con el cliente', text: 'Mantengo informados al productor y a su cliente sobre el estado del reclamo en cada etapa del proceso.' }
      ]
    },

    /* ── 03 · Honorarios ─────────────────────────────────────── */
    {
      id: 'honorarios',
      nav: 'Honorarios',
      type: 'pillars',
      num: '03',
      kicker: 'Carta de presentación',
      title: 'Honorarios claros, convenidos de antemano',
      lead: 'Las condiciones quedan convenidas con el productor antes de asumir el primer caso y dependen del tipo de siniestro.',
      items: [
        {
          title: 'Sin monto mínimo para reclamar',
          text: 'No exijo una cuantía mínima: todo siniestro derivado se analiza, cualquiera sea el monto del reclamo.'
        },
        {
          title: 'Con lesiones: cargo fijo del 20 %',
          text: 'En los siniestros con lesiones, el cargo al cliente es siempre del veinte por ciento: diez por ciento corresponde al productor y diez por ciento a mis honorarios profesionales.'
        },
        {
          title: 'Sin lesiones: lo determina el productor',
          text: 'En los siniestros sin lesiones —únicamente daños materiales—, el porcentaje a cargo del cliente lo determina el productor y le corresponde íntegramente.'
        }
      ]
    },

    /* ── 04 · Vía extrajudicial ──────────────────────────────── */
    {
      id: 'via-extrajudicial',
      nav: 'Vía extrajudicial',
      type: 'path',
      num: '04',
      kicker: 'Carta de presentación',
      title: 'Primero, la vía extrajudicial',
      text: 'Priorizo la resolución en instancias extrajudiciales: reclamos directos ante las compañías aseguradoras y mediación. Acudo a la vía judicial cuando resulta necesario, aunque no constituye mi primera opción ni el camino de todos los casos. El objetivo es arribar a una resolución en el menor tiempo posible, de modo que el cliente perciba lo que le corresponde y quede conforme.',
      tone: 'dark',
      stages: [
        { label: 'Reclamo directo', note: 'Presentación ante la compañía aseguradora', state: 'first'  },
        { label: 'Mediación',       note: 'Instancia previa a la vía judicial',        state: 'second' },
        { label: 'Vía judicial',    note: 'Únicamente cuando resulta necesario',       state: 'last'   }
      ]
    },

    /* ── En resumen ──────────────────────────────────────────── */
    {
      id: 'en-resumen',
      nav: 'En resumen',
      type: 'summary',
      kicker: 'En resumen',
      title: 'Qué puede esperar de este trabajo en conjunto',
      items: [
        { icon: 'handshake', title: 'Trato directo',                            text: 'La comunicación es siempre conmigo, de principio a fin.' },
        { icon: 'scale',     title: 'Reglas claras desde el inicio',            text: 'El porcentaje y las condiciones quedan pactados antes de iniciar la gestión.' },
        { icon: 'wallet',    title: 'Honorarios según el tipo de siniestro',    text: 'Con lesiones, cargo fijo del 20 % —10 % para el productor y 10 % de honorarios—; sin lesiones, lo determina el productor.' },
        { icon: 'clock',     title: 'Percepción oportuna de la indemnización',  text: 'Priorizo la vía extrajudicial para que el cliente perciba lo que le corresponde en el menor tiempo posible.' }
      ]
    },

    /* ── Contacto ────────────────────────────────────────────── */
    {
      id: 'contacto',
      nav: 'Contacto',
      type: 'contact',
      kicker: 'Contacto',
      /* Sin "name" ni "role": la marca y la firma al pie ya
         identifican al profesional. */
      tagline: 'Gestión de siniestros junto a productores asesores de seguros.',

      /* Datos de contacto.
         - value  : una sola línea de texto
         - values : varias líneas, cada una con etiqueta (tag) y texto
         - href   : el enlace (tel:… / mailto:… / https://wa.me/…)
                    Dejalo en null si el dato no es un enlace.      */
      fields: [
        {
          icon: 'phone', label: 'Teléfono',
          value: '9 11 3827-7402',
          href: 'tel:+5491138277402'
        },
        {
          icon: 'mail', label: 'Correo',
          value: 'F.martinezpisani@gmail.com',
          href: 'mailto:F.martinezpisani@gmail.com'
        },
        {
          icon: 'badge', label: 'Matrícula',
          values: [
            { tag: 'CABA',      text: 'Tomo 157 · Folio 514' },
            { tag: 'Provincia', text: 'Tomo XXX · Folio 180' }
          ],
          href: null
        }
      ],
      closing: 'Gracias por su tiempo.'
    }
  ]
};

window.DECK = DECK;

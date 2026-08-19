/* ===============================================================
   CONTENIDO DE LA PRESENTACIÓN
   ---------------------------------------------------------------
   👉 ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR PARA CAMBIAR
      TEXTOS Y DATOS DE CONTACTO. El diseño se adapta solo.

   Los textos provienen de la carta de presentación original (PDF).
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
      name: 'Franco Agustín<br>Martínez Pisani',
      role: 'Abogado',
      tagline: 'Gestión de siniestros junto a productores asesores de seguros.',
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
      text: 'Mi forma de trabajo es directa, con reglas claras desde el inicio y orientada a que el cliente cobre lo antes posible.',
      tone: 'dark'
    },

    /* ── 02 · Cómo trabajo ───────────────────────────────────── */
    {
      id: 'como-trabajo',
      nav: 'Cómo trabajo',
      type: 'process',
      num: '02',
      kicker: 'Carta de presentación',
      title: 'Cómo trabajo',
      steps: [
        { title: 'Contacto con el productor', text: 'El trato es directo conmigo, de principio a fin.' },
        { title: 'Derivación de siniestros',  text: 'El productor me pasa los siniestros de sus clientes.' },
        { title: 'Análisis de viabilidad',    text: 'Reviso cada caso y evalúo si es viable antes de avanzar.' },
        { title: 'Gestión del reclamo',       text: 'Impulso el reclamo para que el cliente cobre lo antes posible.' }
      ]
    },

    /* ── 03 · Honorarios ─────────────────────────────────────── */
    {
      id: 'honorarios',
      nav: 'Honorarios',
      type: 'pillars',
      num: '03',
      kicker: 'Carta de presentación',
      title: 'Honorarios claros, acordados de antemano',
      lead: 'Antes de tomar el primer caso acuerdo con el productor qué porcentaje se le cobra al cliente: diez por ciento, veinte por ciento o ninguno, si así lo prefiere.',
      items: [
        {
          title: 'El porcentaje lo define el productor',
          text: '10 %, 20 % o ningún cargo al cliente: la condición queda pactada antes de empezar.'
        },
        {
          title: 'Ese importe es del productor',
          text: 'Lo que se le cobra al cliente se lo pago íntegramente al productor. No me quedo con esa plata.'
        },
        {
          title: 'Mi honorario lo paga la aseguradora',
          text: 'Mi ingreso proviene exclusivamente de lo que la compañía me abona en forma directa.'
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
      text: 'Priorizo resolver en instancias extrajudiciales: reclamos directos ante las compañías y mediación. Llevo casos a juicio cuando es necesario, pero no es mi primera opción ni el camino de todos los casos. El objetivo es resolver lo más rápido posible, para que el cliente cobre y quede conforme.',
      tone: 'dark',
      stages: [
        { label: 'Reclamo directo', note: 'Ante la compañía aseguradora', state: 'first'  },
        { label: 'Mediación',       note: 'Instancia previa al juicio',    state: 'second' },
        { label: 'Juicio',          note: 'Solo cuando es necesario',      state: 'last'   }
      ]
    },

    /* ── En resumen ──────────────────────────────────────────── */
    {
      id: 'en-resumen',
      nav: 'En resumen',
      type: 'summary',
      kicker: 'En resumen',
      title: 'Qué podés esperar de este trabajo en conjunto',
      items: [
        { icon: 'handshake', title: 'Trato directo',                  text: 'Hablás siempre conmigo, de principio a fin.' },
        { icon: 'scale',     title: 'Reglas claras desde el inicio',  text: 'El porcentaje y las condiciones quedan pactados antes de empezar.' },
        { icon: 'wallet',    title: 'El cargo al cliente es tuyo',    text: 'Lo que se le cobra al cliente se lo pago íntegramente al productor.' },
        { icon: 'clock',     title: 'Foco en que el cliente cobre',   text: 'Priorizo la vía extrajudicial para resolver lo antes posible.' }
      ]
    },

    /* ── Contacto ────────────────────────────────────────────── */
    {
      id: 'contacto',
      nav: 'Contacto',
      type: 'contact',
      kicker: 'Contacto',
      name: 'Franco Agustín Martínez Pisani',
      role: 'Abogado',
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

/* ===============================================================
   RENDER — construye el DOM de cada diapositiva desde DECK
   =============================================================== */
(function (global) {
  'use strict';

  const I = global.ICONS;

  const esc = (s = '') => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const strip = (s = '') => String(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  /* Atributos de animación con índice incremental (stagger) */
  function animator() {
    let n = 0;
    return (kind) => ` data-anim="${kind || 'up'}" style="--i:${n++}"`;
  }

  /* Marca “FM | Franco Martínez / Estudio Jurídico” */
  function lockup(meta, cls) {
    return `<div class="lockup ${cls || ''}">
      <span class="lockup__mono">${esc(meta.monogram)}</span>
      <span class="lockup__rule"></span>
      <span class="lockup__txt">
        <b>${esc(meta.studio)}</b>
        <small>${esc(meta.studioSub)}</small>
      </span>
    </div>`;
  }

  /* Encabezado estándar: kicker + título + bajada */
  function head(s, a) {
    let h = `<header class="head">`;
    if (s.kicker) h += `<span class="kicker"${a('fade')}>${esc(s.kicker)}</span>`;
    if (s.title)  h += `<h2 class="t-xl"${a()}>${s.title}</h2>`;
    h += `<span class="rule"${a('rule')}></span>`;
    if (s.lead)   h += `<p class="lead"${a()}>${esc(s.lead)}</p>`;
    return h + `</header>`;
  }

  /* ══════════════ Plantillas ═══════════════════════════════ */
  const T = {

    /* ── Portada ─────────────────────────────────────────── */
    cover(s, a, meta) {
      return `
        <div class="cover">
          <div class="cover__text">
            ${lockup(meta, 'lockup--lg')}
            <span class="kicker kicker--accent"${a('fade')}>${esc(s.eyebrow)}</span>
            <h1 class="t-hero"${a()}>${s.name}</h1>
            <span class="rule rule--thick"${a('rule')}></span>
            <p class="cover__tagline"${a()}>${esc(s.tagline)}</p>
            <span class="cover__role"${a('fade')}>${esc(s.role)}</span>
            <div class="cover__cta"${a()}>
              ${s.cta ? `<button class="btn" type="button" data-goto="${esc(s.cta.target)}">${esc(s.cta.label)}${I.arrowRight}</button>` : ''}
              ${s.ctaGhost ? `<button class="btn btn--line" type="button" data-goto="${esc(s.ctaGhost.target)}">${esc(s.ctaGhost.label)}</button>` : ''}
            </div>
          </div>

          <div class="cover__art" aria-hidden="true">
            <span class="shape shape--navy"><b class="shape__ghost">${esc(meta.monogram)}</b></span>
            <span class="shape shape--teal"></span>
            <span class="shape shape--ink"></span>
            <span class="shape__label">${esc(meta.studioSub)}</span>
          </div>
        </div>`;
    },

    /* ── Declaración a página completa ───────────────────── */
    statement(s, a) {
      return `
        <div class="statement">
          <div class="statement__main">
            ${s.kicker ? `<span class="kicker"${a('fade')}>${esc(s.kicker)}</span>` : ''}
            <span class="rule rule--thick"${a('rule')}></span>
            <h2 class="t-lede"${a()}>${esc(s.title)}</h2>
          </div>
          ${s.text ? `<aside class="statement__side"${a('right')}>
            <p class="lead lead--lg">${esc(s.text)}</p>
          </aside>` : ''}
        </div>`;
    },

    /* ── Proceso en pasos ────────────────────────────────── */
    process(s, a) {
      return head(s, a) + `<ol class="steps">` + (s.steps || []).map((st, i) => `
        <li class="step"${a('scale')}>
          <span class="step__num">${String(i + 1).padStart(2, '0')}</span>
          <h3>${esc(st.title)}</h3>
          <p>${esc(st.text)}</p>
          <span class="step__line" aria-hidden="true"></span>
        </li>`).join('') + `</ol>`;
    },

    /* ── Pilares (tarjetas con cabecera navy) ────────────── */
    pillars(s, a) {
      return head(s, a) + `<div class="pillars">` + (s.items || []).map((p, i) => `
        <article class="pillar"${a('scale')}>
          <div class="pillar__top">
            <span class="pillar__idx">${String(i + 1).padStart(2, '0')}</span>
            <h3>${esc(p.title)}</h3>
          </div>
          <div class="pillar__body"><p>${esc(p.text)}</p></div>
        </article>`).join('') + `</div>`;
    },

    /* ── Recorrido / escalonamiento ──────────────────────── */
    path(s, a) {
      let h = `<div class="pathwrap">
        <div class="pathwrap__text">
          ${s.kicker ? `<span class="kicker"${a('fade')}>${esc(s.kicker)}</span>` : ''}
          <h2 class="t-xl"${a()}>${esc(s.title)}</h2>
          <span class="rule rule--thick"${a('rule')}></span>
          ${s.text ? `<p class="lead"${a()}>${esc(s.text)}</p>` : ''}
        </div>`;

      if (s.stages && s.stages.length) {
        h += `<ol class="stages">` + s.stages.map((st, i) => `
          <li class="stage stage--${esc(st.state || 'first')}"${a('right')}>
            <span class="stage__dot"><i>${i + 1}</i></span>
            <div class="stage__txt">
              <b>${esc(st.label)}</b>
              <small>${esc(st.note)}</small>
            </div>
          </li>`).join('') + `</ol>`;
      }
      return h + `</div>`;
    },

    /* ── Resumen en cuatro puntos ────────────────────────── */
    summary(s, a) {
      return head(s, a) + `<div class="sums">` + (s.items || []).map((p) => `
        <article class="sum"${a('scale')}>
          <span class="sum__ico">${I.get(p.icon)}</span>
          <div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>
        </article>`).join('') + `</div>`;
    },

    /* ── Contacto ────────────────────────────────────────── */
    contact(s, a, meta) {
      const field = (f) => {
        const pending = /\[completar\]/i.test(f.value || '');
        const inner = `
          <span class="field__ico">${I.get(f.icon)}</span>
          <span class="field__txt">
            <small>${esc(f.label)}</small>
            <b class="${pending ? 'is-pending' : ''}">${esc(f.value)}</b>
          </span>`;
        return f.href && !pending
          ? `<a class="field" href="${esc(f.href)}" target="_blank" rel="noopener"${a('scale')}>${inner}</a>`
          : `<div class="field"${a('scale')}>${inner}</div>`;
      };

      return `
        <div class="contact">
          ${lockup(meta, 'lockup--lg')}
          <span class="kicker kicker--accent"${a('fade')}>${esc(s.kicker)}</span>
          <h2 class="t-xl"${a()}>${esc(s.name)}</h2>
          <span class="contact__role"${a('fade')}>${esc(s.role)}</span>
          <span class="rule rule--thick"${a('rule')}></span>
          <div class="fields">${(s.fields || []).map(field).join('')}</div>
          <p class="contact__tagline"${a()}>${esc(s.tagline)}</p>
          ${s.closing ? `<p class="contact__closing"${a('fade')}>${esc(s.closing)}</p>` : ''}
        </div>`;
    }
  };

  /* ══════════════ Montaje ══════════════════════════════════ */
  function build(deck, mount) {
    const meta = deck.meta || {};
    const frag = document.createDocumentFragment();
    const total = deck.slides.length;

    deck.slides.forEach((s, i) => {
      const type = T[s.type] ? s.type : 'statement';
      const section = document.createElement('section');

      section.className = `slide s-${type}` + (s.tone === 'dark' ? ' is-dark' : '');
      section.id = `slide-${s.id || i + 1}`;
      section.dataset.state = 'idle';
      section.dataset.index = i;
      section.setAttribute('aria-roledescription', 'diapositiva');
      section.setAttribute('aria-label', `${i + 1} de ${total}: ${strip(s.nav || s.title || s.name)}`);

      /* Numeral fantasma de sección */
      if (s.num) {
        const n = document.createElement('span');
        n.className = 'slide__num';
        n.setAttribute('aria-hidden', 'true');
        n.textContent = s.num;
        section.appendChild(n);
      }

      const inner = document.createElement('div');
      inner.className = 'slide__inner';
      inner.innerHTML = T[type](s, animator(), meta);
      section.appendChild(inner);

      /* Firma al pie (igual que en la carta original) */
      if (i > 0) {
        const sign = document.createElement('span');
        sign.className = 'slide__sign';
        sign.setAttribute('aria-hidden', 'true');
        sign.textContent = `${meta.person} · ${meta.role}`;
        section.appendChild(sign);
      }

      frag.appendChild(section);
    });

    mount.innerHTML = '';
    mount.appendChild(frag);
    return Array.from(mount.querySelectorAll('.slide'));
  }

  global.Render = { build, esc, lockup };
})(window);

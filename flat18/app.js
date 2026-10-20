/* FLAT18 — hash router (bare tokens: #menu, #menu-drinks, #cakes …), day/night mode by Malaysia time, menu page. */
(function () {
  const F = window.FLAT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const app = $('#app');
  const photo = p => `assets/photos/${p}.jpg`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = p => (typeof p === 'number' ? p.toFixed(1) : p);

  /* ---------- clock (Malaysia is UTC+8, no DST) ---------- */
  function myt() {
    const d = new Date(Date.now() + 8 * 3600e3);
    return { h: d.getUTCHours(), m: d.getUTCMinutes(), dec: d.getUTCHours() + d.getUTCMinutes() / 60 };
  }
  function status() {
    const { dec } = myt(), H = F.hours;
    if (dec < H.open) return { open: false, text: 'Closed now · opens 9am', meal: 'night' };
    if (dec >= H.close) return { open: false, text: 'Closed now · opens 9am tomorrow', meal: 'night' };
    if (dec < H.brunchEnd) return { open: true, text: 'Open now · brunch until 5pm', meal: 'day' };
    return { open: true, text: 'Open now · dinner specials until 10pm', meal: 'night' };
  }

  /* ---------- day / night ---------- */
  const KEY = 'flat18-mode';
  function storedMode() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (v && Date.now() - v.t < 6 * 3600e3) return v.mode; // a manual pick lasts 6 hours, then the clock takes over
    } catch (e) {}
    return null;
  }
  function setMode(mode, remember) {
    document.documentElement.dataset.mode = mode;
    $('#mode-txt').textContent = mode === 'night' ? 'Night' : 'Day';
    $('#mode-btn').setAttribute('aria-pressed', mode === 'night');
    $$('.hero-photo img').forEach(i => i.classList.toggle('off', i.dataset.mode !== mode));
    const cap = $('.hero-photo figcaption');
    const on = $(`.hero-photo img[data-mode="${mode}"]`);
    if (cap && on) cap.textContent = on.alt;
    if (remember) try { localStorage.setItem(KEY, JSON.stringify({ mode, t: Date.now() })); } catch (e) {}
  }
  $('#mode-btn').addEventListener('click', () => setMode(document.documentElement.dataset.mode === 'night' ? 'day' : 'night', true));

  /* ---------- tumbling headings, like the printed menu ---------- */
  function wob(text, cls = '') {
    const words = text.split(' ');
    return `<p class="wob ${cls}" aria-label="${esc(text)}">${words.map((w, i) => {
      const r = [-3, 2.5, -1.5, 3.5, -2.5, 1.5][i % 6], y = [2, -4, 3, -2, 4, -3][i % 6];
      return `<span aria-hidden="true" style="--r:${r}deg;--y:${y}px">${esc(w)}</span>`;
    }).join('')}</p>`;
  }

  /* ---------- shared bits ---------- */
  const find = name => { for (const s of F.menu) for (const g of s.groups) for (const it of g.items) if (it.n === name) return { ...it, sec: s.id, group: g.head }; };
  const L = F.links;

  /* ---------- home ---------- */
  function home() {
    const st = status();
    const brunch = ['FLAT18 Big Breakfast', 'Salmon and Avocado Eggs Benedict', 'Turkish Eggs', 'Cluck Cluck'].map(find);
    const dinner = ['Signature Double Cheeseburger', 'Grilled Aussie Lamb Chops', 'Miso Smoked Duck Pasta'].map(find);
    const classics = ['Salt Beef Sandwich', 'Smoked Duck & Pineapple Salsa in Zaalouk Sauce', 'Prawn Toast', 'Squid Ink Pasta', 'Herb Crusted Seabass', 'Tuna Melt Sandwich', 'Steak and Eggs'].map(find);
    const cups = [['Rose Latte', 'Rose-infused, a torched marshmallow on top'], ['Coconut Coffee', 'Coffee cream over coconut water'], ['Black Sunrise', 'A layered iced coffee, sunrise colours'], ['Lemon Mousse Long Black', 'Cold brew, sun-dried orange, lemon mousse']]
      .map(([n, line]) => ({ ...find(n), line }));
    const words = [['A', 2, 6, -4], ['hug', 9, 20, 5], ['for your', 40, 3, 3], ['tastebuds', 63, 18, -5], ['bringing', 58, 56, 5], ['classics', 76, 70, -4], ['back', 72, 88, 7]];

    return `
<section class="hero">
  <div class="wrap hero-in">
    <div>
      <div class="hero-words" aria-label="A hug for your tastebuds. Bringing classics back.">
        ${words.map(([w, x, y, r], i) => `<span class="w" aria-hidden="true" style="--x:${x};top:${y}%;rotate:${r}deg;animation-delay:${.08 * i + .1}s">${w}</span>`).join('')}
      </div>
      <h1 class="hero-mark">F<i>LA</i>T<sup>18</sup></h1>
    </div>
    <div class="hero-side">
      <figure class="hero-photo">
        <img data-mode="day" src="${photo('food/turkish-eggs')}" alt="Turkish Eggs, on the brunch menu" fetchpriority="high">
        <img data-mode="night" class="off" src="${photo('food/steak-and-eggs')}" alt="Steak and Eggs, Black Angus striploin" fetchpriority="high">
        <figcaption class="glass"></figcaption>
      </figure>
      <span class="now-pill ${st.open ? '' : 'closed'}"><b></b>${st.text}</span>
      <p style="margin:0;max-width:40ch;opacity:.9">All-day brunch, sourdough sandwiches and pasta in a glass-walled room in Mutiara Damansara. Dinner specials from 5pm.</p>
      <div class="hero-cta">
        <a class="btn btn-butter" href="#menu">See the full menu</a>
        <a class="btn btn-ghost-light" href="${L.reserve.wa}" target="_blank" rel="noopener">Book a table on WhatsApp</a>
      </div>
    </div>
  </div>
</section>

<section class="story" id="story" aria-label="A day at FLAT18, from 9am to 10pm">
  <div class="story-pin">
    <div class="story-sky" aria-hidden="true"></div>
    <div class="wrap story-grid">
      <div class="story-media">
        <img class="sm-day" src="${photo('food/french-toast-banana-split')}" alt="" width="1200" height="1200" loading="lazy">
        <img class="sm-night" src="${photo('food/miso-smoked-duck-pasta')}" alt="" width="601" height="793" loading="lazy">
      </div>
      <div class="story-copy">
        <div class="sp sp-day">
          ${st.meal === 'day' && st.open ? '<span class="sp-now">Serving now</span>' : ''}
          ${wob('By day', 'eyebrow')}
          <h2>Brunch, slow and sunny</h2>
          <p class="dn-time">9am – 5pm, plus the all-day menu</p>
          <ul class="dn-list">${brunch.map(d => `<li><span>${esc(d.n)}</span><span>RM ${money(d.p)}</span></li>`).join('')}</ul>
          <a class="btn btn-line" href="#menu-hearty">See brunch, 9am – 5pm</a>
        </div>
        <div class="sp sp-night">
          ${st.meal === 'night' && st.open ? '<span class="sp-now">Serving now</span>' : ''}
          ${wob('After five', 'eyebrow')}
          <h2>Dinner, lights down</h2>
          <p class="dn-time">5pm – 10pm, three dinner-only plates</p>
          <ul class="dn-list">${dinner.map(d => `<li><span>${esc(d.n)}</span><span>RM ${money(d.p)}</span></li>`).join('')}</ul>
          <a class="btn btn-line" href="#menu-night">See dinner, from 5pm</a>
        </div>
      </div>
    </div>
    <div class="wrap" aria-hidden="true"><div class="story-time">
      <svg class="sun-arc" viewBox="0 0 1000 120" preserveAspectRatio="none">
        <path class="arc-base" d="M0,110 Q500,-70 1000,110" pathLength="1"/>
        <path class="arc-draw" d="M0,110 Q500,-70 1000,110" pathLength="1"/>
      </svg>
      <span class="sun" id="sun"></span>
      <div class="story-ticks">${[[9, '9am'], [12, '12pm'], [17, '5pm'], [22, '10pm']].map(([h, t]) => `<span style="left:${((h - 9) / 13) * 100}%">${t}</span>`).join('')}</div>
      <p class="story-clock" id="story-clock">9:00am</p>
    </div></div>
  </div>
</section>

<section class="dn" aria-label="Day and night at FLAT18">
  <div class="dn-half dn-day ${st.meal === 'day' && st.open ? 'is-now' : ''}">
    <span class="dn-now">Serving now</span>
    ${wob('By day', 'eyebrow')}
    <h2>Brunch, slow and sunny</h2>
    <p class="dn-time">9am – 5pm, plus the all-day menu</p>
    <div class="dn-photo"><img src="${photo('food/french-toast-banana-split')}" alt="French Toast Banana Split" loading="lazy"></div>
    <ul class="dn-list">${brunch.map(d => `<li><span>${esc(d.n)}</span><span>RM ${money(d.p)}</span></li>`).join('')}</ul>
    <div><a class="btn btn-line" href="#menu-hearty">See brunch, 9am – 5pm</a></div>
  </div>
  <div class="dn-half dn-night ${st.meal === 'night' && st.open ? 'is-now' : ''}">
    <span class="dn-now">Serving now</span>
    ${wob('After five', 'eyebrow')}
    <h2>Dinner, lights down</h2>
    <p class="dn-time">5pm – 10pm, three dinner-only plates</p>
    <div class="dn-photo"><img src="${photo('food/miso-smoked-duck-pasta')}" alt="Miso Smoked Duck Pasta" loading="lazy"></div>
    <ul class="dn-list">${dinner.map(d => `<li><span>${esc(d.n)}</span><span>RM ${money(d.p)}</span></li>`).join('')}</ul>
    <div><a class="btn btn-line" href="#menu-night">See dinner, from 5pm</a></div>
  </div>
</section>

<section class="sec" id="classics">
  <div class="wrap">
    <div class="sec-head">
      <div>${wob('The menu', 'eyebrow')}<h2>Classics, brought back</h2></div>
      <p>Sourdough sandwiches, proper pasta and plates you already know, each with one twist: kombu butter, zaalouk, miso, tobiko hollandaise.</p>
    </div>
    <div class="rail">
      ${classics.map(d => `<a class="dish" href="#menu-${d.sec}">
        <div class="dish-img"><img src="${photo(d.img)}" alt="" loading="lazy"></div>
        <span class="tag">${esc(d.group)}</span>
        <div class="dish-row"><h3>${esc(d.n)}</h3><span class="price">RM ${money(d.p)}</span></div>
        <p>${esc(d.d)}</p>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="sec cups">
  <div class="wrap">
    <div class="sec-head">
      <div>${wob('From the bar', 'eyebrow')}<h2>Coffee worth the trip</h2></div>
      <p>Classic espresso, matcha and houjicha, plus a list of house signatures. Every one comes hot or iced unless it says otherwise.</p>
    </div>
    <div class="cup-grid">
      ${cups.map(c => `<button class="cup" data-lb="${photo(c.img)}" data-cap="${esc(c.n)}" style="text-align:left">
        <div class="dish-img"><img src="${photo(c.img)}" alt="" loading="lazy"></div>
        <div class="dish-row"><h3>${esc(c.n)}</h3><span class="price">${esc(c.p.split(' / ').pop())}</span></div>
        <p>${esc(c.line)}</p>
      </button>`).join('')}
    </div>
    <p style="margin-top:28px"><a class="btn btn-line" href="#menu-drinks">See all drinks</a></p>
  </div>
</section>

<section class="sec" id="room">
  <div class="wrap room">
    <div class="room-pics">
      <figure><img src="assets/photos/space/glass-wall.jpg" alt="The glass wall at FLAT18 looking out to the trees" loading="lazy"></figure>
      <figure><img src="assets/photos/space/table-spread.jpg" alt="A table of steak and eggs, pasta and charred carrots" loading="lazy"></figure>
    </div>
    <div>
      ${wob('The room', 'eyebrow')}
      <div class="sec-head" style="margin-bottom:22px"><h2>Glass walls, green outside</h2></div>
      <p class="lede">A ground-floor room in Mutiara Damansara with glass on every side. Bright and easy at brunch, lower and slower once the sun goes down.</p>
      <p style="color:var(--muted);max-width:52ch">Pork-free kitchen. Families welcome, with a kids' menu and babycinos. Ask about the private room for birthdays, team lunches and small celebrations.</p>
      <div class="facts">
        <div><b>9am</b><span>Opens daily</span></div>
        <div><b>5pm</b><span>Dinner specials start</span></div>
        <div><b>10pm</b><span>Last call</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec cakes" id="cakes">
  <div class="wrap">
    <div class="sec-head">
      <div>${wob('Pre-order only', 'eyebrow')}<h2>Whole cakes for the table</h2></div>
      <p>Three house cakes, baked whole for birthdays and get-togethers. Message us a few days ahead with the date and we'll confirm.</p>
    </div>
    <div class="cake-grid">
      ${F.cakes.map(c => `<button class="cake" data-lb="${photo(c.img)}" data-cap="${esc(c.n)}"><div class="dish-img"><img src="${photo(c.img)}" alt="" loading="lazy"></div><h3>${esc(c.n)}</h3></button>`).join('')}
    </div>
    <div class="cake-note">
      <a class="btn btn-green" href="${L.reserve.wa}" target="_blank" rel="noopener">Pre-order on WhatsApp</a>
      <p>Pick up at FLAT18, or add it to your table booking.</p>
    </div>
  </div>
</section>

<section class="sec evt-teaser" id="private">
  <div class="wrap evt-teaser-in">
    <div class="evt-reel" aria-hidden="true">
      ${['v160', 'v75', 'v33'].map(v => `<video src="assets/events/${v}.mp4" poster="assets/events/${v}.jpg" muted loop playsinline autoplay preload="metadata"></video>`).join('')}
    </div>
    <div>
      ${wob('FLAT18 x The Bread Bar', 'eyebrow')}
      <div class="sec-head" style="margin-bottom:18px"><h2>Events, the whole room</h2></div>
      <p class="lede">Book out the restaurant for celebrations, corporate dinners and launches, or let us cater yours.</p>
      <ul class="pk-mini">
        ${[...F.events.buffets, ...F.events.plated].map(p => `<li><a href="#events-${p.id}"><span>${esc(p.name)}<small>${p.kicker.replace(/ 0\d$/, '')}</small></span><b>RM${p.price}<sup>++</sup></b></a></li>`).join('')}
      </ul>
      <div class="hero-cta" style="margin-top:22px">
        <a class="btn" href="#events">See event packages</a>
        <a class="btn btn-line" href="#events-canapes">See the canapé menu</a>
      </div>
    </div>
  </div>
</section>

<section class="sister">
  <div class="wrap sister-in">
    <div class="sister-badge">Sister of<br>The Bread<br>Bar</div>
    <div>
      <h2>From the family behind The Bread Bar</h2>
      <p>FLAT18 is the sister restaurant of The Bread Bar in TTDI and Publika. The sourdough on your plate and the bakes at our counter come from the same ovens.</p>
    </div>
    <a class="btn" href="${L.breadbar}" target="_blank" rel="noopener">See The Bread Bar on Instagram</a>
  </div>
</section>

<section class="sec" id="visit">
  <div class="wrap visit">
    <div>
      ${wob('Come by', 'eyebrow')}
      <div class="sec-head" style="margin-bottom:28px"><h2>Visit <span class="wm">F<i>LA</i>T<sup>18</sup></span></h2></div>
      <dl>
        <div><dt>Address</dt><dd>${F.address.join('<br>')}<small><a href="${F.maps}" target="_blank" rel="noopener">Open in Google Maps →</a></small></dd></div>
        <div><dt>Hours</dt><dd>Open daily, 9am – 10pm</dd></div>
        <div><dt>Reservations &amp; private room</dt><dd><a href="${L.reserve.wa}" target="_blank" rel="noopener">${L.reserve.phone}</a><small>WhatsApp</small></dd></div>
        <div><dt>Delivery, pre-orders &amp; pickup</dt><dd><a href="${L.order}" target="_blank" rel="noopener">Order on Beep</a></dd></div>
      </dl>
    </div>
    <div class="day">
      <h3>A day at FLAT18</h3>
      <div class="day-wrap">
        <div class="day-bar">
          <span class="seg seg-brunch">Brunch</span>
          <span class="seg seg-dinner">Dinner specials</span>
        </div>
        <span class="day-now" id="day-now"></span>
      </div>
      <div class="day-scale">${[[9, '9am'], [12, '12pm'], [17, '5pm'], [22, '10pm']].map(([h, t]) => `<span style="left:${((h - 9) / 13) * 100}%">${t}</span>`).join('')}</div>
      <ul>
        <li><span>Brunch</span><span>9am – 5pm</span></li>
        <li><span>Sandwiches, mains, pasta, drinks</span><span>All day</span></li>
        <li><span>Dinner specials</span><span>5pm – 10pm</span></li>
        <li><span>Hot out of the oven</span><span>While they last</span></li>
      </ul>
    </div>
  </div>
</section>`;
  }

  /* day→night scroll story: scroll progress p (0–1) through the pinned section drives the sky tint,
     the plate swap, the self-drawing sun arc and a 9am→10pm clock. Reduced motion shows the static .dn split. */
  let arcLen = null; // x position (0–1) at each 1% of the arc's length, built on first use
  function updateStory() {
    const s = $('#story'); if (!s || !s.offsetParent) return;
    const r = s.getBoundingClientRect(), pin = $('.story-pin', s).offsetHeight;
    const forcedP = (location.search.match(/story=([\d.]+)/) || [])[1]; // local review screenshots only
    const p = forcedP ? +forcedP : Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - pin)));
    const b = Math.min(1, Math.max(0, (p - .575) / .08)); // short crossfade centred on 5pm (p = 8/13)
    s.style.setProperty('--p', p.toFixed(4));
    // the arc's x is linear in t, but its length isn't: draw the stroke up to the sun, not to p of the length
    if (!arcLen) { const path = $('.arc-draw', s), L = path.getTotalLength(); arcLen = []; for (let i = 0; i <= 100; i++) arcLen.push(path.getPointAtLength(L * i / 100).x / 1000); }
    let k = 0; while (k < 100 && arcLen[k + 1] <= p) k++;
    const frac = k >= 100 ? 1 : (k + (p - arcLen[k]) / Math.max(1e-6, arcLen[k + 1] - arcLen[k])) / 100;
    s.style.setProperty('--draw', frac.toFixed(4));
    s.style.setProperty('--b', b.toFixed(3));
    s.classList.toggle('is-night', b >= .5);
    // sun position on the quadratic arc M0,110 Q500,-70 1000,110 (viewBox 1000x120)
    const t = p, x = 1000 * t, y = (1 - t) * (1 - t) * 110 + 2 * (1 - t) * t * -70 + t * t * 110;
    const sun = $('#sun');
    sun.style.left = (x / 10) + '%'; sun.style.top = (y / 120 * 70) + 'px'; // the arc's svg is 70px tall
    const mins = Math.round((9 * 60 + p * 13 * 60) / 15) * 15, h = Math.floor(mins / 60), m = mins % 60;
    $('#story-clock').textContent = `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}${h < 12 ? 'am' : 'pm'}`;
  }

  function placeNowMarker() {
    const el = $('#day-now'); if (!el) return;
    const { dec, h, m } = myt(), H = F.hours;
    if (dec < H.open || dec >= H.close) { el.style.display = 'none'; return; }
    el.style.display = 'block';
    el.style.left = `${((dec - H.open) / (H.close - H.open)) * 100}%`;
    const hh = ((h + 11) % 12) + 1;
    el.dataset.t = `Now ${hh}:${String(m).padStart(2, '0')}${h < 12 ? 'am' : 'pm'}`;
  }

  /* ---------- menu page ---------- */
  function item(it) {
    const img = it.img ? photo(it.img) : '';
    const tag = it.t ? ` <small>${esc(it.t)}</small>` : '';
    return `<div class="mi ${img ? 'has-img' : ''}" ${img ? `data-lb="${img}" data-cap="${esc(it.n)}" data-peek="${img}" tabindex="0" role="button"` : ''}>
      <span class="mi-thumb ${img ? '' : 'none'}">${img ? `<img src="${img}" alt="" loading="lazy">` : ''}</span>
      <span class="mi-name">${esc(it.n)}${tag}</span>
      <span class="mi-price">${it.p != null ? money(it.p) : ''}</span>
      ${it.d ? `<p class="mi-desc">${esc(it.d)}</p>` : ''}
      ${it.extra ? `<div class="mi-extra">${it.extra.map(([a, b]) => `<div><span>${esc(a)}</span><span>${b}</span></div>`).join('')}</div>` : ''}
    </div>`;
  }
  function group(g) {
    return `<div class="mgroup">
      <div class="mgroup-head">${wob(g.head)}${g.when ? `<span class="when">${esc(g.when)}</span>` : ''}</div>
      ${g.items.map(item).join('')}
      ${g.note ? g.note.map(([a, b]) => `<div class="note-row"><span>${esc(a)}</span><span>${b}</span></div>`).join('') : ''}
      ${g.photo ? `<div class="kids-photo"><img src="${photo(g.photo)}" alt="The three kids' plates" loading="lazy"></div>` : ''}
    </div>`;
  }
  function menuSec(s) {
    let body;
    if (s.list) {
      body = `<div class="xgrid">${s.groups.map(g => `<div>${wob(g.head)}${g.items.map(([n, p]) => `<div class="xrow"><span>${esc(n)}</span><span>${money(p)}</span></div>`).join('')}</div>`).join('')}</div>`;
    } else if (s.drinks) {
      body = `<p class="fineprint" style="margin:6px 0 0">H = hot, C = cold. Where there are two prices, hot comes first.</p><div class="dgrid">${s.groups.map(group).join('')}</div>`;
    } else {
      body = s.groups.map(group).join('');
    }
    const cls = s.night ? 'night' : s.list ? 'extras' : '';
    return `<section class="msec ${cls}" id="m-${s.id}">
      <h2>${esc(s.title)}</h2>
      ${s.night ? `<p class="night-note">Three plates that only come out once the sun goes down.</p>` : ''}
      ${body}
    </section>`;
  }
  function menu() {
    return `
<section class="mhero">
  <div class="wrap mhero-in">
    <h1>Our menu</h1>
    <p>Brunch from 9am to 5pm, dinner specials from 5pm, everything else all day. All prices in Ringgit Malaysia (RM).</p>
  </div>
</section>
<nav class="tabs" aria-label="Menu sections"><div class="wrap tabs-in">
  ${F.menu.map(s => `<a href="#menu-${s.id}" data-tab="${s.id}">${esc(s.title)}</a>`).join('')}
</div></nav>
<div class="wrap mbody">
  <div>${F.menu.map(menuSec).join('')}
    <p class="fineprint">All prices are stated in Ringgit Malaysia (RM). Ask the team about allergens.</p>
  </div>
  <aside class="peek" aria-hidden="true">
    <div class="peek-frame"><img id="peek-img" src="${photo('food/salt-beef-sandwich')}" alt=""><p class="peek-cap glass" id="peek-cap">Salt Beef Sandwich</p></div>
    <p class="peek-hint">Hover a dish to see it. Click for a closer look.</p>
  </aside>
</div>`;
  }
  function wireMenu() {
    const img = $('#peek-img'), cap = $('#peek-cap');
    let last = '';
    $$('[data-peek]').forEach(el => el.addEventListener('mouseenter', () => {
      if (el.dataset.peek === last) return; last = el.dataset.peek;
      img.style.opacity = 0;
      setTimeout(() => { img.src = el.dataset.peek; cap.textContent = el.dataset.cap; img.style.opacity = 1; }, 150);
    }));
  }
  function spyTabs() {
    const secs = $$('.msec'); if (!secs.length) return;
    let cur = secs[0].id;
    for (const s of secs) if (s.getBoundingClientRect().top < 200) cur = s.id;
    const pre = page === 'events' ? 'ev-' : 'm-';
    $$('.tabs a').forEach(a => {
      const on = pre + a.dataset.tab === cur;
      if (on && !a.classList.contains('on')) a.scrollIntoView({ block: 'nearest', inline: 'center' });
      a.classList.toggle('on', on);
    });
  }

  /* ---------- events page ---------- */
  const E = F.events;
  const GAL_START = 16;
  const evMedia = id => `assets/events/${id}.${id[0] === 'v' ? 'mp4' : 'jpg'}`;
  function courses(list) {
    return list.map(c => `<div class="crs">
      <h4>${esc(c.h)}</h4>
      ${c.items.map(([n, d], i) => `${c.or && i ? '<span class="or">or</span>' : ''}<p class="crs-i"><span>${esc(n)}</span>${d ? `<small>${esc(d)}</small>` : ''}</p>`).join('')}
    </div>`).join('');
  }
  function pkgCard(p, kind) {
    return `<article class="pkg" id="ev-${p.id}">
      <header class="pkg-head">
        <p class="pkg-kicker">${esc(p.kicker)}</p>
        <h3>${esc(p.name)}</h3>
        <p class="pkg-price">RM${p.price}<sup>++</sup> <small>/ guest</small></p>
        <p class="pkg-blurb">${esc(p.blurb)}</p>
        ${p.includes ? `<ul class="pkg-inc">${p.includes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      </header>
      <div class="pkg-body">${courses(p.courses)}
        ${p.veg ? `<div class="veg"><h4>Vegetarian option</h4>${p.veg.map(([h, n, d]) => `<p class="crs-i"><em>${h}</em><span>${esc(n)}</span><small>${esc(d)}</small></p>`).join('')}</div>` : ''}
      </div>
      <a class="btn" href="#events-enquire" data-pick="${esc(p.name)}">Enquire about ${esc(p.name)}</a>
    </article>`;
  }
  function events() {
    const money0 = n => n.toLocaleString('en-MY');
    return `
<section class="mhero evhero">
  <div class="wrap evhero-in">
    <div>
      <p class="wob" style="margin-bottom:18px">${'Private events & catering'.split(' ').map((w, i) => `<span style="--r:${[-3, 2.5, -1.5, 3.5][i % 4]}deg;--y:${[2, -4, 3, -2][i % 4]}px">${w}</span>`).join('')}</p>
      <h1>Events at <span class="wm">F<i>LA</i>T<sup>18</sup></span></h1>
      <p>With The Bread Bar's ovens behind us: buffets, plated dinners, full restaurant bookouts and catering by the piece, for celebrations, corporate events and special occasions.</p>
      <div class="hero-cta" style="margin-top:22px">
        <a class="btn btn-butter" href="#events-enquire">Start an event enquiry</a>
        <a class="btn btn-ghost-light" href="#events-gallery">See photos from past events</a>
      </div>
    </div>
    <div class="evhero-reel" aria-hidden="true">
      ${['v160', 'v183', 'v192'].map(v => `<video src="${evMedia(v)}" poster="assets/events/${v}.jpg" muted loop playsinline autoplay preload="metadata"></video>`).join('')}
    </div>
  </div>
</section>
<nav class="tabs" aria-label="Event sections"><div class="wrap tabs-in">
  ${[['packages', 'Packages'], ['buffet', 'Buffets'], ['plated', 'Plated dinners'], ['bookout', 'Bookouts'], ['canapes', 'Canapés & catering'], ['gallery', 'Gallery'], ['enquire', 'Enquire']]
    .map(([id, t]) => `<a href="#events-${id}" data-tab="${id}">${t}</a>`).join('')}
</div></nav>

<div class="wrap evbody">
  <section class="msec" id="ev-packages">
    <div class="sec-head"><div>${wob('Whole restaurant bookout', 'eyebrow')}<h2>Four ways to host</h2></div>
      <p>Two buffets and two plated dinners, priced per guest. Swaps and small changes are welcome; just ask.</p></div>
    <div class="pk-grid">
      ${[...E.buffets.map(p => [p, 'Buffet']), ...E.plated.map(p => [p, '3-course plated'])].map(([p, k]) => `<a class="pk" href="#events-${p.id}">
        <span class="pk-k">${k}</span><h3>${esc(p.name)}</h3><b>RM${p.price}<sup>++</sup><small> / guest</small></b><p>${esc(p.blurb)}</p><span class="pk-go">See the menu →</span></a>`).join('')}
    </div>
    <p class="fineprint">${E.tax} Full restaurant bookouts apply for events of 40 guests and above.</p>
  </section>

  <section class="msec" id="ev-buffet">
    <h2>Buffets</h2>
    <div class="pkg-pair">${E.buffets.map(p => pkgCard(p)).join('')}</div>
  </section>

  <section class="msec night" id="ev-plated">
    <h2>Plated dinners</h2>
    <p class="night-note">A more formal dining format for celebrations, dinners and special occasions. Three courses, a choice of two mains, and a vegetarian option.</p>
    <div class="pkg-pair">${E.plated.map(p => pkgCard(p)).join('')}</div>
    <p class="fineprint">${esc(E.platedNote)}</p>
  </section>

  <section class="msec" id="ev-bookout">
    <div class="sec-head"><div>${wob('40 guests & above', 'eyebrow')}<h2>Full restaurant bookouts</h2></div>
      <p>${esc(E.bookout.min)} ${esc(E.bookout.note)}</p></div>
    <div class="bk-wrap"><table class="bk">
      <thead><tr><th scope="col">Minimum spend</th><th scope="col">Daytime<small>5-hour allocation</small></th><th scope="col">Dinner<small>${esc(E.bookout.dinner)}</small></th></tr></thead>
      <tbody>${E.bookout.rows.map(r => `<tr><th scope="row">${r.days}</th><td>RM${money0(r.day)}<sup>++</sup></td><td>RM${money0(r.dinner)}<sup>++</sup></td></tr>`).join('')}</tbody>
    </table></div>
    <div class="bk-slots"><span>Daytime slots</span>${E.bookout.slots.map(s => `<b>${s}</b>`).join('')}</div>
    <p class="fineprint">${E.tax}</p>

    <div class="terms">
      <h3>Good to know</h3>
      ${E.terms.map(([h, t]) => `<div><h4>${esc(h)}</h4><p>${esc(t)}</p></div>`).join('')}
    </div>
    <details class="addons">
      <summary>Canapé &amp; mini pastry add-ons for event menus</summary>
      <div class="addon-grid">${E.addons.map(g => `<div><h4>${esc(g.h)}</h4><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`).join('')}</div>
    </details>
  </section>

  <section class="msec extras cn" id="ev-canapes">
    <h2>Canapés, petit sandwiches &amp; mini pastries</h2>
    <p class="cn-intro">${esc(E.canapes.intro)} Order by the piece for launches, meetings and tea breaks, or add them to an event menu.</p>
    ${E.canapes.groups.map(g => `<div class="cn-group">
      <figure class="cn-pic" tabindex="0" role="button" aria-label="Enlarge photo: ${esc(g.h)}" data-lb="assets/events/${g.img}.jpg" data-cap="${esc(g.h)}"><img src="assets/events/${g.img}.jpg" alt="" width="1050" height="1400" loading="lazy" decoding="async"></figure>
      <div>
        ${wob(g.h)}
        <p class="cn-line">${esc(g.line)}</p>
        ${g.items.map(([n, p, d]) => `<div class="xrow"><span>${esc(n)}${d ? `<small>${esc(d)}</small>` : ''}</span><span>${g.from ? 'from ' : ''}RM${p}<sup>++</sup>${g.from ? ' / pc' : ''}</span></div>`).join('')}
        <p class="cn-moq">${esc(g.moq)}</p>
      </div>
    </div>`).join('')}
    <p class="fineprint" style="color:#3f4a42">${E.canapes.notes.join(' ')}</p>
    <a class="btn btn-green" href="#events-enquire" data-pick="Canapés & catering">Enquire about canapés &amp; catering</a>
  </section>

  <section class="msec" id="ev-gallery">
    <div class="sec-head"><div>${wob('Past events', 'eyebrow')}<h2>From the room</h2></div>
      <p>Launches, team dinners, birthdays and off-site catering. Tap any photo for a closer look.</p></div>
    <div class="chips" role="group" aria-label="Filter the gallery">
      <button class="chip on" data-filter="all" aria-pressed="true">All</button>
      ${E.tags.map(([k, t]) => `<button class="chip" data-filter="${k}" aria-pressed="false">${t}</button>`).join('')}
    </div>
    <div class="gal">
      ${E.media.map(([id, tag, cap], i) => id[0] === 'v'
        ? `<figure class="g" tabindex="0" role="button" data-tag="${tag}"${i >= GAL_START ? ' data-more hidden' : ''} data-lb="${evMedia(id)}" data-video="1" data-cap="${esc(cap)}"><video src="${evMedia(id)}" poster="assets/events/${id}.jpg" muted loop playsinline autoplay preload="none"></video><figcaption>${esc(cap)}</figcaption><span class="g-play" aria-hidden="true"></span></figure>`
        : `<figure class="g" tabindex="0" role="button" data-tag="${tag}"${i >= GAL_START ? ' data-more hidden' : ''} data-lb="${evMedia(id)}" data-cap="${esc(cap)}"><img src="${evMedia(id)}" alt="${esc(cap)}" width="1050" height="1400" loading="lazy" decoding="async"><figcaption>${esc(cap)}</figcaption></figure>`).join('')}
    </div>
    <div class="gal-more"><button class="btn btn-line" id="gal-more">Show all ${E.media.length} photos &amp; clips</button></div>
  </section>

  <section class="msec" id="ev-enquire">
    <div class="enq">
      <div>
        ${wob('Plan an event', 'eyebrow')}
        <h2 style="font-size:clamp(40px,5vw,64px);font-weight:300">Tell us the plan</h2>
        <p style="color:var(--muted);max-width:44ch;margin-top:14px">Fill this in and we'll open WhatsApp with your message ready to send. Events and bookouts go to our reservations line; canapés and catering go to the catering team.</p>
        <dl class="enq-lines">
          <div><dt>Private events &amp; reservations</dt><dd>${L.reserve.phone}</dd></div>
          <div><dt>Catering &amp; corporate events</dt><dd>${L.catering.phone}</dd></div>
        </dl>
      </div>
      <form class="enq-form" id="enq" novalidate>
        <label for="enq-pkg">What are you planning?</label>
        <select id="enq-pkg">
          ${[...E.buffets, ...E.plated].map(p => `<option>${esc(p.name)}</option>`).join('')}
          <option>Full restaurant bookout</option>
          <option>Canapés &amp; catering</option>
          <option>Not sure yet</option>
        </select>
        <div class="enq-row">
          <div><label for="enq-date">Date</label><input id="enq-date" type="date"></div>
          <div><label for="enq-guests">Guests</label><input id="enq-guests" name="guests" type="number" min="1" inputmode="numeric" autocomplete="off" placeholder="e.g. 45…"></div>
        </div>
        <label for="enq-time">Time of day</label>
        <select id="enq-time"><option>Lunch</option><option>High tea</option><option>Dinner</option><option>Flexible</option></select>
        <label for="enq-name">Your name</label>
        <input id="enq-name" name="name" type="text" autocomplete="name" placeholder="So we know who we're talking to…">
        <label for="enq-note">Anything else?</label>
        <textarea id="enq-note" name="notes" rows="3" autocomplete="off" placeholder="The occasion, dietary needs, set-up ideas…"></textarea>
        <p class="enq-to" id="enq-to" role="status" aria-live="polite"></p>
        <a class="btn" id="enq-go" href="#" target="_blank" rel="noopener">Send enquiry on WhatsApp</a>
        <p class="enq-safe">Opens WhatsApp with your message ready to send. Nothing is booked until we confirm.</p>
      </form>
    </div>
  </section>
</div>`;
  }
  function wireEvents() {
    // "All" starts with the first GAL_START items; a filter chip shows every item with that tag
    let filter = 'all', expanded = false;
    const showGal = () => {
      $$('.gal .g').forEach(g => { g.hidden = filter === 'all' ? (!expanded && g.hasAttribute('data-more')) : g.dataset.tag !== filter; });
      $('#gal-more').parentElement.hidden = filter !== 'all' || expanded;
    };
    $$('.chip').forEach(c => c.addEventListener('click', () => {
      filter = c.dataset.filter;
      $$('.chip').forEach(x => { x.classList.toggle('on', x === c); x.setAttribute('aria-pressed', x === c); });
      showGal();
    }));
    $('#gal-more').addEventListener('click', () => { expanded = true; showGal(); });
    const form = $('#enq');
    const build = () => {
      const v = id => $('#' + id).value.trim();
      const pkg = v('enq-pkg'), catering = pkg.startsWith('Canap');
      const line = catering ? L.catering : L.reserve;
      let date = v('enq-date');
      if (date) date = new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
      const msg = [`Hi FLAT18! I'd like to enquire about an event.`, `Package: ${pkg}`, date && `Date: ${date}`, v('enq-guests') && `Guests: ${v('enq-guests')}`, `Time: ${v('enq-time')}`, v('enq-name') && `Name: ${v('enq-name')}`, v('enq-note') && `Notes: ${v('enq-note')}`].filter(Boolean).join('\n');
      $('#enq-go').href = `${line.wa}?text=${encodeURIComponent(msg)}`;
      $('#enq-to').textContent = `Goes to ${catering ? 'the catering team' : 'reservations'}, ${line.phone}`;
    };
    form.addEventListener('input', build); form.addEventListener('submit', e => e.preventDefault());
    build();
    $$('[data-pick]').forEach(a => a.addEventListener('click', () => { const s = $('#enq-pkg'); s.value = a.dataset.pick; build(); }));
  }
  /* videos: decorative loops, so stop them for reduced motion */
  function quietVideos() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) $$('video').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });
  }

  /* ---------- footer ---------- */
  $('#foot').innerHTML = `<div class="wrap foot-in">
    <div class="foot-top">
      <div><a href="#home" class="mark" aria-label="FLAT18 home">F<i>LA</i>T<sup>18</sup></a><p style="margin-top:14px;opacity:.85">A hug for your tastebuds.<br>Bringing classics back.</p></div>
      <div><h4>Visit</h4><ul>${F.address.map(a => `<li>${a}</li>`).join('')}<li><a href="${F.maps}" target="_blank" rel="noopener">Google Maps →</a></li></ul></div>
      <div><h4>Contact</h4><ul><li><a href="#events">Events &amp; packages</a></li><li><a href="${L.reserve.wa}" target="_blank" rel="noopener">Reservations ${L.reserve.phone}</a></li><li><a href="${L.catering.wa}" target="_blank" rel="noopener">Catering ${L.catering.phone}</a></li><li><a href="${L.order}" target="_blank" rel="noopener">Delivery on Beep</a></li></ul></div>
      <div><h4>Follow</h4><ul><li><a href="${L.instagram}" target="_blank" rel="noopener">Instagram @flat18my</a></li><li><a href="${L.tiktok}" target="_blank" rel="noopener">TikTok @flat18my</a></li><li><a href="${L.breadbar}" target="_blank" rel="noopener">The Bread Bar</a></li></ul></div>
    </div>
    <div class="foot-bot"><span>© FLAT18 Sdn Bhd (1511667-P) · Open daily 9am – 10pm</span><span>Sister restaurant of The Bread Bar, TTDI &amp; Publika</span></div>
  </div>`;

  /* ---------- links, drawer, lightbox ---------- */
  $$('[data-link]').forEach(a => { a.href = a.dataset.link === 'order' ? L.order : L.reserve.wa; });
  const drawer = $('#drawer'), burger = $('[data-drawer]');
  const closeDrawer = () => { drawer.hidden = true; burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', () => { const open = drawer.hidden; drawer.hidden = !open; burger.setAttribute('aria-expanded', String(open)); });
  drawer.addEventListener('click', e => { if (e.target.closest('a')) closeDrawer(); });

  const lb = $('#lb');
  let lbFrom = null; // element that opened the lightbox, to hand focus back on close
  function openLb(src, cap, video) {
    lbFrom = document.activeElement;
    const img = $('img', lb), vid = $('video', lb);
    img.hidden = !!video; vid.hidden = !video;
    if (video) { vid.src = src; vid.play().catch(() => {}); } else { img.src = src; img.alt = cap; }
    $('figcaption', lb).textContent = cap; lb.hidden = false; $('.lb-x', lb).focus();
  }
  const closeLb = () => {
    if (lb.hidden) return;
    lb.hidden = true; const v = $('video', lb); v.pause(); v.removeAttribute('src');
    if (lbFrom && lbFrom.isConnected) lbFrom.focus({ preventScroll: true });
  };
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-lb]');
    if (t) { openLb(t.dataset.lb, t.dataset.cap || '', t.dataset.video); return; }
    if (e.target === lb || e.target.closest('[data-lb-close]')) closeLb();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLb(); closeDrawer(); }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-lb][role="button"]')) { e.preventDefault(); openLb(e.target.dataset.lb, e.target.dataset.cap, e.target.dataset.video); }
  });

  /* ---------- router ---------- */
  let page = '';
  function route() {
    const tok = (location.hash || '#home').slice(1) || 'home';
    const want = tok.startsWith('menu') ? 'menu' : tok.startsWith('events') ? 'events' : 'home';
    if (want !== page) {
      page = want;
      app.innerHTML = want === 'menu' ? menu() : want === 'events' ? events() : home();
      app.classList.remove('page-in'); void app.offsetWidth; app.classList.add('page-in');
      if (want === 'menu') wireMenu(); else if (want === 'events') wireEvents(); else { placeNowMarker(); updateStory(); }
      quietVideos();
      setMode(document.documentElement.dataset.mode);
    }
    closeDrawer(); closeLb();
    let target = null;
    if (tok.startsWith('menu-')) target = $('#m-' + tok.slice(5));
    else if (tok.startsWith('events-')) {
      const sub = tok.slice(7);
      target = $('#ev-' + sub);
    } else if (!['home', 'menu', 'events'].includes(tok)) target = document.getElementById(tok);
    const hdr = $('#hdr').offsetHeight + (want !== 'home' ? 56 : 0);
    const y = target ? target.getBoundingClientRect().top + scrollY - hdr - 8 : 0;
    scrollTo({ top: y, behavior: 'instant' });
    $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === tok || a.dataset.nav === want));
    spyTabs();
  }
  addEventListener('hashchange', route);
  addEventListener('resize', () => { if (page === 'home') updateStory(); });
  addEventListener('scroll', () => { $('#hdr').classList.toggle('scrolled', scrollY > 4); if (page !== 'home') spyTabs(); else updateStory(); }, { passive: true });

  /* ---------- boot ---------- */
  const st = status();
  $('#status-line').textContent = st.text;
  const forced = (location.search.match(/mode=(day|night)/) || [])[1]; // local review screenshots only
  setMode(forced || storedMode() || (st.meal === 'night' ? 'night' : 'day'));
  route();
  setInterval(() => { $('#status-line').textContent = status().text; placeNowMarker(); }, 60e3);
})();

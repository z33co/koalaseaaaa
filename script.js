// =============================================
//  PHOTOS — hardcoded Cloudinary URLs
// =============================================
const PHOTOS = {
  // polaroid wall — 9 photos
  polaroids: [
    'https://res.cloudinary.com/dud0n1yrs/image/upload/f_auto,q_auto/1_yjp9ni',       // graduation
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020586/2_silncy.jpg',      // garden pink
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020585/4_e8vvxg.jpg',      // gelak
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020584/6_slig8f.jpg',      // ferry
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020584/5_eyzbvw.jpg',      // kayak
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020585/9_oqd8ma.jpg',      // stone steps
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020584/8_tkk9na.jpg',      // melaka
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020584/7_cs1h9y.jpg',      // sunset
    'https://res.cloudinary.com/dud0n1yrs/image/upload/v1774020585/4_e8vvxg.jpg',      // shoes (us)
  ]
};

// =============================================
//  MUSIC — SoundCloud
// =============================================
let scFrame  = null;
let scWidget = null;
let isPlaying = false;

function setEqPlaying(playing) {
  const eq = document.getElementById('eq');
  if (!eq) return;
  eq.classList.toggle('paused', !playing);
  isPlaying = playing;
}

function initMusic() {
  scFrame = document.createElement('iframe');
  scFrame.id    = 'sc-player';
  scFrame.allow = 'autoplay';
  scFrame.src   = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1647905958&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false';
  scFrame.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;border:none;';
  document.body.appendChild(scFrame);

  const script = document.createElement('script');
  script.src = 'https://w.soundcloud.com/player/api.js';
  script.onload = () => {
    scWidget = SC.Widget(scFrame);
    scWidget.bind(SC.Widget.Events.READY, () => {
      scWidget.setVolume(80);
      scWidget.play();
      setEqPlaying(true);
    });
    scWidget.bind(SC.Widget.Events.PLAY,   () => setEqPlaying(true));
    scWidget.bind(SC.Widget.Events.PAUSE,  () => setEqPlaying(false));
    scWidget.bind(SC.Widget.Events.FINISH, () => { scWidget.seekTo(0); scWidget.play(); });
  };
  document.head.appendChild(script);

  const unlock = () => { if (scWidget) scWidget.play(); };
  ['click','touchstart','scroll','keydown']
    .forEach(ev => document.addEventListener(ev, unlock, { once: true, passive: true }));
}

window.toggleMusic = function () {
  if (!scWidget) return;
  if (isPlaying) { scWidget.pause(); } else { scWidget.play(); }
};

// =============================================
//  FLOATING FLOWERS
// =============================================
function spawnFloatingFlowers(containerId, count) {
  const fw = document.getElementById(containerId);
  if (!fw) return;
  const ftypes = ['daisy', 'tulip', 'lily'];
  const ns = 'http://www.w3.org/2000/svg';
  for (let i = 0; i < count; i++) {
    const wrap = document.createElement('div');
    const x = Math.random() * 100, dur = 10 + Math.random() * 16;
    const delay = Math.random() * 14, sway = 3 + Math.random() * 3;
    const size = 24 + Math.random() * 22;
    wrap.style.cssText = `position:absolute;left:${x}%;bottom:-60px;width:${size}px;height:${Math.round(size*1.2)}px;animation:floatUp ${dur}s ${delay}s linear infinite,floatSway ${sway}s ${delay}s ease-in-out infinite`;
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', size);
    svg.setAttribute('height', Math.round(size * 1.2));
    svg.setAttribute('viewBox', '0 0 40 44');
    const use = document.createElementNS(ns, 'use');
    use.setAttribute('href', '#' + ftypes[i % 3]);
    svg.appendChild(use);
    wrap.appendChild(svg);
    fw.appendChild(wrap);
  }
}

function initFloatingFlowers() {
  spawnFloatingFlowers('floatWrap',   22);
  spawnFloatingFlowers('s2FloatWrap', 30);
}

// =============================================
//  BOTANICAL BG + KOALA
// =============================================
function initBotanicalBg() {
  const bb = document.getElementById('botBg');
  const fl = [...Array(14)].map((_, i) => {
    const x = 30 + Math.random() * 740, y = 20 + Math.random() * 560;
    const r = -40 + Math.random() * 80, s = 0.6 + Math.random() * 0.9, t = i % 3;
    if (t === 0) return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><ellipse cx="0" cy="-12" rx="4" ry="9" fill="#ccc"/><ellipse cx="0" cy="-12" rx="4" ry="9" fill="#ccc" transform="rotate(60)"/><ellipse cx="0" cy="-12" rx="4" ry="9" fill="#ccc" transform="rotate(120)"/><ellipse cx="0" cy="-12" rx="4" ry="9" fill="#ccc" transform="rotate(180)"/><ellipse cx="0" cy="-12" rx="4" ry="9" fill="#ccc" transform="rotate(240)"/><ellipse cx="0" cy="-12" rx="4" ry="9" fill="#ccc" transform="rotate(300)"/><circle cx="0" cy="0" r="6" fill="#e8e000"/></g>`;
    if (t === 1) return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><path d="M0,4 Q-7,-10 0,-18 Q7,-10 0,4Z" fill="#d080a0"/><line x1="0" y1="4" x2="0" y2="18" stroke="#6aaa5a" stroke-width="2"/></g>`;
    return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><ellipse cx="0" cy="-10" rx="4" ry="11" fill="#eee"/><ellipse cx="0" cy="-10" rx="4" ry="11" fill="#eee" transform="rotate(60)"/><ellipse cx="0" cy="-10" rx="4" ry="11" fill="#eee" transform="rotate(120)"/><ellipse cx="0" cy="-10" rx="4" ry="11" fill="#eee" transform="rotate(180)"/><ellipse cx="0" cy="-10" rx="4" ry="11" fill="#eee" transform="rotate(240)"/><ellipse cx="0" cy="-10" rx="4" ry="11" fill="#eee" transform="rotate(300)"/><circle cx="0" cy="0" r="4" fill="#f0c030"/></g>`;
  }).join('');
  const koala = `<g transform="translate(580,310) scale(1.8)" opacity="0.85"><ellipse cx="60" cy="110" rx="38" ry="42" fill="#777"/><ellipse cx="60" cy="118" rx="24" ry="28" fill="#aaa"/><ellipse cx="60" cy="68" rx="36" ry="32" fill="#777"/><ellipse cx="30" cy="44" rx="18" ry="16" fill="#777"/><ellipse cx="90" cy="44" rx="18" ry="16" fill="#777"/><ellipse cx="30" cy="44" rx="12" ry="10" fill="#999"/><ellipse cx="90" cy="44" rx="12" ry="10" fill="#999"/><circle cx="48" cy="66" r="8" fill="#222"/><circle cx="72" cy="66" r="8" fill="#222"/><circle cx="50" cy="63" r="3" fill="white"/><circle cx="74" cy="63" r="3" fill="white"/><ellipse cx="60" cy="78" rx="8" ry="6" fill="#333"/><path d="M52 85 Q60 92 68 85" stroke="#555" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M24 95 Q10 115 18 135" stroke="#777" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M96 95 Q110 115 102 135" stroke="#777" stroke-width="14" fill="none" stroke-linecap="round"/></g>`;
  bb.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${fl}${koala}</svg>`;
}

// =============================================
//  POLAROID WALL — pre-filled with real photos
// =============================================
function initPolaroid() {
  const wall = document.getElementById('polaroidWall');

  const captions = [
    'my favourite','always you','us 🤍','my world',
    'sunshine','forever','koala girl','my home','i love you'
  ];

  const isMobile = window.innerWidth <= 640;
  const desktopSlots = [
    [4,  5,  -7, 3],[28, 2,   4, 5],[55, 4,  -3, 4],[75, 3,   8, 2],
    [10, 42, -5, 6],[36, 38,  6, 7],[62, 40, -8, 5],
    [18, 72,  5, 3],[50, 68, -4, 4],
  ];
  const mobileSlots = [
    [2,  3,  -5, 3],[50, 2,   4, 4],
    [5,  28, -3, 5],[50, 26,  5, 5],
    [2,  52,  6, 4],[50, 50, -4, 6],
    [5,  74, -4, 3],[50, 72,  3, 4],
    [25, 40, -2, 7],
  ];
  const slots = isMobile ? mobileSlots : desktopSlots;
  const pEls = [];

  slots.forEach((slot, i) => {
    const [lp, tp, rot, zi] = slot;
    const el = document.createElement('div');
    el.className = 'polaroid';
    el.style.cssText = `left:${lp}%;top:${tp}%;z-index:${zi};--rot:rotate(${rot}deg);`;

    // img — preloaded from Cloudinary
    el.innerHTML = `
      <div class="polaroid-img-wrap">
        <img src="${PHOTOS.polaroids[i]}" alt="${captions[i]}"
          style="width:100%;height:100%;object-fit:cover;opacity:1;display:block;">
      </div>
      <div class="polaroid-caption">${captions[i]}</div>`;

    el.addEventListener('mouseenter', () => {
      el.style.transform = `rotate(${rot * 0.3}deg) scale(1.08) translateY(-8px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = `rotate(${rot}deg)`;
    });

    wall.appendChild(el);
    pEls.push({ el, delay: i * 0.08 });
  });

  // Drop on scroll
  let dropped = false;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting && !dropped) {
        dropped = true;
        pEls.forEach(({ el, delay }) => {
          setTimeout(() => el.classList.add('dropped'), delay * 1000);
        });
      }
    });
  }, { threshold: 0.3 });
  obs.observe(document.getElementById('s2'));
}

// =============================================
//  SCROLL REVEAL
// =============================================
function initScrollReveal() {
  const secs = Array.from(document.querySelectorAll('section'));
  const dots = document.querySelectorAll('.dot');
  const rmap = {
    s3: ['#pe1','.poem-line','#pd1','#fr1'],
    s4: ['#prlbl','.promise-line','#rh'],
    s5: ['#hc'],
    s6: ['.outro-small','.outro-big','#op2','#of'],
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const idx = secs.indexOf(en.target);
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        (rmap[en.target.id] || []).forEach(sel =>
          document.querySelectorAll(sel).forEach(el => el.classList.add('show'))
        );
        const light = ['s2','s3','s5'].includes(en.target.id);
        document.getElementById('musicBtn').classList.toggle('onlight', light);
      }
    });
  }, { threshold: 0.4 });
  secs.forEach(s => io.observe(s));
}

window.goTo = function (i) {
  document.querySelectorAll('section')[i].scrollIntoView({ behavior: 'smooth' });
};

// =============================================
//  MODAL (customize text only)
// =============================================
function initModal() {
  window.openM = function () {
    const g = id => document.getElementById(id);
    g('mOv').classList.add('open');
  };
  window.closeM = function () {
    document.getElementById('mOv').classList.remove('open');
  };
  window.saveM = function () {
    const v = id => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    const s = (id, val) => { if (val) { const el = document.getElementById(id); if (el) el.textContent = val; } };
    const setHTML = (id, val) => { if (val) { const el = document.getElementById(id); if (el) el.innerHTML = val.replace(/\n/g,'<br>'); } };
    s('s1name', v('mName')); s('s1sub', v('mSub'));
    ['1','2','3','4','5','6'].forEach(n => s('pl'+n, v('mPl'+n)));
    s('pr7', v('mPr7'));
    const rh = document.getElementById('rh');
    if (rh && v('mRh')) rh.querySelector('.ring-hint-text').textContent = v('mRh');
    setHTML('hps1', v('mHps1')); setHTML('hps2', v('mHps2')); setHTML('hps3', v('mHps3'));
    s('hsig', v('mHsig')); s('ob', v('mOb')); setHTML('op2', v('mOp2'));
    closeM();
  };
}

// =============================================
//  INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  initMusic();
  initFloatingFlowers();
  initBotanicalBg();
  initPolaroid();
  initScrollReveal();
  initModal();
});
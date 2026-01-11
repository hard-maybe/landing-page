// UI colours mapped to background order (bg1 → bg12)
const uiColors = [
  '#fdf9ce', // bg1
  '#6282B0', // bg2
  '#efeee1', // bg3
  '#5fc29e', // bg4
  '#6282B0', // bg5
  '#5fc29e', // bg6
  '#efeee1', // bg7
  '#5fc29e', // bg8
  '#efeee1', // bg9
  '#fdf9ce', // bg10
  '#fdf9ce', // bg11
  '#6282B0'  // bg12
];

const root = document.documentElement;
let index = 0;

// initial colour (matches bg1)
root.style.setProperty('--ui-color', uiColors[index]);

// advance colour every 8s (matches your CSS animation-delay)
setInterval(() => {
  index = (index + 1) % uiColors.length;
  root.style.setProperty('--ui-color', uiColors[index]);
}, 7300);


/* ==========
   PANEL SETUP
   ========== */

const panels = [
  {
    link: document.querySelector('[data-about]'),
    panel: document.getElementById('about-panel')
  },
  {
    link: document.querySelector('[data-subscribe]'),
    panel: document.getElementById('subscribe-panel')
  }
];

const navLinks = document.querySelectorAll('nav a');

/* ==========
   HELPERS
   ========== */

function openPanel(target) {
  panels.forEach(({ link, panel }) => {
    const isTarget = panel === target;
    panel.classList.toggle('is-open', isTarget);
    link.classList.toggle('is-active', isTarget);
  });
}

function closeAllPanels() {
  panels.forEach(({ link, panel }) => {
    panel.classList.remove('is-open');
    link.classList.remove('is-active');
  });
}

function togglePanel(target) {
  const isOpen = target.classList.contains('is-open');
  if (isOpen) {
    closeAllPanels();
  } else {
    openPanel(target);
  }
}

/* ==========
   LINK CLICKS
   ========== */

panels.forEach(({ link, panel }) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    togglePanel(panel);
  });

  const closeBtn = panel.querySelector('.panel-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeAllPanels);
  }
});

/* ==========
   CLICK OUTSIDE
   ========== */

document.addEventListener('click', (e) => {
  const clickedInsidePanel = panels.some(({ panel }) =>
    panel.querySelector('.panel-inner')?.contains(e.target)
  );

  const clickedPanelLink = panels.some(({ link }) =>
    link.contains(e.target)
  );

  if (!clickedInsidePanel && !clickedPanelLink) {
    closeAllPanels();
  }
});

/* ==========
   ESC KEY
   ========== */

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllPanels();
  }
});

/* ==========
   OTHER NAV LINKS
   ========== */

navLinks.forEach(link => {
  if (![...panels].some(p => p.link === link)) {
    link.addEventListener('click', closeAllPanels);
  }
});


/* ==========
   FOOTER DRAWER
   ========== */

(function () {
  const drawer = document.getElementById('footerDrawer');
  const handle = document.getElementById('footerHandle');
  const yearEl = document.getElementById('year');

  // Exit quietly if footer drawer isn't on the page
  if (!drawer || !handle) return;

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function setOpen(next) {
    drawer.classList.toggle('is-open', next);

    // IMPORTANT: don't aria-hide while the handle has focus (see fix 2 below)
    // We'll set aria-hidden only on the panel instead of the whole drawer.
    const panel = document.getElementById('footerPanel');
    if (panel) panel.setAttribute('aria-hidden', String(!next));

    handle.setAttribute('aria-expanded', String(next));

    const chevron = handle.querySelector('.chevron');
    if (chevron) chevron.textContent = next ? '⌄' : '⌃';

    if (next) handle.classList.remove('is-nudging');
  }

  handle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!drawer.classList.contains('is-open'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      setOpen(false);
    }
  });

  function scheduleNudge() {
    const delay = 22000 + Math.random() * 23000; // 22–45s
    setTimeout(() => {
      if (!drawer.classList.contains('is-open')) {
        handle.classList.remove('is-nudging');
        void handle.offsetWidth;
        handle.classList.add('is-nudging');
      }
      scheduleNudge();
    }, delay);
  }

  scheduleNudge();
})();

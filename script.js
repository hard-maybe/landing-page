// ==========================
// UI COLOUR CYCLING
// ==========================
const uiColors = [
  '#fdf9ce',
  '#6282B0',
  '#efeee1',
  '#5fc29e',
  '#6282B0',
  '#5fc29e',
  '#efeee1',
  '#5fc29e',
  '#efeee1',
  '#fdf9ce',
  '#fdf9ce',
  '#6282B0'
];

const root = document.documentElement;
let index = 0;

root.style.setProperty('--ui-color', uiColors[index]);

setInterval(() => {
  index = (index + 1) % uiColors.length;
  root.style.setProperty('--ui-color', uiColors[index]);
}, 7300);

// ==========================
// PANEL SETUP
// ==========================
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

// ==========================
// HELPERS
// ==========================
function openPanel(targetPanel) {
  panels.forEach(({ link, panel }) => {
    const isTarget = panel === targetPanel;
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

function togglePanel(targetPanel) {
  targetPanel.classList.contains('is-open')
    ? closeAllPanels()
    : openPanel(targetPanel);
}

// ==========================
// NAV LINK CLICKS
// ==========================
panels.forEach(({ link, panel }) => {
  if (!link || !panel) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePanel(panel);
  });

  const closeBtn = panel.querySelector('.panel-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAllPanels();
    });
  }

  // 🔒 Prevent clicks inside the panel from closing it
  const inner = panel.querySelector('.panel-inner');
  if (inner) {
    inner.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});

// ==========================
// CLICK OUTSIDE PANELS
// ==========================
document.addEventListener('click', (e) => {
  const clickedPanel = panels.some(({ panel }) =>
    panel.contains(e.target)
  );
  const clickedPanelLink = panels.some(({ link }) =>
    link.contains(e.target)
  );

  if (!clickedPanel && !clickedPanelLink) {
    closeAllPanels();
  }
});

// ==========================
// ESC KEY
// ==========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllPanels();
  }
});

// ==========================
// OTHER NAV LINKS
// ==========================
navLinks.forEach(link => {
  const isPanelLink = panels.some(p => p.link === link);
  if (!isPanelLink) {
    link.addEventListener('click', closeAllPanels);
  }
});

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


const aboutLink = document.querySelector('[data-about]');
const aboutPanel = document.getElementById('about-panel');
const aboutInner = aboutPanel.querySelector('.about-inner');
const aboutClose = aboutPanel.querySelector('.about-close');

function openAbout() {
  aboutPanel.classList.add('is-open');
}

function closeAbout() {
  aboutPanel.classList.remove('is-open');
}

/* Open */
aboutLink.addEventListener('click', (e) => {
  e.preventDefault();
  openAbout();
});

/* Close button */
aboutClose.addEventListener('click', closeAbout);

/* ESC key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAbout();
  }
});

/* Click outside panel */
document.addEventListener('click', (e) => {
  if (!aboutPanel.classList.contains('is-open')) return;

  if (!aboutInner.contains(e.target) && !aboutLink.contains(e.target)) {
    closeAbout();
  }
});


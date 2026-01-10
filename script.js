console.log('script loaded');

/* ==========
   UI COLOUR CYCLE (TEST)
   ========== */
const root = document.documentElement;
const uiColors = ['red', 'blue', 'green'];
let i = 0;

setInterval(() => {
  root.style.setProperty('--ui-color', uiColors[i % uiColors.length]);
  i++;
}, 1000);

/* ==========
   BASIC CLICK TEST
   ========== */
const aboutLink = document.querySelector('[data-about]');
const aboutPanel = document.getElementById('about-panel');

console.log('aboutLink:', aboutLink);
console.log('aboutPanel:', aboutPanel);

if (aboutLink && aboutPanel) {
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('ABOUT CLICKED');
    aboutPanel.classList.toggle('is-open');
  });
}

document.addEventListener('DOMContentLoaded', () => {

  /* =====================
     UI COLOUR ANIMATION
     ===================== */
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

  /* =====================
     PANEL SETUP
     ===================== */
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

  function closeAllPanels() {
    panels.forEach(({ link, panel }) => {
      panel?.classList.remove('is-open');
      link?.classList.remove('is-active');
    });
  }

  function openPanel(target) {
    panels.forEach(({ link, panel }) => {
      const isTarget = panel === target;
      panel?.classList.toggle('is-open', isTarget);
      link?.classList.toggle('is-active', isTarget);
    });
  }

  panels.forEach(({ link, panel }) => {
    if (!link || !panel) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      panel.classList.contains('is-open')
        ? closeAllPanels()
        : openPanel(panel);
    });

    panel.querySelector('.panel-close')?.addEventListener('click', closeAllPanels);
  });

  /* =====================
     CLICK OUTSIDE
     ===================== */
  document.addEventListener('click', (e) => {
    const clickedPanel = panels.some(({ panel }) => panel?.contains(e.target));
    const clickedLink  = panels.some(({ link }) => link?.contains(e.target));
    if (!clickedPanel && !clickedLink) {
      closeAllPanels();
    }
  });

  /* =====================
     ESC KEY
     ===================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllPanels();
  });

});

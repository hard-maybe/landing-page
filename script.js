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
  let colorIndex = 0;

  root.style.setProperty('--ui-color', uiColors[colorIndex]);

  setInterval(() => {
    colorIndex = (colorIndex + 1) % uiColors.length;
    root.style.setProperty('--ui-color', uiColors[colorIndex]);
  }, 7300);

  /* =====================
     PANEL SETUP (SAFE)
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

  panels.forEach(({ link, panel }) => {
    if (!link || !panel) {
      console.warn('Panel wiring missing:', { link, panel });
      return;
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();

      const isOpen = panel.classList.contains('is-open');

      panels.forEach(p => {
        p.panel.classList.remove('is-open');
        p.link.classList.remove('is-active');
      });

      if (!isOpen) {
        panel.classList.add('is-open');
        link.classList.add('is-active');
      }
    });

    const closeBtn = panel.querySelector('.panel-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        panels.forEach(p => {
          p.panel.classList.remove('is-open');
          p.link.classList.remove('is-active');
        });
      });
    }
  });

});

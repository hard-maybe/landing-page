// UI colours mapped to background order (bg1 → bg12)
const uiColors = [
  '#ffffff', // bg1
  '#6282B0', // bg2
  '#ffffff', // bg3
  '#6282B0', // bg4
  '#6282B0', // bg5
  '#6282B0', // bg6
  '#ffffff', // bg7
  '#6282B0', // bg8
  '#6282B0', // bg9
  '#6282B0', // bg10
  '#6282B0', // bg11
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
}, 12000);

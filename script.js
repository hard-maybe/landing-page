const images = [
  "images/bg1.jpg",
  "images/bg2.jpg",
  "images/bg3.jpg",
  "images/bg4.jpg",
  "images/bg5.jpg",
  "images/bg6.jpg",
  "images/bg7.jpg",
  "images/bg8.jpg",
  "images/bg9.jpg",
  "images/bg10.jpg",
  "images/bg11.jpg",
  "images/bg12.jpg"
];

let index = 0;
let showingFirst = true;

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

// Set initial image
bg1.style.backgroundImage = `url(${images[0]})`;
bg1.style.opacity = 1;
bg2.style.opacity = 0;

setInterval(() => {
  index = (index + 1) % images.length;

  const nextBg = showingFirst ? bg2 : bg1;
  const currentBg = showingFirst ? bg1 : bg2;

  nextBg.style.backgroundImage = `url(${images[index]})`;
  nextBg.style.opacity = 1;
  currentBg.style.opacity = 0;

updateUIColorByIndex(index);
  
  showingFirst = !showingFirst;
}, 6000);




function colorForIndex(i) {
  // light images → dark UI
  if ([0, 2, 6].includes(i)) {
    return '#ffffff';
  }
  // dark images → light UI
  return '#6282B0';
}


const root = document.documentElement;

function updateUIColorByIndex(i) {
  root.style.setProperty('--ui-color', colorForIndex(i));
}

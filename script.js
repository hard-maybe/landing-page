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

  showingFirst = !showingFirst;
}, 6000);


const bgColors = [
  "#6282b0", // bg1
  "#ffffff", // bg2
  "#6282b0", // bg3
  "#6282b0", // bg4
  "#6282b0", // bg5
  "#6282b0", // bg6
  "#6282b0", // bg7
  "#6282b0", // bg8
  "#6282b0", // bg9
  "#6282b0", // bg10
  "#6282b0", // bg11
  "#6282b0"  // bg12
];

const totalImages = 12;
const interval = 6000; // MUST match your fade spacing

let current = 0;

function updateUIColor() {
  document.documentElement.style.setProperty(
    "--ui-color",
    bgColors[current]
  );

  current = (current + 1) % totalImages;
}

// initial
updateUIColor();

// sync with background cycle
setInterval(updateUIColor, interval);



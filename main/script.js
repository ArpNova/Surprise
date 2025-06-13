


// ================= CUBE ROTATION ===================

const container = document.getElementById("cubeContainer");
const cube = document.getElementById("cube");

let startX, startY, rotateX = 0, rotateY = 0;
let isDragging = false;
let isAutoRotating = false;
let animationFrameId;

// Smooth auto-rotate using requestAnimationFrame
function animate() {
  if (!isAutoRotating) return;
  rotateY += 0.25;
  rotateX += 0.2;
  cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  animationFrameId = requestAnimationFrame(animate);
}

function startAutoRotate() {
  if (isAutoRotating) return;
  isAutoRotating = true;
  animate();
}

function stopAutoRotate() {
  isAutoRotating = false;
  cancelAnimationFrame(animationFrameId);
}

// Touch Events
let isTouchMoving = false;
container.addEventListener("touchstart", (e) => {
  container.classList.add("hover-effect");
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  stopAutoRotate();
});

container.addEventListener("touchmove", (e) => {
  e.preventDefault();
  if (!isTouchMoving) {
    requestAnimationFrame(() => {
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      rotateY += dx * 0.5;
      rotateX -= dy * 0.5;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      startX = touch.clientX;
      startY = touch.clientY;
      isTouchMoving = false;
    });
    isTouchMoving = true;
  }
}, { passive: false });

container.addEventListener("touchend", () => {
  container.classList.remove("hover-effect");
  startAutoRotate();
});
container.addEventListener("touchcancel", () => {
  container.classList.remove("hover-effect");
  startAutoRotate();
});

// Mouse Drag Events
let isMouseMoving = false;
container.addEventListener("mouseenter", () => {
  container.classList.add("hover-effect");
  stopAutoRotate();
});
container.addEventListener("mouseleave", () => {
  container.classList.remove("hover-effect");
  isDragging = false;
  startAutoRotate();
});
container.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  stopAutoRotate();
});
document.addEventListener("mousemove", (e) => {
  if (!isDragging || isMouseMoving) return;
  requestAnimationFrame(() => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    rotateY += dx * 0.5;
    rotateX -= dy * 0.5;
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    startX = e.clientX;
    startY = e.clientY;
    isMouseMoving = false;
  });
  isMouseMoving = true;
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  startAutoRotate();
});

startAutoRotate();


// ================= CLOUD ANIMATION ===================

const cloudContainer = document.getElementById('cloud-screen');
const cloudCount = 30; // Reduced for better performance

for (let i = 0; i < cloudCount; i++) {
  const cloud = document.createElement('img');
  cloud.src = "../images/download.png"; // Use optimized images
  cloud.classList.add('cloud');

  const fromLeft = Math.random() > 0.5;

  cloud.style.animation = `
    ${fromLeft ? 'moveLeftToRight' : 'moveRightToLeft'}
    ${4 + Math.random() * 6}s
    ease-in-out
    ${Math.random() * 3}s
    forwards
  `;
  cloud.style.top = `${Math.floor(Math.random() * 85)}%`;
  cloud.style.left = fromLeft ? "-15vw" : "115vw";

  const size = 180 + Math.random() * 80;
  cloud.style.width = `${size}px`;

  cloudContainer.appendChild(cloud);
}

// Show main content after clouds fade
setTimeout(() => {
  document.body.classList.add("loaded");
}, 1500);


// ================= STAR BACKGROUND ===================

const starsContainer = document.getElementById('stars');
const starCount = 60; // Reduced for smoother experience

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${1 + Math.random() * 3}s`;
  star.style.opacity = Math.random();
  starsContainer.appendChild(star);
}


// ================= BUTTON SHOW + REDIRECT ===================

window.addEventListener('load', () => {
  setTimeout(() => {
    console.log("Button should now be visible");
    document.body.classList.add('loaded');
    const navBtn = document.getElementById('navBtn');
    if (navBtn) {
      navBtn.classList.add('show');
    }
  }, 2000);
});

function goToNextPage() {
  window.location.href = '../celebration-page/index.html';
}

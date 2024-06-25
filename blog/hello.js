document.addEventListener("DOMContentLoaded", function () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Detect Android
  if (/android/i.test(userAgent)) {
    document.body.classList.add("android");
  }

  // Detect iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    document.body.classList.add("ios");
  }
});
const work = [
  "Front-end Engineer",
  "Front-end Web Developer",
  "Frontend Developer",
  "Web Developer",
];
const w = document.getElementById("work");
let currentIndex = 0;
function workContent() {
  w.textContent = work[currentIndex];
  currentIndex = (currentIndex + 1) % work.length;
}
workContent();
setInterval(workContent, 5000);

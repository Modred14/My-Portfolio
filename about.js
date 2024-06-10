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

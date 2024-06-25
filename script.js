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
const work2 = [
  "Front-end Engineer",
  "Front-end Web Developer",
  "Frontend Developer",
  "Web Developer",
];
const wor = document.getElementById("work2");
let currentWorkIndex = 0;
function workCon() {
  wor.textContent = work2[currentWorkIndex];
  currentWorkIndex = (currentWorkIndex + 1) % work2.length;
}
workCon();
setInterval(workCon, 5000);
const work3 = [
  "Front-end Engineer",
  "Front-end Web Developer",
  "Frontend Developer",
  "Web Developer",
];
const wo = document.getElementById("work3");
let currentWorIndex = 0;
function workCo() {
  wo.textContent = work3[currentWorIndex];
  currentWorIndex = (currentWorIndex + 1) % work3.length;
}
workCo();
setInterval(workCo, 5000);

function hire() {
  window.location.href = "mailto:favourdomirin@gmail.com";
}
function back() {
  window.location.href = "/resume.html";
}
function downloaded() {
  alert(
    'Your download has started successfully and will be completed shortly. Check your files, typically in the download folder, for the "Omirin Favour Resume".'
  );
}
function downloaded2() {
  window.open("./Omirin Favour resume.pdf", "_blank");
}

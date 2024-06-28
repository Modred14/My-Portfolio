document.addEventListener("DOMContentLoaded", function () {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.body.classList.add("ios");
  }
});

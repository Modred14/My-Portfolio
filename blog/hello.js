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

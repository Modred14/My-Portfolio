function openSideBar() {
  var sidebar = document.getElementById("sidebar");
  var menu = document.getElementById("menu");
  var content = document.querySelector(".main");
  if (sidebar.style.maxWidth === "300px") {
    sidebar.style.maxWidth = "0";
    content.classList.remove("blurred");
  } else {
    sidebar.style.maxWidth = "300px";
    content.classList.add("blurred");
  }

  document.addEventListener("click", function (event) {
    if (!sidebar.contains(event.target) && !menu.contains(event.target)) {
      sidebar.style.maxWidth = "0";
      content.classList.remove("blurred");
    }
  });
}

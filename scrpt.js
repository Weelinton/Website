document.addEventListener("DOMContentLoaded", () => {
  // Handle nav link clicks
  const navLinks = document.querySelectorAll(".navbar__links");

  navLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault(); // stop default <a> behavior
      const targetPage = link.getAttribute("href");
      window.location.href = targetPage; // navigate with JS
    });
  });

  // Handle logo click
  const logo = document.getElementById("navbar__logo");
  if (logo) {
    logo.addEventListener("click", event => {
      event.preventDefault();
      window.location.href = "index.html";
    });
  }
});

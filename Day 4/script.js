const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode")
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
});

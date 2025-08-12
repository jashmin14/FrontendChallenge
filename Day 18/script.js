document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    alert(`You clicked on: ${img.alt}`);
  });
});

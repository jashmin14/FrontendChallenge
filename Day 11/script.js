const toggle = document.getElementById("toggleSwitch");
const prices = document.querySelectorAll(".price");

toggle.addEventListener("change", () => {
  prices.forEach((price) => {
    const monthly = price.getAttribute("data-monthly");
    const yearly = price.getAttribute("data-yearly");

    if (toggle.checked) {
      price.textContent = `$${yearly}/yr`;
    } else {
      price.textContent = `$${monthly}/mo`;
    }
  });
});

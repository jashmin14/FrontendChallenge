const images = [
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
];

let index = 0;
const slide = document.getElementById("slide");

function showImage(i) {
  slide.src = images[i];
}

document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % images.length;
  showImage(index);
});

document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
});

// Auto-slide every 4 seconds
setInterval(() => {
  index = (index + 1) % images.length;
  showImage(index);
}, 4000);

"use strict;"

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

showSlides();

function showSlides() {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex].classList.add("active");
  slides[slideIndex].style.display = "block";
  slideIndex++;
  if (slideIndex > slides.length - 1) slideIndex = 0;
  setTimeout(showSlides, 3000);
}

for (i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function(e) {
    slideIndex = e.target.id;
  });
}

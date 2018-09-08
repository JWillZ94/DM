"use strict;"

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

showSlides();

function showSlides() {
  let i;
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].className = slides[i].className.replace(" fade-slide", "");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex].classList.add("active");
  slides[slideIndex].style.display = "block";
  slides[slideIndex].classList.add("fade-slide");
  slideIndex++;
  if (slideIndex > slides.length - 1) slideIndex = 0;
  setTimeout(showSlides, 10000);
}

for (i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function(e) {
    slideIndex = e.target.id;
  });
}

$(document).ready(function() {

  const body4pos = $('#body-4').offset();

  $('#body-4-content').animate({ opacity: 0 }, 0);

  // Scroll function
  $(window).bind('scroll', function() {

    if ($(window).scrollTop() > body4pos.top - 400) {
      $('#body-4-content')
        .animate({
          opacity: 1,
          right: "0px"
        }, 2000);
    }

  });

});

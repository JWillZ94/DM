"use strict;"

let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");
showSlides();

for (i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function(e) {
    slideIndex = e.target.id;
  });
}

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

const body2content = document.getElementById('body-2-content');

// jQuery =======================================

// const searchInput = document.getElementById('search-input');
// const searchIcon = document.getElementsByClassName('fa-search');

$(document).ready(function() {

  // $(searchInput).hide();
  //
  // $(searchIcon).click(function() {
  //   $(searchInput).toggle('slide');
  // });

  const navpos = $('.nav-section').offset();
  const body2pos = $('#body-2').offset();
  const body2content = document.getElementById('body-2-content');
  $(body2content).animate({ opacity: 0 }, 0);

  $(window).bind('scroll', function() {
    if ($(window).scrollTop() > navpos.top) {
      $('nav').addClass('fixed');
      $('body').css("marginTop", "51px");
    } else {
      $('nav').removeClass('fixed');
      $('body').css("marginTop", "0px");
    }

    if ($(window).scrollTop() > body2pos.top - 300) {
      $(body2content)
        .animate({
          opacity: 1,
          top: "0px"
        }, 2000);
    }
  });

  // Updates blog post
  $('.update-form').submit(function(e) {
    $.ajax({
      url: '/blog/' + e.target.id,
      method: 'PUT',
      data: {
        title: $('#edit-title').val(),
        content: $('#edit-content').val(),
        last_updated: $('#edit-last-updated').val()
      }
    })
    .done((data) => {
      console.log(data.last_updated);
    });
  });


  // Deletes blog post
  $('.delete').click(function(e) {
    $.ajax({
      url: '/blog/' + e.target.id,
      method: 'DELETE',
      data: {
        id: e.target.id
      }
    })
    .done((data) => {
      window.location.href = '/admin';
    });
  });

});

"use strict;"

const slides = document.getElementsByClassName("slide");
let currentSlide = slides[0];
for (let slide of slides) {
  slide === currentSlide
    ? slide.style.display = "block"
    : slide.style.display = "none";
}

const dots = document.getElementsByClassName("dot");
let currentDot = dots[0];
for (let dot of dots) {
  dot === currentDot
    ? dot.classList.add("active")
    : dot.classList.remove("active");
}

// jQuery =======================================

// const searchInput = document.getElementById('search-input');
// const searchIcon = document.getElementsByClassName('fa-search');
const navSection = document.getElementsByClassName('nav-section');

$(document).ready(function() {

  // $(searchInput).hide();
  //
  // $(searchIcon).click(function() {
  //   $(searchInput).toggle('slide');
  // });

  var navpos = $('.nav-section').offset();
  $(window).bind('scroll', function() {
    if ($(window).scrollTop() > navpos.top) {
      $('nav').addClass('fixed');
      $('body').css("marginTop", "51px");
    } else {
      $('nav').removeClass('fixed');
      $('body').css("marginTop", "0px");
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

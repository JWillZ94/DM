"use strict;"

$(document).ready(function() {

  // Position of the section
  const ag1pos = $('.about-group-1').offset();
  const ag2pos = $('.about-group-2').offset();

  // Animation to make the content hidden
  $('#ag1-content').animate({ opacity: 0 }, 0);
  $('#ag2-content').animate({ opacity: 0 }, 0);

  // Scroll function
  $(window).bind('scroll', function() {

    // From bottom
    if ($(window).scrollTop() > ag1pos.top - 300) {
      $('#ag1-content')
        .animate({
          opacity: 1,
          bottom: "0px"
        }, 2000);
    }

    if ($(window).scrollTop() > ag2pos.top - 300) {
      $('#ag2-content')
        .animate({
          opacity: 1,
          bottom: "0px"
        }, 2000);
    }
  });

});

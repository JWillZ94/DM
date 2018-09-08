"use strict;"

$(document).ready(function() {

  // Position of the section
  // const introVidPos = $('#intro-vid').offset();
  const body3pos = $('#body-3').offset();

  // Animation to make the content hidden
  $('#body-3-content').animate({ opacity: 0 }, 0);

  // Scroll function
  $(window).bind('scroll', function() {

    // From left
    if ($(window).scrollTop() > body3pos.top - 400) {
      $('#body-3-content')
        .animate({
          opacity: 1,
          left: "0px"
        }, 2000);
    }

  });

  $('#vid').animate({ opacity: 0 }, 0);
  $('#vid').animate({ opacity: 1 }, 2000);

});

"use strict;"

$(document).ready(function() {

  // Position of the section
  // const introVidPos = $('#intro-vid').offset();
  const body3pos = $('#body-3').offset();
  const body4pos = $('#body-4').offset();

  // Animation to make the content hidden
  // $('#intro-vid-content').animate({ opacity: 0 }, 0);
  $('#body-3-content').animate({ opacity: 0 }, 0);
  $('#body-4-content').animate({ opacity: 0 }, 0);

  // Scroll function
  $(window).bind('scroll', function() {

    // From top
    // if ($(window).scrollTop() > introVidPos.top - 300) {
    //   $('#intro-vid-content')
    //     .animate({
    //       opacity: 1,
    //       top: "0px"
    //     }, 2000);
    // }

    // From left
    if ($(window).scrollTop() > body3pos.top - 300) {
      $('#body-3-content')
        .animate({
          opacity: 1,
          left: "0px"
        }, 2000);
    }

    // From right
    if ($(window).scrollTop() > body4pos.top - 300) {
      $('#body-4-content')
        .animate({
          opacity: 1,
          right: "0px"
        }, 2000);
    }

  });

});

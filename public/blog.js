"use strict;"

$(document).ready(function() {

  const blogPostPos = $('.blog-post').offset();

  $('.blog-post').animate({ opacity: 0 }, 0);

  $(window).bind('scroll', function() {

    if ($(window).scrollTop() > blogPostPos.top - 400) {
      $('.blog-post')
        .animate({
          opacity: 1,
          bottom: "0px"
        }, 2000);
    }

  });



});

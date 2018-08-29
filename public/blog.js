"use strict;"

$(document).ready(function() {

  const blogPosts = $(".blog-post");

  let rand1, rand2;
  let ogTop, ogLeft;

  for (let post of blogPosts) {
    $.data($(post), {
      "ogTop": $(post).position().top,
      "ogLeft": $(post).position().left
    });
  }

  float(rand1, rand2);

  function float(rand1, rand2) {
    for (let post of blogPosts) {
      console.log($(post).ogTop);
      // console.log($(post).position().top)
      // console.log($(post).position().left)
      rand1 = Math.floor(Math.random() * 50);
      rand2 = Math.floor(Math.random() * 50);
      if (
        $(post).getBoundingClientRect().top - $(post).position().top === 100 
      ) {

      }
      $(post).animate({
        left: `+=${rand1}px`,
        top: `+=${rand2}px`
      }, 2000);
    }
    // float(rand1, rand2);
  }





});

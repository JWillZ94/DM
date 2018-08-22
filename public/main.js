"use strict;"

// jQuery =======================================

// const searchInput = document.getElementById('search-input');
// const searchIcon = document.getElementsByClassName('fa-search');

$(document).ready(function() {

  // $(searchInput).hide();
  //
  // $(searchIcon).click(function() {
  //   $(searchInput).toggle('slide');
  // });

  // Makes the post div a link to the article
  $(".post").click(function () {
    window.location = $(this).find("a").attr("href");
    return false;
  });

  // Position of the section
  const navpos = $('.nav-section').offset();

  // Scroll function
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
        last_update: $('#edit-last-update').val()
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

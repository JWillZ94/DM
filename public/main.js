// var searchInput = document.getElementById('search-input');
// var searchIcon = document.getElementsByClassName('fa-search');
var navSection = document.getElementsByClassName('nav-section');


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

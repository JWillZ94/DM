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
    } else {
      $('nav').removeClass('fixed');
    }
  });

  $.ajax({
      url: "/blog/articles",
      dataType: 'json'
    })
    .done(function(data) {
      $.map(data, post => {
        $('#posts').append(
          `
            <h3><a href="/blog/article/${post.title}">${post.title}</a></h3>
            <p>${post.content}</p>
            <p>${post.post_date}</p>
            <p>${post.last_update}</p>
          `
        );
      });
    });

  $.ajax({
      url: "/blog/articles",
      dataType: 'json'
    })
    .done(function(data) {
      $.map(data, post => {
        $('#article').append(
          `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p>${post.post_date}</p>
            <p>${post.last_update}</p>
          `
        );
      });
    });

});

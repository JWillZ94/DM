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
      url: "/blog/api/posts",
      dataType: 'json'
    })
    .done(function(data) {
      $.map(data, post => {
        $('#posts').append(
          `
            <h3><a href="/article">${post.title}</a></h3>
            <p>${post.content}</p>
            <p>${post.post_date}</p>
            <p>${post.last_update}</p>
            <p>${post._id}</p>
          `
        );
      });
    });

  $.ajax({
      url: "/blog/api/posts",
      data: {
        
      }
      dataType: 'json'
    })
    .done(function(data) {
      $.map(data, post => {
        $('#posts').append(
          `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <p>${post.post_date}</p>
            <p>${post.last_update}</p>
            <p>${post._id}</p>
          `
        );
      });
    });

});

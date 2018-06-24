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

  $('.post').click(function(e) {
    $.get("/blog/" + e.target.id, function(post) {
      $('#posts')
        .empty()
        .append(
          `
            <div>
              <p>${post._id}</p>
              <p>${post.title}</p>
              <p>${post.content}</p>
              <a href="/blog" id="back"><<<< View All Blog Posts</a>
            </div>
          `
        );
    })
  });

});

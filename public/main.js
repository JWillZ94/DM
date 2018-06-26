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
              <a href="/edit/${post._id}">Edit Post</a>
              <br>
              <a href="/blog" id="back"><<<< View All Blog Posts</a>
            </div>
          `
        );
    })
  });

  // $('.update-form').submit(function(e) {
  //   e.preventDefault();
  //   let updateForm = document.getElementById('${e.target.id}');
  //   let postData = new FormData(updateForm);
  //   console.log(postData);
  //   $.ajax({
  //     url: '/edit/' + e.target.id,
  //     method: 'PUT',
  //     data: {
  //
  //     }
  //   });
  // });


});

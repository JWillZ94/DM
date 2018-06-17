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
            <div class="post" id="${post._id}">
              <h3>
                <a href="/article/api/posts/${post._id}" id="${post._id}">${post.title}</a>
              </h3>
              <p>${post.content}</p>
              <p>${post.post_date}</p>
              <p>${post.last_update}</p>
              <p>${post._id}</p>
            </div>
          `
        );
      });
      $('.post').click(function(e) {
        $.ajax({
          url: "/blog/api/posts/" + e.currentTarget.id,
          dataType: 'json'
        })
          .done(function(articleData) {
            $('#posts')
              .empty()
              .append(
                `
                  <div id="${articleData._id}">
                    <h3>${articleData.title}</h3>
                    <p>${articleData.content}</p>
                    <p>${articleData._id}</p>
                  </div>
                  <button class="back">Back</button>
                `
              );
          });
      });
      $('#posts').on('click', 'button.back', function(e) {
        $.ajax({
          url: "/blog/api/posts",
          dataType: 'json'
        })
          .done(function(data) {
            $.map(data, post => {
              $('#posts')
                .empty()
                .append(
                  `
                    <div class="post" id="${post._id}">
                      <h3>
                        <a href="/article/api/posts/${post._id}" id="${post._id}">${post.title}</a>
                      </h3>
                      <p>${post.content}</p>
                      <p>${post.post_date}</p>
                      <p>${post.last_update}</p>
                      <p>${post._id}</p>
                    </div>
                  `
                );
            });
          });
      });

    });

  // $.ajax({
  //     url: "/blog/api/posts/" + id,
  //     data: {
  //       ":_id": id
  //     },
  //     dataType: 'json'
  //   })
  //   .done(function(data) {
  //     for (var i = 0; i < data.length; i++) {
  //       console.log(data[i]._id);
  //     }
  //     $.map(data, post => {
  //       $('#article').append(
  //         `
  //           <h3>${post.title}</h3>
  //           <p>${post.content}</p>
  //           <p>${post.post_date}</p>
  //           <p>${post.last_update}</p>
  //           <p>${post._id}</p>
  //         `
  //       );
  //     });
  //   });

});

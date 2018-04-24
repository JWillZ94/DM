var searchInput = document.getElementById('search-input');
var searchIcon = document.getElementsByClassName('fa-search');


$(document).ready(function() {
  $(searchIcon).click(function() {
    $(searchInput).animate({
      width: 'toggle'

    }, 3000, function() {
      // (this).css('visibility', 'hidden');
    });

  });


});

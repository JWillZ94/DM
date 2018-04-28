var searchInput = document.getElementById('search-input');
var searchIcon = document.getElementsByClassName('fa-search');


$(document).ready(function() {

  $(searchInput).hide();

  $(searchIcon).click(function() {
    $(searchInput).toggle('slide');
  });

});

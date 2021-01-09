$(document).ready(function() {
  $("#cf7_controls").on('click', 'span', function() {
    $("#cf7 img").removeClass("opaque");

    var newImage = $(this).index();

    $("#cf7 img").eq(newImage).addClass("opaque");

    $("#cf7_controls span").removeClass("selected");
    $(this).addClass("selected");
  });
});

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function DropDown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;
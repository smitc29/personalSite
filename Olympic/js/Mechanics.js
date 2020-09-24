$(document).ready(function(){
    $(".flip").click(function(){
        $(".panel").slideToggle("fast");
    });
});
	
$(document).ready(function(){
    $(".flip01").click(function(){
        $(".panel01").slideToggle("fast");
    });
});
	
$(document).ready(function(){
    $(".flip02").click(function(){
        $(".panel02").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip03").click(function(){
        $(".panel03").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip04").click(function(){
        $(".panel04").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip05").click(function(){
        $(".panel05").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip06").click(function(){
        $(".panel06").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip07").click(function(){
        $(".panel07").slideToggle("fast");
    });
});

$(document).ready(function(){
    $(".flip08").click(function(){
        $(".panel08").slideToggle("fast");
    });
});

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

// Slideshow Mechanics
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}
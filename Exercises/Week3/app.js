var main = function () {
  "use strict";
  
  $(".comment-input button").on("click", function () {
    var $newP;
  
    $newP = $("<p>");
    // add text to <p>
    $newP.text("My New Element");
    // select comment, append variable 
    $(".comments").append($newP);
  });
};

$(document).ready(main);

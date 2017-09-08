var main = function () {
  "use strict";
  
  $(".comment-input button").on("click", function () {
    var $comment_text = $(".comment-input input");
    
    if ($comment_text.val() !== "") {
      var $new_comment = $("<p>");
      // set the input text to the <p> 
      $new_comment.text($comment_text.val());
      $(".comments").append($new_comment);
      // set val to empty, ensure the input box is cleared
      $comment_text.val("");
    }
  });
};

$(document).ready(main);

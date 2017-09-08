var main = function () {
  "use strict";
  
  $(".comment-input button").on("click", function () {
    var $comment_text = $(".comment-input input");
    
    if ($comment_text.val() !== "") {
      var $new_comment = $("<p>");
      // set the input text to the <p> 
      $new_comment.text($comment_text.val());
      $new_comment.hide();
      $(".comments").append($new_comment);
      // set val to empty, ensure the input box is cleared
      $new_comment.fadeIn(4000);
      $comment_text.val("");
    }
  });
};

$(document).ready(main);


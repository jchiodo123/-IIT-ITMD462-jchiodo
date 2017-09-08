var main = function () {
  "use strict";
  
  $(".comment-input button").on("click", function () {
    var $new_comment;
    var comment_text;
    
    comment_text = $(".comment-input input").val();
    $new_comment = $("<p>");
    // set the input text to the <p> 
    $new_comment.text(comment_text);
    $(".comments").append($new_comment);
  });
};

$(document).ready(main);

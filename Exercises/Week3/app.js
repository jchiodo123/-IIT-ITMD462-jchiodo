var main = function () {
  "use strict";
  
  $(".comment-input input").on("keypress", function (event) {
    
    console.log("this is the keyCode " + event.keyCode);
    
    var $comment_text = $(".comment-input input");
    
    if (event.keyCode === 13) {
      if ($comment_text.val() !== "") {
        var $new_comment = $("<p>");
        // set the input text to the <p> 
        $new_comment.text($comment_text.val());
		    $(".comments").append($new_comment);
		    // set val to empty, ensure the input box is cleared
		    $comment_text.val("");
      }
    }
  });
};
$(document).ready(main);

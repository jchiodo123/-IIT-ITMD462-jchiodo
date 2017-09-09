var main = function () {
  "use strict";

  var addCommentFromInputBox = function () {
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
  };

  $(".comment-input button").on("click", function () {
    addCommentFromInputBox();
  });

  $(".comment-input input").on("keypress", function (event) {
    if (event.keyCode === 13) {
      addCommentFromInputBox();
    }
  });
};

$(document).ready(main);


var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/toys",
      data: JSON.stringify(example)
    });
  },
  saveComment: function(id, thisComment) {
    var setComment = {
      comments: thisComment
      };
    return $.ajax({
      type: "PUT",
      url: "../api/toys/" + id,
      data: setComment
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/toys",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/toys/" + id,
      type: "DELETE"
    });
  }
};
        $(document).on("click", "#comment-submit", function(event) {
        event.preventDefault();
        var previous = $("#these-comments").text();
        var id = $("#comment-submit").val();
        var comment;
        var newDiv = $("<p>")
        if (previous == "") {
          comment = $("#toy-comment").val().trim();
        }
        else {
          comment = previous + "\n" + $("#toy-comment").val().trim();
        }
      
        API.saveComment(id, comment).then(function() {
          $("#toy-comment").val("");
          location.reload();
        });
      });


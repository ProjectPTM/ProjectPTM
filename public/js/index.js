// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var picPath;

// The API object contains methods for each kind of request we'll make
var API = {
  grabUser: function() {
    return $.ajax({
      url: "/api/user_data",
      type: "GET"
    });
  },
  saveComment: function(id, thisComment) {
    var setComment = {
      comments: thisComment
      };
    return $.ajax({
      type: "PUT",
      url: "api/toys/" + id,
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

API.grabUser().then(function(data) {
  var thisUser = data.email;
  if (thisUser !== undefined) {
    $("#user-name").append(thisUser);
  }
});

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var toy = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim(),
    photoPath: picPath
  };

  if (!(toy.text && toy.description)) {
    alert("You must enter a toy text and description!");
    return;
  }
  API.saveExample(toy).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

$(document).on("click", "#comment-submit", function(event) {
  event.preventDefault();
  var comment = $("#toy-comment").val().trim();
  var id = $("#comment-submit").val();
 
  API.saveComment(id, comment).then(function() {
    console.log("comment saved");
  });
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

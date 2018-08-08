// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var picPath;

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/toys",
      data: JSON.stringify(example)
    });
  },
  saveComment: function(id, thisComment) {
    var setComment = {
      comments: thisComment
      };
    return $.ajax({
      type: "PUT",
      url: "/api/toys/" + id,
      data: setComment
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "../api/toys",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "/api/toys/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(toy) {
      var $a = $("<a>")
        .text(toy.text)
        .attr("href", "/toys/" + toy.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": toy.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

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
    console.log("This might work someday");
  });
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
// $("#comment-submit").on("click", submitComment);

  document.getElementById("upload_widget_opener").addEventListener("click", function() {
    cloudinary.openUploadWidget({ cloud_name: 'dbs2wbyop', upload_preset: 'qhyp62og', folder: 'user_photos'}, 
    function(error, result) { 
        picPath = result[0].url;
        console.log(error, result) });
  }, false);

  refreshExamples();
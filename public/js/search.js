var source = $("#database-template").html(); 
var template = Handlebars.compile(source); 

var API = {
    getExamples: function() {
        return $.ajax({
        url: "api/toys/sort",
        type: "GET"
        });
    }
}

$(document).ready(function() {
    API.getExamples().then(function(data) {
        $("#table").append(template(data));
    });
});



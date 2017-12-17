var topics = ["hungry", "drunk", "sleepy", "happy"]


function renderButtons() {

        // (this is necessary otherwise you will have repeat buttons)
        $(".buttons").empty();

       
        for (var i = 0; i < topics.length; i++) {
        	var gifButton = $('<input type="button" value="' + topics[i] + '"/>');
        	console.log(gifButton)
       // $(".buttons").append("<button type='button' id = 'buttons' class='btn btn-primary btn-lg buttonClicked'>" + topics[i] + "</button>")
       gifButton.attr("data-name", topics[i])
        $(".buttons").append(gifButton);
        }

        
      };


$(".submit").on("click", function(event) {

	event.preventDefault();
	var newTopic = $("#submittalform").val().trim()
	topics.push(newTopic)
	renderButtons()
})

function displayGifs() {
	console.log("cat")
	$("#gifsHere").empty();
	var gifsName = $(this).attr("data-name");
	console.log(gifsName)
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lzcGYta9bfMdDiwu3ZImzoJH3rgRatgC&q=" + gifsName + "&limit=10&offset=0&&lang=en";
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	for (var i = 0; i < response.data.length - 1; i++) {
    		// Saves the URL for both still and moving GIFs into variables to use later
    		var stillGif = response.data[i].images.fixed_height_still.url;
    		var movingGif = response.data[i].images.fixed_height.url;
    		// Saves the rating into a variable for later
    		var rating = response.data[i].rating;
    		// creates an image tag to put into the HTML
    		var gifImage = $("<img>");
    		//Adds the src attribute and url to the image tag, and alt text, and still state
    		gifImage.attr("data-state", "still")
    		gifImage.attr("data-still", stillGif)
    		gifImage.attr("data-animate", movingGif)
        	gifImage.attr("src", stillGif);
        	gifImage.attr("alt", "gif image");
        	gifImage.addClass("gifType");
        	// Puts the GIF on the HTML
        	$("#gifsHere").prepend(gifImage, "rated: " + rating);

        }
    	
    });
};
// Add an on click event to change from still to moving and back
function animation(){
    var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate")                    
        }else{
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still")
        }
    };
$(document).on("click", ".buttons", displayGifs);

// Add on click even to animate gifs
$(document).on("click", ".gifType", animation)
// Starts the website with a few buttons



renderButtons()



var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $prevArrow = $("<div id='prevArrow'></div>");
var $nextArrow = $("<div id='nextArrow'></div>");
var $galleryLength = $("#image-gallery li").length;
var $testGallery = $('<ul id="testGallery"></ul>');
var $filterAlert = $('<div id="filter-alert"></div>');

//Keep track of the image index for previous and next arrows.
var $index = 0;

//create overlay
$overlay.append($prevArrow);
$overlay.append($image);
$overlay.append($nextArrow);
$overlay.append($caption);
$overlay.append($filterAlert);

//add hidden overlay to body
$("body").append($overlay);


var filterAlert = function() {
	var filterMessage = "Viewing ";
	filterMessage += $galleryLength;
	filterMessage += " filtered result(s).";
	$filterAlert.text(filterMessage);

	$filterAlert.append("<a href='index.html'>Remove Filter</a>")

};

//Updating overlay helper function
var updateImage = function(imageLocation, imageCaption) {
	
	//update the overlay with the image in the link
	$image.attr("src", imageLocation); 

	//get child <title> attribute and set caption
	$caption.text(imageCaption);

};

//Click on an image in the gallery
$("#image-gallery a").click(function(event){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	var imageCaption = $(this).children("img").attr("title");

	//Sets index value based on current selected image
	$index = $(this).parent().index();

	//call the Update overlay function
	updateImage(imageLocation, imageCaption);

	//Show the overlay
	$('#overlay').show();

	//Show alert if results are filtered results
	if ($("#testGallery li").length > 0) {
		filterAlert();
		$("#filter-alert").show();
	} else {
		$("#filter-alert").hide();
	}

});

//Function making the previous and next buttons work
var prevNext = function(prev) {
	

		if(!prev) { $index ++; }
		else { $index--; } 

	// Making image a courasel
	if ($index < 0) { $index = $galleryLength-1; }
	if ($index > $galleryLength -1) {$index = 0; }

	//Updates the image in the overlay and its caption
	var newImgSelected = $("#image-gallery li").get($index).getElementsByTagName("a");
	var imageLocation = $(newImgSelected).attr("href");
	var imageCaption = $(newImgSelected).children("img").attr("title");

	updateImage(imageLocation, imageCaption);



	
}

$("#prevArrow").click(function(event){
	prevNext(true);
});

$("#nextArrow").click(function(event){
	prevNext();
});

//When overlay is click
$overlay.click(function(event){
  //Hide the overlay  

    if(event.target.id == "overlay")
    $(this).hide("fast");

});


//Problem: Search bar needs to filter images
//Solution: Take input from search bar and filter out images that don't have simular discriptions.
	 
	  function listFilter(header, list) {

		//Dynamicly add a searchbar to the page 
		//I decided to add this to the header with JavaScript
		//because its functionality is dependent of JavaScript
		//If the user has JavaScript disabled the gallery will still work 
		//but they wont have a useless search bar loaded in the html
		var form = $("<form>").attr({"class":"filterform","action":"#"}),
			input = $("<input>").attr({"class":"filterinput","type":"text", "placeholder":"Search"});
		$(form).append(input).appendTo(header);
	 
		$(input)
		  .change( function () {
			var filter = $(this).val();
			if(filter) {

				//Move filtered list elements into a hidden list and hide them.
				$("#image-gallery li a img").each(function () {
					var imgTitle = $(this).attr("title").toUpperCase();
					filter = filter.toUpperCase();
					$('body').append($testGallery);

					if (imgTitle.indexOf(filter) === -1 ) {
						$(this).parent().parent().fadeOut('slow').appendTo("#testGallery");
						$galleryLength = $("#image-gallery li").length;
						;

					}
					if (imgTitle.indexOf(filter) !== -1 ) {
						$(this).parent().parent().fadeIn('slow').appendTo("#image-gallery");
						$galleryLength = $("#image-gallery li").length;
					}

				});

				//Move images back into the main gallery from the hidden gallery.
				$("#testGallery li a img").each(function () {
					var imgTitle = $(this).attr("title").toUpperCase();
					if (imgTitle.indexOf(filter) > -1 ) {
						$(this).parent().parent().fadeIn('slow').appendTo("#image-gallery");
						$galleryLength = $("#image-gallery li").length;
						console.log("Take it back!");
					}
				});

				if ($galleryLength === 0) {
					console.log("No matching results found.")
				}

			

			} else {
				
				//If search field is emptied add all images to the main gallery
				$("#testGallery li").each(function(){
					$(this).appendTo("#image-gallery");
				});

				//Shows all images when the search field is emptied
				$("#image-gallery li").fadeIn('slow');
				$galleryLength = $("#image-gallery li").length;
			}
		  })
		.keyup( function () {
			$(this).change();
		});
	  }
	
	  $(function () {
		listFilter($(".main-header"), $("#image-gallery"));
	  });









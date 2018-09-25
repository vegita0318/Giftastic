 
 var superHeroes = ["Captain America", "Iron Man", "Thor", "The Hulk", "Captain Marvel", "Wolverine"];

 function renderButtons() {

    $("#superHeroField").empty();

    for (var i = 0; i < superHeroes.length; i++) {
        var button = $("<button>");
        button.addClass("button");
        button.attr("value", superHeroes[i]);
        button.text(superHeroes[i])

        $("#superHeroField").append(button);
    }
 };

 $("#addHero").on("click", function() {

    var lowerCaseSuperHeroInput = [];
    var newHeroSelection = $("#hero_input").val().trim();
 
    event.preventDefault();

    for (var i = 0; i < superHeroes.length; i++) {
        lowerCaseSuperHeroInput.push(superHeroes[i].toLowerCase());
    }
 
    if (newHeroSelection == "") {
        alert("Enter Your Hero Selection");
    } else if (lowerCaseSuperHeroInput.indexOf(newHeroSelection.toLowerCase()) == -1) {
        superHeroes.push(newHeroSelection);
        renderButtons();
        $("form").trigger("reset");
    } else {
        alert("That Hero has already been used!");
    }

  });

renderButtons();

$("div").on("click", "button", function() { 

    var superHero = $(this).val().trim();
    var apiKey = "&api_key=pRKnwFp5L1N7RFCpufm4BU9I6snPt05K&limit=10";

    var ratinglimiter = "&rating=pg";
    var queryURL =  "https://api.giphy.com/v1/gifs/search?q=" + superHero + apiKey + ratinglimiter;

    $.ajax({
      url:queryURL,
      method: "GET",
    }).done(function(response) {

      $("#superheroPics").empty();

      var results = response.data;

      if (results.length == 0) {
          alert("No Hero pictures found for " + superHero);
      }

      for (var i = 0; i < results.length; i++) {

        var newDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var image = $("<img>");
        var stillURL = results[i].images.fixed_height_still.url;
        var animateURL = results[i].images.fixed_height.url;
      
        image.attr("data-state", "still");

        image.attr("data-still", stillURL);
        image.attr("data-animate", animateURL);

        image.attr("src", stillURL);
        image.addClass("giphy");

        newDiv.addClass("giphy");
        
        newDiv.append(p);
        newDiv.append(image);
        $("#superheroPics").append(newDiv);
      } console.log(response);
  });
});

$("div").on("click", "img", function() { 

    var state = $(this).attr("data-state");
    
    var srcStill = $(this).attr("data-still");
    var srcAnimate = $(this).attr("data-animate");

    if (state === "still") {
      $(this).attr("src", srcAnimate);
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", srcStill);
      $(this).attr("data-state", "still");
    }
});
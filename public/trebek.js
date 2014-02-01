$(document).ready(function(){

  //var game = true;

  //while(game) {



  //}

  //create a function that changes the text on the
  // card when the card is clicked
  //$("div.card").on("click", function(eventObject){
  //  $(this).find("h2").text("it worked!");
  //});
  
  points = 0;
  
  //toggle text
  $("div.card").on("click", function(event) {

    event.stopPropagation();
    event.preventDefault();

    if(!$(this).hasClass("disabled") && !$(this).hasClass("played") && !$(this).hasClass("cat-card")) {

      $(this).addClass("chosen");
      $(this).siblings().removeClass("chosen");

      if($(this).find(".value").is(":visible")){               //if price is showing, show question
        $(this).find(".value").fadeOut();
        $(this).find(".question").fadeIn();
        $("button").removeClass("disabled");
        $(this).siblings().not(".cat-card").addClass("disabled");
      } else if($(this).find(".question").is(":visible")){    //if question is showing, show answer
        $(this).find(".question").fadeOut();
        $(this).find(".answer").fadeIn();
      } else {                                                //if answer is showing, show trebek img
        $(this).find(".answer").fadeOut();
        $(this).siblings().not(".cat-card").removeClass("disabled");
        $(this).addClass("played").removeClass("chosen");
      }

    }

    points = parseInt($(this).find(".value").text());

  });

  //make + and - buttons work
    $(".player button.up").on("click", function(event) {
      if(!$(this).hasClass("disabled")){
        var currentScore = parseInt($(this).parent().find("h2").text());
        $(this).parent().find("h2").text(currentScore + points);
        $(".player button").addClass("disabled");
      }
      event.preventDefault();
    });

    $(".player button.down").on("click", function(event) {
      if(!$(this).hasClass("disabled")){
        var currentScore = parseInt($(this).parent().find("h2").text());
        $(this).parent().find("h2").text(currentScore - points);
      }
      event.preventDefault();
    });
});
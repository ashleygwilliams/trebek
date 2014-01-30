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

    if(!$(this).hasClass("disabled") && !$(this).hasClass("played")) {

      $(this).addClass("chosen");
      $(this).siblings().removeClass("chosen");

      if($(this).find(".value").is(":visible")){
        $(this).find(".value").fadeOut();
        $(this).find(".question").fadeIn();
        $(this).siblings().addClass("disabled");
      } else if($(this).find(".question").is(":visible")){
        $(this).find(".question").fadeOut();
        $(this).find(".answer").fadeIn();
      } else {
        $(this).find(".answer").fadeOut();
        $(this).siblings().removeClass("disabled");
        $(this).addClass("played").removeClass("chosen");
      }
      
    }

    points = parseInt($(this).find(".value").text());

  });

  //make + and - buttons work
  $(".player button.up").on("click", function(event) {
    var currentScore = parseInt($(this).parent().find("h2.score").text());
    $(this).parent().find("h2.score").text(currentScore + points);
    event.preventDefault();
  });

  $(".player button.down").on("click", function(event) {
    var currentScore = parseInt($(this).parent().find("h2.score").text());
    $(this).parent().find("h2.score").text(currentScore - points);
    event.preventDefault();
  });
});
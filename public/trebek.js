$(document).ready(function(){

  var game = true;

  //while(game) {



  //}

  //create a function that changes the text on the
  // card when the card is clicked
  //$("div.card").on("click", function(eventObject){
  //  $(this).find("h2").text("it worked!");
  //});

  //toggle text
  $("div.card").on("click", function() {

    // remove chosen class and replace with played class
    $(".chosen").addClass("played").removeClass("chosen").html("");

    //indicate card has been played
    $(this).addClass("chosen");

    var txt = $(this).find("form :checked").val();
    $(this).find("h2").text(txt);
  });

  //make + and - buttons work
  $(".player button.up").on("click", function() {
    var currentScore = parseInt($(this).parent().find("h2.score").text());
    $(this).parent().find("h2.score").text(currentScore + 1);
  });

  $(".player button.down").on("click", function() {
    var currentScore = parseInt($(this).parent().find("h2.score").text());
    $(this).parent().find("h2.score").text(currentScore - 1);
  });
});
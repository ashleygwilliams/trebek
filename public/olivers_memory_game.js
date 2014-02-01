

$(function() {

  //set height of cards based on window height when loaded
  var windowHeight = $(window).height(); 
  $(".container").css("height", windowHeight - windowHeight*0.23);


  function Match(points) {
    this.previous_matches = [];
  } 

  Match.prototype.

  $(".mem_card").on("click", function() {
    $this = $(this)
    $pointValue = $this.find(".points").text()

    var newMatch = new Match($pointValue);

    if($(this).hasClass("two")) {
    } // do something with the match object
  });
});
$(document).ready(function() {

  var $cards = $("div.card");
  var $counter = $("div.score button");

  $cards.on('click', function(){
    var $this = $(this);
    if($this.hasClass("playable")) {
      $this.removeClass("playable");
      $this.addClass("red");
      $(".player1").toggleClass("off");
      $(".player2").toggleClass("off");
    }
  });

});


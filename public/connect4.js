$(document).ready(function() {

  var $cards = $("div.card");
  var $counter = $("div.score button");

  $cards.on('click', function(){
    var $this = $(this);
    if($this.hasClass("playable")) {
      if($(".player2").hasClass("off")) {
        $this.removeClass("playable");
        $this.addClass("red");
      }
      else {
        $this.removeClass("playable");
        $this.addClass("black");
      }
      $(".player1").toggleClass("off");
      $(".player2").toggleClass("off");
      $(".c1.r2").addClass("playable");
      $(".c1.r2").removeClass("disabled");
      // $this.attr("class")
    }
  });

});


$(document).ready(function() {

  var $cards = $("div.card");
  var $counter = $("div.score button");

  $cards.on('click', function(){
    var $this = $(this);
    if($this.hasClass("playable")) {
      var $player1 = $(".player1");
      var $player2 = $(".player2");
      if($player2.hasClass("off")) {
        $this.removeClass("playable");
        $this.addClass("red");
      }
      else {
        $this.removeClass("playable");
        $this.addClass("black");
      }
      $player1.toggleClass("off");
      $player2.toggleClass("off");
      var string = $this.attr("class");
      var matches = string.match(/.+\s(c\d)\sr(\d).+/);
      // find the column
      var newC = "." + matches[1];
      // find the row
      var newR = ".r" + String(Number(matches[2]) + 1);
      var $above = $(newC + newR);
      $above.addClass("playable");
      $above.removeClass("disabled");
    }
  });

});


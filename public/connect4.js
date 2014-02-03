$(document).ready(function() {

  var $cards = $("div.card");
  var $counter = $("div.score button");

  $cards.on('click', function(){
    var $this = $(this);
    if($this.hasClass("playable") && !$this.hasClass("gameOver")) {
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

      // make space above playable
      var string = $this.attr("class");
      var matches = string.match(/.+\sc(\d)\sr(\d)\s(.*)/);
      // find the column
      var newC = ".c" + matches[1];
      // find the row
      var newR = ".r" + String(Number(matches[2]) + 1);
      var $above = $(newC + newR);
      $above.addClass("playable");
      $above.removeClass("disabled");

      // check for a winner
      if(isWinner(Number(matches[1]), Number(matches[2]), matches[3])) {
        $cards.addClass("gameOver");
        if($player2.hasClass("off")) {
          $("div.winner1").show();
        }
        else {
          $("div.winner2").show();
        }
      }
      else {
      // change turns
      $player1.toggleClass("off");
      $player2.toggleClass("off");
      }
    }
  });

function check(col, row, color, direction) {
  if($(".c"+col+".r"+row).hasClass(color)) {
    direction += 1;
    if($(".c"+col+".r"+row).hasClass(color)) {
      direction += 1;
      if($(".c"+col+".r"+row).hasClass(color)) {
        direction += 1;
      }
    }
  }
}

function isWinner(c, r, color) {
  var ne = 1;
  var nw = 1;
  var s = 1;
  var ew = 1;
  check(c+1, r+1, color, ne);
  check(c+1, r, color, ew);
  check(c+1, r-1, color, nw);
  check(c, r-1, color, s);
  check(c-1, r-1, color, ne);
  check(c-1, r, color, ew);
  check(c-1, r+1, color, nw);
  if(ne>=4 || ew>=4 || nw>=4 || s>=4) {
    return true;
  }
});

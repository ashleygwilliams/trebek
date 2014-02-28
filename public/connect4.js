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

  function check(col, row, color, cDelta, rDelta) {
    var inaRow = 1;
    var cInc = cDelta, rInc = rDelta, cDec = cDelta, rDec = rDelta;
    while($(".c"+(col+cInc)+".r"+(row+rInc)).hasClass(color)) {
      inaRow += 1;
      cInc += cDelta;
      rInc += rDelta;
    }
    if (cDelta != 0) {
      while($(".c"+(col-cDec)+".r"+(row-rDec)).hasClass(color)) {
        inaRow += 1;
        cDec += cDelta;
        rDec += rDelta;
      }
    }
    return inaRow;
  }

  function isWinner(c, r, color) {
    var ne = 1, ew = 1, nw = 1, s = 1;
    ne = check(c, r, color, 1, 1);
    ew = check(c, r, color, 1, 0);
    nw = check(c, r, color, 1, -1);
    s = check(c, r, color, 0, -1);
    if(ne>=4 || ew>=4 || nw>=4 || s>=4) {
      return true;
    }
  }
}); 

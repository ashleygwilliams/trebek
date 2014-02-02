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

      // make space above playable
      var string = $this.attr("class");
      var matches = string.match(/.+\s(c\d)\sr(\d)\s(.*)/);
      // find the column
      var newC = "." + matches[1];
      // find the row
      var newR = ".r" + String(Number(matches[2]) + 1);
      var $above = $(newC + newR);
      $above.addClass("playable");
      $above.removeClass("disabled");

      // check for a winner
      if(winner?(Number(matches[1]), Number(matches[2]), matches[3])) {
        // whichever player isn't off wins
      }

      // change turns
      $player1.toggleClass("off");
      $player2.toggleClass("off");
    }
  });

  function winner?(c, r, color) {
    var ne = 1;
    var nw = 1;
    var s = 1;
    var ew = 1;
    if($(".c"+(c+1)+".r"+(r+1)).hasClass(color)) {
      ne += 1;
      if($(".c"+(c+2)+".r"+(r+2)).hasClass(color)) {
        ne += 1;
        if($(".c"+(c+3)+".r"+(r+3)).hasClass(color)) {
          ne += 1;
        }
      }
    }
    if($(".c"+(c+1)+".r"+r).hasClass(color)) {
      ew += 1;
      if($(".c"+(c+2)+".r"+r).hasClass(color)) {
        ew += 1;
        if($(".c"+(c+3)+".r"+r).hasClass(color)) {
          ew += 1;
        }
      }
    }
    if($(".c"+(c+1)+".r"+(r-1)).hasClass(color)) {
      nw += 1;
      if($(".c"+(c+2)+".r"+(r-2)).hasClass(color)) {
        nw += 1;
        if($(".c"+(c+3)+".r"+(r-3)).hasClass(color)) {
          nw += 1;
        }
      }
    }
    if($(".c"+c+".r"+(r-1)).hasClass(color)) {
      s += 1;
      if($(".c"+c+".r"+(r-2)).hasClass(color)) {
        s += 1;
        if($(".c"+c+".r"+(r-3)).hasClass(color)) {
          s += 1;
        }
      }
    }
    if($(".c"+(c-1)+".r"+(r-1)).hasClass(color)) {
      ne += 1;
      if($(".c"+(c-2)+".r"+(r-2)).hasClass(color)) {
        ne += 1;
        if($(".c"+(c-3)+".r"+(r-3)).hasClass(color)) {
          ne += 1;
        }
      }
    }
    if($(".c"+(c-1)+".r"+r).hasClass(color)) {
      ew += 1;
      if($(".c"+(c-2)+".r"+r).hasClass(color)) {
        ew += 1;
        if($(".c"+(c-3)+".r"+r).hasClass(color)) {
          ew += 1;
        }
      }
    }
    if($(".c"+(c-1)+".r"+(r+1)).hasClass(color)) {
      nw += 1;
      if($(".c"+(c-2)+".r"+(r+2)).hasClass(color)) {
        nw += 1;
        if($(".c"+(c-3)+".r"+(r+3)).hasClass(color)) {
          nw += 1;
        }
      }
    }
    if((ne || ew || nw || s) >= 3) {
      return true;
    }
  }

});


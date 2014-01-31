$(document).ready(function() {

  var $playCards = $("div.card").not(".cat-card");
  var $counter = $("div.score button");

  $playCards.on('click', function(){
    var $this = $(this);
    if(!$this.hasClass("disabled") && !$this.hasClass("played")) {
      if(!$this.hasClass("chosen")) {
        $this.addClass("chosen");
        $this.find("div.value").fadeOut();
        $this.find("div.question").fadeIn();
        $playCards.not($this).addClass("disabled");
      }
      else if($this.find("div.question").is(":visible")) {
        $this.find("div.answer").fadeIn();
        $this.find("div.question").fadeOut();
        $counter.removeClass("disabled");
      }
      else {
        // if(!$counter.hasClass("disabled")) {
          alert("Please give out the points!");
        // }
      }
    }
  });

  $("div.score").children().on("click", function() {
    var $this = $(this);
    if(!$this.hasClass("disabled")) {
      var $score = Number($this.parent().find("h2").text());
      var $points = Number($("div.chosen .value").text());
      if($this.hasClass("up")) {
        $score += $points;
        $this.parent().find("h2").text(String($score));
      }
      else {
        $score -= $points;
        $this.parent().find("h2").text(String($score));
      }
      $counter.addClass("disabled");
      var $card = $("div.chosen");
      $card.find("div.answer").hide();
      $card.removeClass("chosen");
      $card.addClass("played");
      $card.addClass("disabled");
      $playCards.not($card).removeClass("disabled");
      $counter.addClass("disabled");
    }
  });

});


var $playCards = $(".card").not(".cat-card");
var $counter = $(".score").find("button");

$playCards.on('click', function(){
  var $this = $(this);
  if(!$this.hasClass("disabled")) {
    $this.addClass("chosen");
    $this.find(".value").hide();
    $this.find(".question").show();
    $playCards.not($this).addClass("disabled");
    $(".chosen").on('click', function() {
      var $this = $(this);
      $this.find(".answer").show();
      $this.find(".question").hide();
      $counter.removeClass("disabled");
      $(".chosen").on('click', function() {
        if(!$counter.hasClass("disabled")) {
          alert("Please give out the points!");
        }
      });
    });
  }
});


$(".score").children().on("click", function() {
  var $this = $(this);
  if(!$this.hasClass("disabled")) {
    var $score = Number($this.parent().find("h2").text());
    var $points = Number($(".chosen").find(".value").text());
    if($this.hasClass("up")) {
      $score += $points;
      $this.parent().find("h2").text(String($score));
    }
    else {
      $score -= $points;
      $this.parent().find("h2").text(String($score));
    }
    $counter.addClass("disabled");
    var $card = $(".chosen");
    $card.find(".answer").hide();
    $card.removeClass("chosen");
    $card.addClass("played");
    $playCards.not($card).removeClass("disabled");
    $counter.addClass("disabled");
  }
});




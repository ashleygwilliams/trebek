var $cards = $(".card").not(".cat-card,.played,.disabled");
var $buttons = $(".score button");
var p1score = 0;
var p2score = 0;
var p3score = 0;
var wager;
var counter = 0;
// var $score = $()



$cards.on("click", function(){
  var $this = $(this);
  if (counter == 0) {
    wager = Number($this.find(".value").text());
    $this.addClass("chosen");
    $this.children(".question").css({'display':'block'});
    $this.children(".value").css({'display':'none'});
    $cards.not($this).addClass("disabled");
    $buttons.removeClass("disabled");
    counter ++;
  } else if (counter == 1) {
    $this.children(".question").css({'display':'none'});
    $this.children(".answer").css({'display':'block'});
    counter ++;
  } else {
    $this.addClass("played");
    $this.children(".answer").css({'display':'none'});
    $this.removeClass("chosen");
    $cards.not($this).removeClass("disabled");
    counter = 0;
  };

});

$buttons.on("click", function(){
  var $this = $(this);
  $buttons.addClass("disabled");
  var $score = Number($this.parent().find("h2").text());
  if ($this.hasClass("up")) {
    $score = $score + wager;
  } else {
    $score = $score - wager;
  }
  $this.parent().find("h2").text($score);
});



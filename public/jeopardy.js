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
  var $value = $this.children(".value");
  var $question = $this.children(".question");
  var $answer = $this.children(".answer");
  console.log($this);
    if (counter == 0) {
      wager = Number($this.find(".value").text());
      $this.addClass("chosen");
      $value.fadeOut();
      $question.fadeIn();
      $cards.not($this).addClass("disabled");
      $buttons.removeClass("disabled");
      counter ++;
    } else if (counter == 1) {
      $question.fadeOut();
      $answer.fadeIn();
      counter ++;
    } else {
      $answer.fadeOut();
      $this.removeClass("chosen").addClass("played");
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



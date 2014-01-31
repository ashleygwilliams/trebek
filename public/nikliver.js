$(document).ready(function() {
  var $cards = $(".card").not(".cat-card");
  var $buttons = $(".player button");
  var cardValue;

  $cards.on("click", function(){
    var $this = $(this);
    var $value = $this.find(".value");
    var $question = $this.find(".question");
    var $answer = $this.find(".answer");

    if (!isDisabled($this)) {
      if (isVisible($value)) {
        $value.fadeOut();
        $question.fadeIn();
        $this.addClass("chosen");
        $buttons.removeClass("disabled");
        $cards.not(this).addClass("disabled");
        cardValue = parseInt($value.text());
      } else if (isVisible($question)) {
        $question.fadeOut();
        $answer.fadeIn();
      } else {
        $answer.fadeOut();
        $this.removeClass("chosen").addClass("played");
        $cards.removeClass("disabled");
      }
    }
  });

  $buttons.on("click", function() {
    var $this = $(this);
    if (!isDisabled($this)) {
      if ($this.hasClass("up")) {
        changeScore($this, "increase");
      } else {
        changeScore($this, "decrease");
      }

      $buttons.addClass("disabled");
    }
  });

  function isVisible(object) {
    return object.is(":visible");
  }

  function isDisabled(object) {
    return object.hasClass("disabled");
  }

  function changeScore(object, action) {
    var $container = object.parent().find("h2");
    var score = parseInt($container.text());
    console.log(score);
    console.log(cardValue);
    if (action === "increase") {
      var newTotal = $container.text(score + cardValue);
    } else if (action === "decrease") {
      var newTotal = $container.text(score - cardValue);
    }
  }
});
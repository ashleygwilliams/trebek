$(document).ready(function() {
  var $cards = $(".card").not(".cat-card");
  var $buttons = $(".score button");
  var cardValue;

  $cards.on("click", function(event){
    var $this = $(this);
    var $value = $this.find(".value");
    var $question = $this.find(".question");
    var $answer = $this.find(".answer");

    if (isNotDisabled($this)) {
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

  $buttons.on("click", function(event) {
    var $this = $(this);
    if (isNotDisabled($this)) {
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

  function isNotDisabled(object) {
    return !object.hasClass("disabled");
  }

  function changeScore(object, action) {
    var $container = object.parent().find("h2");
    var score = parseInt($container.text());
    if (action === "increase") {
      var newTotal = $container.text(score + cardValue);
    } else if (action === "decrease") {
      var newTotal = $container.text(score - cardValue);
    }
  }
});
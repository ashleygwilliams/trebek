// nikliver.js


$(document).ready(function() {
  var $cards = $(".card").not(".cat-card");
  var $buttons = $("button");

  $cards.on("click", function(){
    var $this = $(this);
    var $value = $this.find(":first-child");
    var $question = $this.find(":nth-child(2)");
    var $answer = $this.find(":nth-child(3)");

    if (!isDisabled($this)) {
      if (isVisible($value)) {
        $value.fadeOut();
        $question.fadeIn();
        $this.addClass("chosen");
        $buttons.removeClass("disabled");
        $cards.not(this).addClass("disabled");
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
      }
      else {
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
    var $container = object.siblings("h2").first();
    var score = parseInt($container.text());
    var value = parseInt($cards.not(".disabled").find(".value").text());
    if (action === "increase") {
      var newTotal = $container.text(score + value);
    }
    else {
      var newTotal = $container.text(score - value);
    }
  }
});
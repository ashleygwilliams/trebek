$(document).ready(function(){
  var $card = $(".card").not(".cat-card");
  var $points;

  $card.on("click", function(){
    var $this = $(this);
    var $other = $card.not($this).not(".played");
    var $disabled = $this.hasClass("disabled");
    var $question = $this.find(".question");
    var $answer = $this.find(".answer");
    var $value = $this.find(".value");

    if (!$disabled && $value.attr("style") == null){
      $other.addClass("disabled");
      $this.addClass("chosen");
      $value.attr("style", "display: none");
      $question.attr("style", "display: block");
      $("button").removeClass("disabled");
      $points = $value.text();
    } else if (!$disabled && $question.attr("style") == "display: block"){
      $question.attr("style", "display: none");
      $answer.attr("style", "display: block");
    } else if (!$disabled && $answer.attr("style") == "display: block"){
      $answer.attr("style", "display: none");
      $this.addClass("disabled played");
      $other.removeClass("disabled");
      $("button").addClass("disabled");
    }
  });

  $("button").on("click", function(){
    var $this = $(this);
    var $score = $this.siblings("h2");
    if (!($this.hasClass("disabled"))){
      if ($this.hasClass("up")){
        $score.text(Number($score.text()) + Number($points));
        $("button").addClass("disabled");
      } else {
        $score.text(Number($score.text()) - Number($points));
        $this.addClass("disabled");
        $this.prev().addClass("disabled");
      }
    }
  });

});
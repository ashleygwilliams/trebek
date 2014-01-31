$(document).ready(function(){
  var $card = $(".card").not(".cat-card");

  $card.on("click", function(){
    $this = $(this);
    $other = $card.not($this).not(".played");
    $disabled = $this.hasClass("disabled");
    $question = $this.children().filter(".question");
    $answer = $this.children().filter(".answer");
    $value = $this.children().filter(".value");

    if (!$disabled && $value.attr("style") == null){
      $other.addClass("disabled");
      $this.addClass("chosen");
      $value.attr("style", "display: none");
      $question.attr("style", "display: block");
    } else if (!$disabled && $question.attr("style") == "display: block"){
      $question.attr("style", "display: none");
      $answer.attr("style", "display: block");
    } else if (!$disabled && $answer.attr("style") == "display: block"){
      $answer.attr("style", "display: none");
      $this.addClass("disabled played");
      $other.removeClass("disabled");
    }
  });

});
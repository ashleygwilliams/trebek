$(document).ready(function(){
  var $card = $(".card").not(".cat-card");

  $card.on("click", function(){
    var $this = $(this);
    var $other = $card.not($this).not(".played");
    var $disabled = $this.hasClass("disabled");
    var $question = $this.children().filter(".question");
    var $answer = $this.children().filter(".answer");
    var $value = $this.children().filter(".value");

    if (!$disabled && $value.attr("style") == null){
      $other.addClass("disabled");
      $this.addClass("chosen");
      $value.attr("style", "display: none");
      $question.attr("style", "display: block");
      $("button").removeClass("disabled");
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

});
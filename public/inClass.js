$(document).ready(function(){
  var $cards = $(".card").not(".cat-card");

  $cards.on("click", function(){
    var $this = $(this);
    var $value = $this.find(".value");
    var $question = $this.find(".question");
    var $answer = $this.find(".answer");

    if(!$this.hasClass("played")) {
      if (!$this.hasClass("chosen")) {
        // change to state chosen
        $this.addClass("chosen");
        $value.fadeOut(); // hide value
        $question.fadeIn(); // show question

        $cards.not($this).addClass("disabled"); // disable others
      } else if ($question.is(":visible")) {
        // chosen sub-state
        $question.fadeOut();
        $answer.fadeIn();
      } else {
        // mark card as played
        $this.addClass("played").removeClass("chosen")
          .find(".answer").fadeOut();
        // change disabled cards to normal
        $cards.not($this).removeClass("disabled");
      }
    }
  });

});
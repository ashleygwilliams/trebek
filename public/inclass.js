$(document).ready(function() {
  var $cards = $(".card").not(".cat-card"); //1

  $cards.on("click", function(){ //2
    var $this = $(this);

    if(!$this.hasClass("played") && !$this.hasClass("disabled")) {
      if(!$this.hasClass("chosen")) {
        // 3 change to state chosen
        $this.addClass("chosen"); 
        $this.find(".question").fadeIn(); //show question
        $this.find(".value").fadeOut();    //hide value
        // 3 change others state to disabled
        $cards.not(".chosen").addClass("disabled");
      } else if($this.find(".question").is(":visible")) {
        // 4 chosen sub-state
        $this.find(".question").fadeOut(); //hide question
        $this.find(".answer").fadeIn();    //show answer
      } else {
        // 5 change to state played
        $this.addClass("played").removeClass("chosen");
        $this.find(".answer").fadeOut();

        //change disabled cards to normal
        $cards.not(".played").removeClass("disabled");
      }
    }

  });
});


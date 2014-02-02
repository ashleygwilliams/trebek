$(document).ready(function(){
  var $cards = $(".card");

  $cards.on("click", function(){
    var $chosenCards = $(".card").filter(".chosen");
    var $this = $(this);

    if ($this.find(".value").is(":visible")) {
      // if one other card is already up
      if ($chosenCards.length == 1) {
        var $otherCard = $cards.filter(".chosen").not($this);
        $this.addClass("chosen");
        $this.find(".question").fadeIn();
        $this.find(".value").fadeOut();
        // if their faces are the same
        if ($otherCard.find(".question").text() == $this.find(".question").text()) {
          setTimeout(function(){
            $this.removeClass("chosen");
            $this.addClass("turnedOver");
            $otherCard.removeClass("chosen");
            $otherCard.addClass("turnedOver");
          }, 0000);
          // all cards are turned over
          if ($(".card.turnedOver").length == $cards.length) {
            console.log("YOU WON");
          };
        // if their faces are not the same
        } else {
          setTimeout(function(){
            $this.find(".value").fadeIn()
            $this.find(".question").fadeOut();
            $this.removeClass("chosen");
            $otherCard.find(".value").fadeIn();
            $otherCard.find(".question").fadeOut();
            $otherCard.removeClass("chosen");
          }, 3000);
        };
      // if no other cards are chosen
      } else if ($chosenCards.length < 1) {
        $this.addClass("chosen");
        $this.find(".question").fadeIn();
        $this.find(".value").fadeOut();
      };
    }
  });
});
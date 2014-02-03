$(document).ready(function(){
  var $cards = $(".card");

  $cards.on("click", function(){
    var $chosenCards = $(".card").filter(".chosen");
    var $this = $(this);

    if ($this.find(".faceDown").is(":visible")) {
      // if one other card is already up
      if ($chosenCards.length == 1) {
        var $otherCard = $cards.filter(".chosen").not($this);
        $this.addClass("chosen");
        $this.find(".faceUp").fadeIn();
        $this.find(".faceDown").fadeOut();
        // if their faces are the same
        if ($otherCard.find(".num").text() == $this.find(".num").text()) {
          setTimeout(function(){
            $this.removeClass("chosen");
            $this.addClass("turnedOver");
            $otherCard.removeClass("chosen");
            $otherCard.addClass("turnedOver");
          }, 1000);
          // all cards are turned over
          // WHY DOESN'T THIS WORK
          if ($(".card.turnedOver").length == $cards.length) {
            console.log("YOU WON");
          }
        // if their faces are not the same
        } else {
          setTimeout(function(){
            $this.find(".faceDown").fadeIn()
            $this.find(".faceUp").fadeOut();
            $this.removeClass("chosen");
            $otherCard.find(".faceDown").fadeIn();
            $otherCard.find(".faceUp").fadeOut();
            $otherCard.removeClass("chosen");
          }, 3000);
        };
      // if no other cards are chosen
      } else if ($chosenCards.length < 1) {
        $this.addClass("chosen");
        $this.find(".faceUp").fadeIn();
        $this.find(".faceDown").fadeOut();
      };
    }
  });
});
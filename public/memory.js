$(document).ready(function(){
  var $cards = $(".card");

  $cards.on("click", function(){
    var $faceUpCards = $(".card").filter(".chosen");
    var $this = $(this);

    if ($this.find(".value").is(":visible")) {
      if ($faceUpCards.length == 1) {
        var $otherCard = $cards.filter(".chosen").not($this);
        $this.addClass("chosen");
        $this.find(".question").fadeIn();
        $this.find(".value").fadeOut();
        if ($otherCard.find(".question").text() == $this.find(".question").text()) {
          setTimeout(function(){
            $this.removeClass("chosen");
            $otherCard.removeClass("chosen");
          }, 1000);
        } else {
          setTimeout(function(){
            $this.find(".value").fadeIn()
            $this.find(".question").fadeOut();
            $this.removeClass("chosen");
            $otherCard.find(".value").fadeIn();
            $otherCard.find(".question").fadeOut();
            $otherCard.removeClass("chosen");
          }, 2000);
        };
      } else if ($faceUpCards.length < 1) {
        $this.addClass("chosen");
        $this.find(".question").fadeIn();
        $this.find(".value").fadeOut();
      };
    }
  });
});
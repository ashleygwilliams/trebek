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
        setTimeout(function(){
          $this.find(".value").fadeIn();
          $this.find(".question").fadeOut();
          $otherCard.find(".value").fadeIn();
          $otherCard.find(".question").fadeOut();
        }, 3000);
      } else {
        $this.addClass("chosen");
        $this.find(".question").fadeIn();
        $this.find(".value").fadeOut();
      };
    }
  });
});
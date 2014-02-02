

$(function() {


  //set height of cards based on window height when loaded
  var windowHeight = $(window).height(); 
  $(".container").css("height", windowHeight - windowHeight*0.23);

  function checkPair(card1, card2) {
    return card1.hasClass("two") && card2.hasClass("two")
  }

  function checkTriplet(card1, card2, card3) {
    return card1.hasClass("three") && card2.hasClass("three") && card3.hasClass("three");
  }

  function checkQuadruplet(card1, card2, card3, card4) {
    return card1.hasClass("four") && card2.hasClass("four") && card3.hasClass("four") && card4.hasClass("four");
  }
  
  $(".mem_card").shuffle()

  twoClicks = [];
  threeClicks = [];
  fourClicks = [];
  clickCount = 0

  $(".mem_card").on("click", function() {
    $this = $(this)
    clickCount++ 
    $pointValue = $this.find(".points").text()

    $this.removeClass("backside");
    $this.find(".points").fadeIn("slow");

    if(clickCount % 3 == 0 && clickCount != 0) {  // reset twoClicks matching array every three clicks
        twoClicks = [];
    }
    if(clickCount % 4 == 0 && clickCount != 0) {  // reset threeClicks matching array every four clicks
        threeClicks = [];
    }
    if(clickCount % 5 == 0 && clickCount != 0) {  // reset fourClicks matching array every four clicks
        fourClicks = [];
    }

    if($this.hasClass("two")) {
      twoClicks.push($this);
      chances = 2;

      if (twoClicks.length == 2) {  // if there are two clicks of type "two"
        $card1 = twoClicks[0];
        $card2 = twoClicks[1];
        if (checkPair($card1, $card2)) {
          $card1.addClass("played");
          $card2.addClass("played");
          twoClicks = [];
        } else {
          twoClicks = [];
        }
      }
    } else if ($this.hasClass("three")) {
      chances = 3; 
      threeClicks.push($this);
      if (threeClicks.length == 3) {
        $card1 = threeClicks[0];
        $card2 = threeClicks[1];
        $card3 = threeClicks[2];
        if (checkTriplet($card1, $card2, $card3)) {
          $card1.addClass("played");
          $card2.addClass("played");
          $card3.addClass("played");
          threeClicks = [];
        } else {
          threeClicks = [];
        }
      }
    } else { // has class of 'four'
      chances = 4
      fourClicks.push($this);
      if (fourClicks.length == 4) {
        $card1 = fourClicks[0];
        $card2 = fourClicks[1];
        $card3 = fourClicks[2];
        $card4 = fourClicks[3];
        if (checkQuadruplet($card1, $card2, $card3, $card4)) {
          $card1.addClass("played");
          $card2.addClass("played");
          $card3.addClass("played");
          $card4.addClass("played");
          fourClicks = [];
        } else {
          fourClicks = [];
        }
      }
    }
  });
});
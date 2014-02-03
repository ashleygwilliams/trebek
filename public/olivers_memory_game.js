

$(function() {


  //set height of cards based on window height when loaded
  var windowHeight = $(window).height(); 
  $(".container").css("height", windowHeight - windowHeight*0.23);

  
  
  $(".mem_card").shuffle()

  twoClicks = [];
  threeClicks = [];
  fourClicks = [];
  clickCount = 0;
  chances = 0;

  $(".mem_card").on("click", function() {
    $this = $(this)
    $pointValue = $this.find(".points").text()
    $this.removeClass("backside");
    $this.find(".points").fadeIn("slow");
    clickCount++ 

    if(chances == 0) {
      if($this.hasClass("two")) {
        twoClicks.push($this);
        chances = 2;
      } else if ($this.hasClass("three")) {
        threeClicks.push($this);
        chances = 3; 
      } else { // has class of 'four'
        fourClicks.push($this);
        chances = 4;
      }
    } else if(chances == 2) {
      twoClicks.push($this);
      if (twoClicks.length == 2) {  // if there are two clicks of type "two"
        if (matchCards(twoClicks)) {

        } else {
          turnBackside(twoClicks);
          twoClicks = [];
        }
      chances = 0;  // user gets sent back to initial state
      }
    } else if(chances == 3) {
      threeClicks.push($this);
      if (threeClicks.length == 3) {
        if(matchCards(threeClicks)) {

        } else {
          turnBackside(threeClicks);
          threeClicks = [];
        }
      chances = 0;
      }
    } else if(chances == 4) {
      fourClicks.push($this);
      if (fourClicks.length == 4) {
        if (matchCards(fourClicks)) {

        } else {
          turnBackside(fourClicks);
          fourClicks = [];
        }
      chances = 0;
      }
    }
  });

  function turnBackside(cardArray) {
    setTimeout(function(){
      addClass(cardArray, "backside");
      for(i = 0; i < cardArray.length; i++) {
        cardArray[i].find(".points").fadeOut(); 
      }
    }, 700)
  }

  function checkPair(card1, card2) {
    return card1.hasClass("two") && card2.hasClass("two")
  }

  function checkTriplet(card1, card2, card3) {
    return card1.hasClass("three") && card2.hasClass("three") && card3.hasClass("three");
  }

  function checkQuadruplet(card1, card2, card3, card4) {
    return card1.hasClass("four") && card2.hasClass("four") && card3.hasClass("four") && card4.hasClass("four");
  }

  function addClass(array, css_class) {
    for(i = 0; i < array.length; i++) {
      array[i].addClass(css_class);
    }
  }

  function matchCards(matchArray) {
    $card1 = matchArray[0];
    $card2 = matchArray[1];
    $card3 = matchArray[2];
    $card4 = matchArray[3];

    if (checkPair($card1, $card2)) {
      turnBackside(matchArray);
      twoClicks = [];
      console.log("Pair matched!");
      return true;
    } else if(checkTriplet($card1, $card2, $card3)) {
      turnBackside(matchArray);
      threeClicks = [];
      console.log("Triplet matched!")
      return true;
    } else if(checkQuadruplet($card1, $card2, $card3, $card4)) {
      turnBackside(matchArray);
      fourClicks = [];
      console.log("Quadruplet matched!")
      return true;
    } else {
      console.log("No matches!")
      console.log($card1 + " " + $card2 + " " + $card3 + " " + $card4)
      return false;
    }
  }

  function checkPair(card1, card2) {
    return card1.hasClass("two") && card2.hasClass("two")
  }

  function checkTriplet(card1, card2, card3) {
    return card1.hasClass("three") && card2.hasClass("three") && card3.hasClass("three");
  }

  function checkQuadruplet(card1, card2, card3, card4) {
    return card1.hasClass("four") && card2.hasClass("four") && card3.hasClass("four") && card4.hasClass("four");
  }

  function addClass(array, css_class) {
    for(i = 0; i < array.length; i++) {
      array[i].addClass(css_class);
    }
  }

  function matchCards(matchArray) {
    $card1 = matchArray[0];
    $card2 = matchArray[1];
    $card3 = matchArray[2];
    $card4 = matchArray[3];

    if (checkPair($card1, $card2)) {
      addClass(matchArray, "played")
      twoClicks = [];
      console.log("Pair matched!");
      return true;
    } else if(checkTriplet($card1, $card2, $card3)) {
      addClass(matchArray, "played")
      threeClicks = [];
      console.log("Triplet matched!")
      return true;
    } else if(checkQuadruplet($card1, $card2, $card3, $card4)) {
      addClass(matchArray, "played")
      fourClicks = [];
      console.log("Quadruplet matched!")
      return true;
    } else {
      console.log("No matches!")
      console.log($card1 + " " + $card2 + " " + $card3 + " " + $card4)
      return false;
    }
  }

});

    

    // if(clickCount % 3 == 0 && clickCount != 0) {  // reset twoClicks matching array every three clicks
    //     twoClicks = [];
    // }
    // if(clickCount % 4 == 0 && clickCount != 0) {  // reset threeClicks matching array every four clicks
    //     threeClicks = [];
    // }
    // if(clickCount % 5 == 0 && clickCount != 0) {  // reset fourClicks matching array every four clicks
    //     fourClicks = [];
    // }


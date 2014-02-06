

$(function() {

  var twoClicks = [];
  var threeClicks = [];
  var fourClicks = [];
  var clickCount = 0;
  var chances = 0;
  var timeLeft = 30; // 3 minute timer
  var $memCards = $(".mem_card")
  var $startButton = $("#start")
  var $timer = $("#timer")
  var start = false;

  console.log($memCards)
  //set height of cards based on window height when loaded
  var windowHeight = $(window).height(); 
  var headerHeight = $(".mem_header").height()
  $(".mem_container").css("height", windowHeight - windowHeight*0.10 - headerHeight);

  
  $memCards.shuffle();
  $(".mem_card").hide();

  $startButton.on("click", function() {
    start = true;
    $(".mem_card").show();
    $(this).hide()
    
    var timerInterval = setInterval(function(){
      timeLeft--;
      $timer.html("Time left: " + strTime(timeLeft));
      if(timeLeft == 0) {
        $(".mem_card").hide();
        clearInterval(timerInterval); // this stops the current interval function from running
      } 
    }, 1000);
  });

  


  
  

  $(".mem_card").on("click", function() {
    var $this = $(this)
    var $pointValue = $this.find(".points div").first().text()
    $this.removeClass("backside");
    $this.find(".points").fadeIn("slow");
    $scoreTotal = $(".mem_score")

    clickCount++ 
    if(!$this.hasClass("frontside") && !$this.hasClass("played")){
      $this.addClass("frontside")
      if(chances == 0) {   // state in which user is choosing the first card
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
            addPoints($pointValue, $scoreTotal);
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
            addPoints($pointValue, $scoreTotal);
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
            addPoints($pointValue, $scoreTotal);
          } else {
            turnBackside(fourClicks);
            fourClicks = [];
          }
        chances = 0;
        }
      }
    } 
  });

  function addPoints(points, scoreElement) {
    var points_int = Number(points);
    var score_int = Number(scoreElement.text());
    var updated_score = String(points_int + score_int);
    scoreElement.fadeOut();
    setTimeout(function(){  
      scoreElement.text(updated_score);
      scoreElement.fadeIn();
    }, 500)
  } 

  function turnBackside(cardArray) {
    setTimeout(function(){
      addClass(cardArray, "backside");
      removeClass(cardArray, "frontside");
      for(i = 0; i < cardArray.length; i++) {
        cardArray[i].find(".points").fadeOut(); 
      }
    }, 700)
  }


  function strTime(seconds) { // Home made time formatter for minutes + seconds
    var minutes = Math.floor(seconds/60);
    var seconds = (seconds % 60).toString()
    return minutes + ":" + seconds.zeroPad(2);
  }

  String.prototype.zeroPad = function(numbZeros) { // I made this yay padding! 
    var strLength = String(this).length;
    if(numbZeros <= strLength) {
      return String(this);
    } else {
      return "0".repeat(numbZeros - strLength) + String(this);
    }
  }

  String.prototype.repeat = function(num) { // Stole this from Stack Overflow
    return new Array( num + 1 ).join( this );
  }

  function removeCards(cardArray) {
    setTimeout(function(){
      addClass(cardArray, "played")
    }, 
    700);
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
      removeCards(matchArray)  
      twoClicks = [];
      console.log("Pair matched!");
      return true;
    } else if(checkTriplet($card1, $card2, $card3)) {
      removeCards(matchArray)  
      threeClicks = [];
      console.log("Triplet matched!")
      return true;
    } else if(checkQuadruplet($card1, $card2, $card3, $card4)) {
      removeCards(matchArray)  
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

  function removeClass(array, css_class) {
    for(i = 0; i < array.length; i++) {
      array[i].removeClass(css_class);
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


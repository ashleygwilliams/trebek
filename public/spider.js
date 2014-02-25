function unblockCards(blockedArray){
  if (blockedArray.length >= 1){
    $.each(blockedArray, function(){
      if (this === blockedArray[0]){
        $(this).removeClass("blocked");
      } else if ($(this).find(".suit").text() == $(this).next().find(".suit").text()
        && +$(this).find(".value").text() == +$(this).next().find(".value").text()+1){
        $(this).removeClass("blocked");
      } else {
        return false
      }
    });
  }
}

function checkColumns(colArr){
  var value;
  $.each(colArr, function(){
    var cards = $(this).children(".card");
    if(cards.length == 0){
      alert("Columns cannot be empty.");
      value = false;
      return value;
    } else {
      value = true;
    }
  });
  return value;
}

function findCardsToRemove(cardClicked){
  var prev = $(cardClicked).prevAll(".card").not(".blocked");
  var next = $(cardClicked).nextAll(".card").not(".blocked");
  var colContents = prev.add(cardClicked).add(next);
  var $king;
  $.each(colContents, function(){
    if(+$(this).find(".value").text() == 13 && !$(this).hasClass("faceDown") && !$(this).hasClass("blocked")){
      $king = $(this);
      checkNext($king);
    }
  });
}

function checkNext(card){
  $eval = card.next();
  if($eval == null && $eval.hasClass("faceDown") && $eval.hasClass("blocked")){
    return null;
  } else if (+$eval.find(".value").text()+1 == +card.find(".value").text()
           && $eval.find(".suit").text() == card.find(".suit").text()){
    if (+$eval.find(".value").text() == 1){
      removeCards($eval);
      checkWin();
    } else {
      checkNext($eval);      
    }
  }
}

function checkWin(){
  $cards = $(".board").find(".card");
  if($cards.length == 0){
    alert("Congratulations! You won! Refresh the page to play again.");
  }
}

function removeCards(card){
  var $toRemove = card;
  for (var i = 0; i < 13; i++){
    var next = $toRemove.prev();
    $toRemove.remove();
    $toRemove = next;
  }
}


$(document).ready(function(){
  
  //flip last row in each column face-up to start game
  $(".board .column").each(function(col){
    $(this).children().last().removeClass("faceDown");
  })

  //select card on click
  $(".board .column").on("click", ".card", function(){
    var $this = $(this);
    var $selected = $(".selected");

    if(!$this.hasClass("faceDown") && !$this.hasClass("blocked")){
      //for when nothing has been selected
      if($selected.length == 0){
        //select card and cards below
        $this.addClass("selected");
        $this.nextAll().addClass("selected");
      } else {
        var $firstSelected = $($selected[0]);
      // for when cards have been selected
        if($this.hasClass("selected")){
          //remove selected if clicked on selected
          $selected.removeClass("selected");
        } else if (+$this.find(".value").text() == +$firstSelected.find(".value").text()+1){
          var $blockedInCol = $firstSelected.prevAll(".blocked");
          //turn uncovered card face-up
          $selected.prev().removeClass("faceDown");
          //unblock cards
          unblockCards($blockedInCol);
          //move selected card to new column if values allow it
          $selected.appendTo($this.parent());
          $(".card").removeClass("selected");
          findCardsToRemove(this);
          //block card when card is off-suit
          if ($this.find(".suit").text() != $firstSelected.find(".suit").text()){
            $firstSelected.prevAll().not(".faceDown").addClass("blocked");
          }
        }
      }
    }
  });

  //handle reserve cards
  $(".reserve .column").on("click", function(){
    var colArr = $(".board").find(".column");
    var fullColumns = checkColumns(colArr);
    if(fullColumns){
      var $stack = $(this);
      if(this == $(".reserve .column")[0]){
        $stack.remove();
        $.each($(".board .column"), function(){
          var card = $stack.children().first();
          card.removeClass("faceDown");
          card.remove();
          card.appendTo($(this));
        });
      }
    }
  });

  $(".blank").on("click", function(){
    if($(".selected").length > 0){
      var $blockedInCol = $($(".selected")[0]).prevAll(".blocked");
      $(".selected").prev().removeClass("faceDown");
      $(".selected").appendTo($(this).parent());
      $(".selected").removeClass("selected");
      unblockCards($blockedInCol);
    }
  });
});
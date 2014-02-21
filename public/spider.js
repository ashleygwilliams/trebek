$(document).ready(function(){
  var $columnArray = $(".column")
  
  //flip last row in each column face-up to start game
  $columnArray.each(function(col){
    $(this).children().last().removeClass("faceDown");
  })

  //select card on click
  $(".card").on("click", function(){
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
          //block card when card is off-suit
          if ($this.find(".suit").text() != $firstSelected.find(".suit").text()){
            $firstSelected.prevAll().not(".faceDown").addClass("blocked");
          }
        }
      }
    }
  });

});


function unblockCards(blockedArray){
  if (blockedArray.length >= 1){
    $.each(blockedArray, function(){
      if (this === blockedArray[0]){
        $(this).removeClass("blocked");
      } else if ($(this).find(".suit").text() == $(this).next().find(".suit").text()
        && +$(this).find(".value").text() == +$(this).next().find(".value").text()+1){
        $(this).removeClass("blocked");
      } else {
        console.log("third");
        return false
      }
    });
  }
}

//need to make reserve not-selectable

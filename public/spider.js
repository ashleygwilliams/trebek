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
      // for when cards have been selected
        if($this.hasClass("selected")){
          //remove selected if clicked on selected
          $selected.removeClass("selected");
        } else {
          //move selected card to new column
          $selected.prev().removeClass("faceDown");
          $selected.appendTo($this.parent());
          $(".card").removeClass("selected");

        }
      }
    }
  });

});

//need to make reserve not-selectable
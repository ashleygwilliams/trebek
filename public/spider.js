$(document).ready(function(){
  var $columnArray = $(".column")
  
  //flip last row in each column face-up to start game
  $columnArray.each(function(col){
    $(this).children().last().removeClass("faceDown");
  })

  //select card on click
  $(".card").on("click", function(){
    var $this = $(this);

    if(!$this.hasClass("faceDown")){
      //select card and cards below
      $this.addClass("selected");
      $this.nextAll().addClass("selected");
    }
  });

});
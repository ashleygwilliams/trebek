$(document).ready(function(){
  var $card = $(".card").not(".cat-card");

  $card.on("click", function(){
    $this = $(this);
    $question = $this.children().filter(".question").text();
    $answer = $this.children().filter(".answer").text();
    $value = $this.children().filter(".value").text();

    if (!($this.hasClass("disabled"))){
      $card.not($this).addClass("disabled");
      $this.addClass("chosen");  
      
      
    }
    
  });

});
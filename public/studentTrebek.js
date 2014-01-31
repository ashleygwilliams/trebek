$(document).ready(function(){
  var $card = $(".card").not(".cat-card");

  $card.on("click", function(){
    if (!($(this).hasClass("disabled"))){
      $card.not($(this)).addClass("disabled");
      $(this).addClass("chosen");  
      
    }
    
  });

});
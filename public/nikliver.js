// nikliver.js


$(document).ready(function() {
  $(".card").not(".cat-card").on("click", function(){
   var value = $(this).find(":first-child");
   var question = $(this).find(":nth-child(2)");
   var answer = $(this).find(":nth-child(3)");
   if(isVisible(value)) {
    value.toggle();
    question.toggle();
   } else if(isVisible(question)) {
    question.toggle();
    answer.toggle();
   } else {
    answer.toggle();
    value.toggle();
   }
  });
  
  function isVisible(object) {
    return object.is(":visible");
  }

});
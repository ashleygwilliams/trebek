$(document).ready(function(){
  var $columnArray = $(".column")
  $columnArray.each(function(col){
    $(this).children().last().removeClass("faceDown");
  })
});
$(document).ready(function() {
  var $card = $("div.card");
  var $scoreContainer = $(".score h3").first();
  var $setContainer = $(".score h3").last();
  var $button = $(".button");

  $card.on("click", function() {
    var $this = $(this);
    var $chosen;

    $this.toggleClass("chosen");
    $chosen = $(".chosen");

    if ($chosen.length === 3) {
      if (isASet($chosen)) {
        var score = parseInt($scoreContainer.text().match(/\d+/g));
        $scoreContainer.text("cards remaining: " + (score - 3));

        $chosen.fadeOut("slow", function(){
          $(this).replaceWith($(".hidden .card").first());
          $chosen.fadeIn("slow");
        });

      } else {
        alert("Not a set.")
        $chosen.removeClass("chosen");
      }
    }
  });

  $button.on("click", function() {
    location.reload();
  });
});

// function findSets() {
//   var counter = 0;
  
//   jQuery.makeArray($(".board div.card")).each_slice(3, function(slice) {
//     console.log($(slice));
//     if (isASet($(slice))) { counter += 1; }
//   });

//   console.log(counter);

//   return counter;
// }

function isASet(cards) {
  var numbers = [];
  var shapes = [];
  var shades = [];
  var colors = [];

  cards.each(function () {
    var $this = $(this);
    numbers.push($this.data("number"));
    shapes.push($this.data("shape"));
    shades.push($this.data("shade"));
    colors.push($this.data("color"));
  });

  if (twoOfOne(numbers) || twoOfOne(shapes) || twoOfOne(shades) || twoOfOne(colors)) {
    return false;
  } else {
    return true;
  }
}

function twoOfOne(array) {
  return (jQuery.unique(array).length === 2);
}
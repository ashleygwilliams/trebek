Array.prototype.each_slice = function (size, callback){
  for (var i = 0, l = this.length; i < l; i += size){
    callback.call(this, this.slice(i, i + size));
  }
};

$(document).ready(function() {
  var $card = $("div.card");
  var $visible = $(".board div.card");
  var $button = $(".button");

  $card.on("click", function() {
    var $this = $(this);
    var $chosen;

    $this.toggleClass("chosen");
    $chosen = $(".chosen");

    if ($chosen.length === 3) {
      if (isASet($chosen)) {
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
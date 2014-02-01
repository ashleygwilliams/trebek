$(document).ready(function() {
  var $card = $(".card");
  var $button = $(".button");

  $card.on("click", function() {
    var $this = $(this);
    var $selected;

    $this.toggleClass("selected");
    $selected = $(".selected");

    if ($selected.length === 3) {
      if (isASet($selected)) {
        alert("SET!");
      } else {
        alert("Not a set.")
      }
      $card.removeClass("selected");
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

  return check();

  function check() {
    if (twoOfOne(numbers) || twoOfOne(shapes) || twoOfOne(shades) || twoOfOne(colors)) {
      return false;
    } else {
      return true;
    }
  }

  function twoOfOne(array) {
    return (jQuery.unique(array).length === 2);
  }
}
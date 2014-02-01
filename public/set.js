$(document).ready(function() {
  var $card = $(".card");

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
    if (jQuery.unique(numbers).length === 2 || jQuery.unique(shapes).length === 2 || jQuery.unique(shades).length === 2 || jQuery.unique(colors).length === 2) {
      return false;
    } else {
      return true;
    }
  }
}
$(document).ready(function() {
  var $card = $("div.card");
  var $scoreContainer = $(".score h3").first();
  var $setContainer = $(".score h3").last();
  var $button = $(".button");

  countSets();

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
          countSets();
          $(this).fadeIn("slow");
        });
      } else {
        $chosen.removeClass("chosen");
      }
    }
  });

  $button.on("click", function() {
    location.reload();
  });

  function countSets() {
    var sets = findSets();
    if (sets === 0 && $(".card").length < 13) { 
      $setContainer.text("You found all the sets in the deck!");
    } else { 
      $setContainer.text("sets on the table: " + sets); 
    }
  }
});

function findSets() {
  var counter = 0;
  var $cardsOnTable = $(".board div.card").not(".chosen");
  
  var set = jQuery.makeArray($cardsOnTable);
  var combinations = k_combinations(set, 3);

  for (var i = 0, combination; combination = combinations[i]; i++) {
    if (isASet($(combination))) {
      counter++;
    }
  }

  return counter;
}

function isASet(cards) {
  var firstCard = cards.eq(0), secondCard = cards.eq(1), thirdCard = cards.eq(2); 

  var numbers = [firstCard.data("number"), secondCard.data("number"), thirdCard.data("number")];
  var shapes = [firstCard.data("shape"), secondCard.data("shape"), thirdCard.data("shape")];
  var shades = [firstCard.data("shade"), secondCard.data("shade"), thirdCard.data("shade")];
  var colors = [firstCard.data("color"), secondCard.data("color"), thirdCard.data("color")];

  if (twoOfOne(numbers) || twoOfOne(shapes) || twoOfOne(shades) || twoOfOne(colors)) {
    return false;
  } else {
    return true;
  }
}

function twoOfOne(array) {
  return (jQuery.unique(array).length === 2);
}

function k_combinations(set, k) {
  //taken from https://gist.github.com/axelpale

  var i, j, combs, head, tailcombs;
  
  if (k > set.length || k <= 0) {
    return [];
  }
  
  if (k == set.length) {
    return [set];
  }
  
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}
var $scoreContainer = $(".score h3").first();
var $setContainer = $(".score h3").last();

$(document).ready(function() {
  var $card = $("div.card");
  $button = $(".button");

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
        removeSet($chosen);
      } else {
        $chosen.removeClass("chosen");
      }
    }
  });

  $button.on("click", function() {
    shuffleCards();
  });
});

function countSets() {
  console.log("countSets");
  var sets = findSets();
  if (sets === 0) {
    if ($(".card").length < 13) { 
      $setContainer.text("You found all the sets in the deck!");
    } else {
      $setContainer.text("no sets on the table!"); 
      $button.fadeIn();
    }
  } else { 
    $setContainer.text("sets on the table: " + sets); 
  }
}

function findSets() {
  var counter = 0;
  var $cardsOnTable = $(".board div.card").not(".chosen");
  
  var set = jQuery.makeArray($cardsOnTable);
  var combinations = k_combinations(set, 3);

  for (var i = 0, combination; combination = combinations[i]; i++) {
    if (isASet($(combination))) {
      console.log($(combination));
      counter++;
    }
  }

  return counter;
}

function isASet(cards) {
  var numbers = mapTraits(cards, "number");
  var shapes = mapTraits(cards, "shape");
  var shades = mapTraits(cards, "shade");
  var colors = mapTraits(cards, "color");

  if (twoOfOne(numbers) || twoOfOne(shapes) || twoOfOne(shades) || twoOfOne(colors)) {
    return false;
  } else {
    return true;
  }
}

function twoOfOne(array) {
  return (jQuery.unique(array).length === 2);
}

function mapTraits(collection, trait) {
  return collection.map(function() { return $(this).data(trait); });
}

function removeSet(cards) {
  cards.fadeOut("slow", function(){
    var $this = $(this);
    $(".hidden .card").first().insertBefore(this);
    $this.detach;
  });

  cards.promise().done(function() {
    countSets();
    $(this).remove();
  });
}

function shuffleCards() {
  $button.fadeOut();

  var $hiddenCards = $(".hidden div.card");
  if ($hiddenCards.length <= 12) {
    $hiddenCards.slice(0, 3).wrapAll("<div class='row'></div>");
    var $rows = $(".row");
    $rows.last().insertAfter($rows.eq(-2));
  } else {
    var $cardsOnTable = $(".board div.card");
    var $newCards = $hiddenCards.slice(0, 13);

    for (var i = 0; i < 13; i++) {
      var $oldCard = $cardsOnTable.eq(i);
      var $newCard = $newCards.eq(i);
      
      $newCard.insertAfter($oldCard);
      $oldCard.insertAfter($(".hidden div.card").last());
    }
  }
  countSets();
}

function k_combinations(set, k) {
  //taken from https://gist.github.com/axelpale
  var i, j, combs, head, tailcombs;
  
  if (k > set.length || k <= 0) { return []; }
  if (k == set.length) { return [set]; }
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) { combs.push([set[i]]); }
    return combs;
  }
  
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    head = set.slice(i, i+1);
    tailcombs = k_combinations(set.slice(i + 1), k - 1);
    for (j = 0; j < tailcombs.length; j++) { combs.push(head.concat(tailcombs[j])); }
  }
  return combs;
}
var $card, $scoreContainer, $setContainer, $button;

$(document).ready(function() {
  $card = $("div.card");
  $scoreContainer = $(".score h3").first();
  $setContainer = $(".score h3").last();
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
        $.when(removeSet($chosen)).done(countSets());
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
  var sets = findSets();
  if (sets === 0 && $(".card").length < 13) { 
    $setContainer.text("You found all the sets in the deck!");
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
    if (isASet($(combination))) { counter++; }
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
    $(this).replaceWith($(".hidden .card").first());
    $(this).fadeIn("slow");
  });
}

function shuffleCards() {
  var $hiddenCards = $(".hidden div.card");
  $hiddenCards.shuffle();
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

(function(d){d.fn.shuffle=function(c){c=[];return this.each(function(){c.push(d(this).clone(true))}).each(function(a,b){d(b).replaceWith(c[a=Math.floor(Math.random()*c.length)]);c.splice(a,1)})};d.shuffle=function(a){return d(a).shuffle()}})(jQuery);
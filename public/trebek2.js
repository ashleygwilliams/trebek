$(".card").not(".cat-card").on('click', function(){
  var $this = $(this);
  if(!$this.hasClass("disabled")) {
    $this.addClass("chosen");
    $this.find(".value").hide();
    $this.find(".question").show();
    $(".card").not(".cat-card").not($this).addClass("disabled");
    $(".chosen").on('click', function() {
      var $this = $(this);
      $this.find(".answer").show();
      $this.find(".question").hide();
      $(".score").find("button").removeClass("disabled");
      $(".chosen").on('click', function() {
        if(!$(".score").find("button").hasClass("disabled")) {
          alert("Did you give someone points?");
        }
        else {
          var $this = $(this);
          $this.find(".answer").hide();
          $this.addClass("played");
          $(".card").not(".cat-card").not($this).removeClass("disabled");
          $(".score").find("button").addClass("disabled");
        }
      });
    });
  }
});


$(".score").children().on("click", function() {
  var $this = $(this);
  var $score = Number($this.parent().find("h2").text());
  var $points = Number($(".chosen").find(".value").text());
  if($this.hasClass("up")) {
    $score += $points;
    $this.parent().find("h2").text(String($score));
  }
  else {
    $score -= $points;
    $this.parent().find("h2").text(String($score));
  }
  $(".score").find("button").addClass("disabled");
});




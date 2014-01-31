$(".card").not(".cat-card").on('click', function(){
  var $this = $(this);
  $this.addClass("chosen");
  $this.find(".value").hide();
  $this.find(".question").show();
  // $this.children.toggle(); 
  $(".card").not(".cat-card").not($this).addClass("disabled");
  $(".chosen").on('click', function() {
    var $this = $(this);
    $this.find(".answer").show();
    $this.find(".question").hide();
    $(".score").find("button").removeClass("disabled");
    $(".chosen").on('click', function() {
      var $this = $(this);
      $this.find(".answer").hide();
      $this.addClass("played");
      $(".card").not(".cat-card").not($this).removeClass("disabled");
    });
  });
});

$(".score").children().on("click", function() {
  $(".score").children().addClass("disabled");
});




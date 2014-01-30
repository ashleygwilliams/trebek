var num = 0;

$(".card").not(".cat-card,.played").on("click", function(){
  var $this = $(this);
  if (num == 0) {
    $this.addClass("chosen");
    $this.children(".question").css({'display':'block'});
    $this.children(".value").css({'display':'none'});
    $(".card").not($this).not(".cat-card").not(".played").addClass("disabled");
    $(".score button").removeClass("disabled");
    num ++;
    console.log("first" + num);
  } else if (num == 1) {
    $this.children(".question").css({'display':'none'});
    $this.children(".answer").css({'display':'block'});
    num ++;
    console.log("second" + num);
  } else {
    console.log("last" + num);
    $this.addClass("played");
    $this.children(".answer").css({'display':'none'});
    $this.removeClass("chosen");
    $(".card").not($this).not(".cat-card").removeClass("disabled");
    num = 0;
    console.log("zero?" + num);
  };

});

$(".score button").on("click", function(){
  $(".score button").addClass("disabled");
});



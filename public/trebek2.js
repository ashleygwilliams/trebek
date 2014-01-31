$(".card").not(".cat-card").on('click', function(){
  var $this = $(this);
  $this.addClass("chosen");
  $this.find(".value").hide();
  $this.find(".question").show();
  $this.find(".answer").hide();
  // $this.children.toggle(); 
  $(".card").not(".cat-card").not($this).addClass("disabled");
  // $this.off('click', 'chosen', function() {
  //   $(this).removeClass("chosen");
  // });
});

$(".chosen").on('click', function() {
  var $this = $(this);
  $this.find(".question");
  $this.addClass("answer");
});

$(".chosen .answer").on('click', function() {
  var $this = $(this);
  $this.removeClass("answer");
});
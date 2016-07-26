;(function ($, window, document, undefined) {

  $("#welcomeBanner").css({minHeight: $(window).innerHeight() + 'px'});

  $(window).resize(function() {
    $("#welcomeBanner").css({ minHeight: $(window).innerHeight() + 'px' });
    $('.shape').shape('repaint');
  });

  var header = $('#header');
  $(document).scroll(function(e){
  	if($(this).scrollTop() < 100 && header.hasClass('scrolled')){
  		header.removeClass('scrolled');
  	}

  	if($(this).scrollTop() > 100 && !header.hasClass('scrolled')){
  		header.addClass('scrolled');
  	}

  });

  $('.ui.rating').rating('disable');

  $('.shape').shape();

  var timeout = window.setInterval(flipCard, 5000);

  function flipCard(){
    $('.shape').shape('flip up');
    $('.shape').shape('repaint');
  }

  $(".next").on("click", function(){
    $('#need .shape').shape('flip up');
    clearInterval(timeout);
    timeout = window.setInterval(flipCard, 5000);
  });

  $('.dropdown').dropdown();

  $('.submit').on('click', function(){
      $(this).parent('form').submit();
  });

  $('.modal').modal('show');

})($, window, document);
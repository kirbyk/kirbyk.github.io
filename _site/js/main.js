$('.arrow').click(function() {
  $('html, body').animate({
      scrollTop: $(".home-main").offset().top
    }, 700);
  return false;
});

$(window).scroll(function() {
  clearInterval(bouncyArrow);
});

var bouncyArrow = setInterval(function() {
  $('.arrow').toggleClass('animated bounce');
}, 5000);

function redirect(src, dest) {
  if (window.location.pathname === src) {
    window.location = dest;
  }
}

redirect('/resume/', 'https://dl.dropboxusercontent.com/u/22196024/Resume%20-%20Kirby%20Kohlmorgen.pdf');
redirect('/headshot/', 'http://www.gravatar.com/avatar/a153778db9dfc4a99055884515e8c336.jpg?s=500');

$('.arrow').click(function() {
  console.log('clicked');
  $('html, body').animate({
      scrollTop: $(".home-main").offset().top
    }, 700);
  return false;
});

function processParallaxes() {
  let windowHeight = window.innerHeight;
  let parallaxers = document.getElementsByClassName('parallax-container');

  for(let i=0; i<parallaxers.length; i++) {
    let elementTop = parallaxers[i].getBoundingClientRect().top;
    let elementBottom = parallaxers[i].getBoundingClientRect().bottom;

    if ((elementTop < windowHeight) && (elementBottom > 0)) {
      let offset = Math.abs(elementTop - windowHeight) - (elementBottom - elementTop);
      parallaxers[i].style.backgroundPositionY = (-offset / 2) + 'px';
    }
  }
}

window.addEventListener('load', function() {
  processParallaxes();
});

window.addEventListener('scroll', function() {
  processParallaxes();
});

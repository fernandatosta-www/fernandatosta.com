function processParallaxes() {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let parallaxers = document.getElementsByClassName('parallax-container');

  for(let i=0; i<parallaxers.length; i++) {
    let elementTop = parallaxers[i].getBoundingClientRect().top;
    let elementBottom = parallaxers[i].getBoundingClientRect().bottom;
    let elementHeight = (elementBottom - elementTop);

    if ((elementTop < windowHeight) && (elementBottom > 0)) {
      let offset = (windowHeight + elementHeight) - elementBottom;
      let offsetPct = offset / (windowHeight + elementHeight);
      let topPosition = 0.5 * offsetPct * elementHeight;

      if(windowWidth > windowHeight) {
        parallaxers[i].style.backgroundPositionY = -(topPosition) + 'px';
      } else {
        parallaxers[i].style.backgroundPositionY = -(topPosition / 2) + 'px';
      }
    }
  }
}

window.addEventListener('load', function() {
  processParallaxes();
});

window.addEventListener('scroll', function() {
  processParallaxes();
});

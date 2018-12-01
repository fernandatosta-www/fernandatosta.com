function processParallaxes() {
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let parallaxers = document.getElementsByClassName('parallax-container');

  for(let i=0; i<parallaxers.length; i++) {
    let elementTop = parallaxers[i].getBoundingClientRect().top;
    let elementBottom = parallaxers[i].getBoundingClientRect().bottom;
    let elementHeight = parallaxers[i].offsetHeight;

    if ((elementTop < windowHeight) && (elementBottom > 0)) {
      let offset = (windowHeight + elementHeight) - elementBottom;
      let offsetPct = Math.max(0, offset / (windowHeight + elementHeight));

      if(parallaxers[i].hasAttribute('data-visible-on-load')) {
        let initialOffset = parallaxers[i].getAttribute('data-visible-on-load');
        offset = (initialOffset) - elementBottom;
        offsetPct = Math.max(0, offset / (initialOffset));
      }

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
  window.scrollTo(0, 0);
  let parallaxers = document.getElementsByClassName('parallax-container');

  for(let i=0; i<parallaxers.length; i++) {
    if(parallaxers[i].offsetTop < window.innerHeight) {
      parallaxers[i].setAttribute('data-visible-on-load', parallaxers[i].getBoundingClientRect().bottom);
    }
  }
  processParallaxes();
});

window.addEventListener('scroll', function() {
  processParallaxes();
});

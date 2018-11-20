function getClosestParent(elem, selector) {
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) return elem;
  }
  return null;
}

function menuClicked(e) {
  let player = getClosestParent(this, '.video-player');
  if(player == null) return;

  let currentVideoElement = player.getElementsByClassName('video-player-player')[0];
  let clickedElement = this;

  let currentVideo = {
    id: currentVideoElement.getAttribute('data-id'),
    cover: currentVideoElement.getAttribute('data-cover'),
    title: currentVideoElement.getAttribute('data-title')
  };

  let clickedVideo = {
    id: clickedElement.getAttribute('data-id'),
    cover: clickedElement.getAttribute('data-cover'),
    title: clickedElement.getAttribute('data-title')
  };

  Object.keys(currentVideo).forEach(function(i) {
    currentVideoElement.setAttribute('data-'+i, clickedVideo[i]);
    clickedElement.setAttribute('data-'+i, currentVideo[i]);
  });

  let currentVideoIframe = currentVideoElement.getElementsByTagName('iframe')[0];
  let newSrc = currentVideoIframe.getAttribute('src').replace(currentVideo.id, clickedVideo.id).replace(/autoplay=[01]/,'autoplay=1');
  currentVideoIframe.setAttribute('src', newSrc);

  let clickedVideoImage = clickedElement.getElementsByClassName('video-player-menu-option-image')[0];
  let clickedVideoText = clickedElement.getElementsByClassName('video-player-menu-option-text')[0];

  let newVideoImage = clickedVideoImage.style.backgroundImage.replace(clickedVideo.cover, currentVideo.cover);

  clickedVideoImage.style.backgroundImage = newVideoImage;
  clickedVideoText.innerHTML = currentVideo.title;
}

window.addEventListener('load', function() {
  let videoOptions = document.getElementsByClassName('video-player-menu-option');
  for(let i=0; i < videoOptions.length; i++) {
    videoOptions[i].onclick = menuClicked;
  }
});

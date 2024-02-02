import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.querySelectorAll('#vimeo-player'));
// "Install Vimeo player."
player.ready().then(() => {
  // "Initializing Vimeo player."
  console.log('The player Vimeo is ready');

  // "Event listeren for 'timeupdate'."
  player.on(
    'timeupdate',
    throttle(() => {
      // "Writing the current time to 'localStorage'."
      localStorage.setItem('videoplayer-current-time', player.getCurrentTime());
    }, 1000)
  );

  // "Set the current time when the page is reloaded."
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    player.setCurrentTime(parseFloat(storedTime));
  }
});

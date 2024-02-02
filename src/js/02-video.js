import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

// const player = new Vimeo(document.querySelectorAll('#vimeo-player'));
const player = new Vimeo(document.getElementById('vimeo-player'));

player.ready().then(() => {
  // "Install Vimeo player."
  console.log('The player Vimeo is ready'); // "Initializing Vimeo player."

  player.on('play', () => {
    player.on(
      'timeupdate',
      throttle(() => {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();

        // "Check if 'currentTime' is within the length of the video."
        if (currentTime >= 0 && currentTime <= duration) {
          localStorage.setItem('videoplayer-current-time', currentTime);
        }
      }, 1000)
    );
  });

  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    player.setCurrentTime(parseFloat(storedTime));
  }
});

// // "Install Vimeo player."
// player.ready().then(() => {
//   // "Initializing Vimeo player."
//   console.log('The player Vimeo is ready');

//   // "Event listeren for 'play' and 'timeupdate'."
//   player.on('play', () => {
//     player.on(
//       'timeupdate',
//       throttle(() => {
//         // "Writing the current time to 'localStorage'."
//         localStorage.setItem(
//           'videoplayer-current-time',
//           player.getCurrentTime()
//         );
//       }, 1000)
//     );
//   });

//   // "Set the current time when the page is reloaded."
//   const storedTime = localStorage.getItem('videoplayer-current-time');
//   if (storedTime) {
//     player.setCurrentTime(parseFloat(storedTime));
//   }
// });

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const onPlay = data => {
  try {
    const currentTime = JSON.stringify(data.seconds);
    localStorage.setItem('videoplayer-current-time', currentTime);
  } catch (error) {
    console.log(error);
  }
};

const throttlePlay = throttle(onPlay, 1000);

player.on('timeupdate', throttlePlay);

try {
  player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time'))
  );
} catch (error) {
  switch (error.name) {
    case 'RangeError':
      console.log(
        'The time was less than 0 or greater than the video’s duration'
      );
      break;

    default:
      console.log('An error occured');
      break;
  }
}

// // Importuje zewnętrzną bibliotekę Vimeo
// import Vimeo from '@vimeo/player';
// import throttle from 'lodash.throttle';

// // Dodaje definicję klasy VideoHandler
// class VideoHandler {
//   constructor(player) {
//     this.player = player;
//   }

//   // Metoda obsługująca zdarzenie odtwarzania
//   handlePlay() {
//     this.player.on(
//       'timeupdate',
//       throttle(() => {
//         const currentTime = this.player.getCurrentTime();
//         const duration = this.player.getDuration();

//         if (currentTime > 0 && currentTime <= duration) {
//           localStorage.setItem('videoplayer-current-time', currentTime);
//         }
//       }, 1000)
//     );
//   }
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const player = new Vimeo(document.getElementById('vimeo-player'));

//   player.ready().then(() => {
//     console.log('The player Vimeo is ready');

//     const videoHandler = new VideoHandler(player);

//     player.on('play', () => {
//       videoHandler.handlePlay();
//     });

//     const storedTime = localStorage.getItem('videoplayer-current-time');
//     if (storedTime) {
//       player.setCurrentTime(parseFloat(storedTime));
//     }
//   });
// });

// import Vimeo from '@vimeo/player';
// import throttle from 'lodash.throttle';

// // const player = new Vimeo(document.querySelectorAll('#vimeo-player'));
// const player = new Vimeo(document.getElementById('vimeo-player'));

// player.ready().then(() => {
//   // "Install Vimeo player."
//   console.log('The player Vimeo is ready'); // "Initializing Vimeo player."

//   player.on('play', () => {
//     player.on(
//       'timeupdate',
//       throttle(() => {
//         const currentTime = player.getCurrentTime();
//         const duration = player.getDuration();

//         // "Check if 'currentTime' is within the length of the video."
//         if (currentTime > 0 && currentTime <= duration) {
//           localStorage.setItem('videoplayer-current-time', currentTime);
//         }
//       }, 1000)
//     );
//   });

//   const storedTime = localStorage.getItem('videoplayer-current-time');
//   if (storedTime) {
//     player.setCurrentTime(parseFloat(storedTime));
//   }
// });

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

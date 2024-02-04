// ---- kod 01 ----
import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

// const player = new Vimeo(document.querySelectorAll('#vimeo-player'));
const player = new Vimeo(document.getElementById('vimeo-player'));

// "Install Vimeo player."
player.ready().then(() => {
  // "Initializing Vimeo player."
  console.log('The player Vimeo is ready');

  // "Event listeren for 'play' and 'timeupdate'."
  player.on('play', () => {
    player.on(
      'timeupdate',
      throttle(() => {
        // "Writing the current time to 'localStorage'."
        localStorage.setItem(
          'videoplayer-current-time',
          player.getCurrentTime()
        );
      }, 1000)
    );
  });

  // "Set the current time when the page is reloaded."
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime) {
    player.setCurrentTime(parseFloat(storedTime));
  }
});

// ---- kod 02 ----

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
        if (currentTime > 0 && currentTime <= duration) {
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

// ---- kod 03 ----
// Importuje zewnętrzną bibliotekę Vimeo

// Dodaje definicję klasy VideoHandler
class VideoHandler {
  constructor(player) {
    this.player = player;
  }

  // Metoda obsługująca zdarzenie odtwarzania
  handlePlay() {
    this.player.on(
      'timeupdate',
      throttle(() => {
        const currentTime = this.player.getCurrentTime();
        const duration = this.player.getDuration();

        if (currentTime > 0 && currentTime <= duration) {
          localStorage.setItem('videoplayer-current-time', currentTime);
        }
      }, 1000)
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const player = new Vimeo(document.getElementById('vimeo-player'));

  player.ready().then(() => {
    console.log('The player Vimeo is ready');

    const videoHandler = new VideoHandler(player);

    player.on('play', () => {
      videoHandler.handlePlay();
    });

    const storedTime = localStorage.getItem('videoplayer-current-time');
    if (storedTime) {
      player.setCurrentTime(parseFloat(storedTime));
    }
  });
});

// ---- kod 06 ----

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

// Funkcja zapisująca aktualny czas odtwarzania w local storage -to do dupy
const saveCurrentTime = () => {
  const currentTime = player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
}; //do tego miejsca

// Ustawienie funkcji na zdarzenie timeupdate z odroczonym wywołaniem przez throttle
player.on('timeupdate', throttle(saveCurrentTime, 1000));

// Pobranie zapisanego czasu z local storage i ustawienie go jako czas odtwarzania
try {
  const storedTime = JSON.parse(
    localStorage.getItem('videoplayer-current-time')
  );
  if (storedTime !== null && !isNaN(storedTime)) {
    player.setCurrentTime(storedTime);
  }
} catch (error) {
  console.error(
    'An error occurred while setting the current time:',
    error.message
  );
}

// ---- kod 07 ----

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

const saveCurrentTime = () => {
  const currentTime = player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
};

// Ustawienie funkcji na zdarzenie timeupdate z odroczonym wywołaniem przez throttle
player.on('timeupdate', throttle(saveCurrentTime, 1000));

// Pobranie zapisanego czasu z local storage i ustawienie go jako czas odtwarzania
try {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null && !isNaN(storedTime)) {
    player.setCurrentTime(parseFloat(storedTime));
  }
} catch (error) {
  console.error(
    'An error occurred while setting the current time:',
    error.message
  );
}

// ---- kod 08 ----

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

const saveCurrentTime = () => {
  const currentTime = player.currentTime;
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

// Ustawienie funkcji na zdarzenie timeupdate z odroczonym wywołaniem przez throttle
player.on('timeupdate', throttledSaveCurrentTime);

// Pobranie zapisanego czasu z local storage i ustawienie go jako czas odtwarzania
try {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null && !isNaN(storedTime)) {
    player.setCurrentTime(storedTime).then(() => {
      // Dodaj play, aby wznowić odtwarzanie po ustawieniu czasu
      player.play();
    });
  }
} catch (error) {
  console.error(
    'An error occurred while setting the current time:',
    error.message
  );
}

// ---- kod 09 ----

const iframe = document.querySelector('#vimeo-player');
const player = new Vimeo(iframe);

const saveCurrentTime = () => {
  const currentTime = player.currentTime;
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

// Ustawienie funkcji na zdarzenie timeupdate z odroczonym wywołaniem przez throttle
player.on('timeupdate', throttledSaveCurrentTime);

// Pobranie zapisanego czasu z local storage i ustawienie go jako czas odtwarzania
try {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null && !isNaN(storedTime)) {
    player.setCurrentTime(storedTime).then(() => {
      // Dodaj play, aby wznowić odtwarzanie po ustawieniu czasu
      player.play();
    });
  }
} catch (error) {
  console.error(
    'An error occurred while setting the current time:',
    error.message
  );
}

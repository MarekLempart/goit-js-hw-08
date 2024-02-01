import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.getElementById('vimeo-player'));

// Słuchacz zdarzeń dla timeupdate
player.on(
  'timeupdate',
  throttle(() => {
    // Zapisz bieżący czas do localStorage
    localStorage.setItem('videoplayer-current-time', player.getCurrentTime());
  }, 1000)
);

// Ustaw bieżący czas przy ponownym załadowaniu strony
const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
  player.setCurrentTime(parseFloat(storedTime));
}

// Inicjalizacja odtwarzacza
player.ready().then(() => {
  // Opcjonalne: Możesz dodać dodatkową logikę po zainicjowaniu odtwarzacza
  console.log('Odtwarzacz Vimeo gotowy.');
});

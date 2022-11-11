import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const localStorageEl = 'videoplayer-current-time';

function onTimeUpdate(event) {
  localStorage.setItem(localStorageEl, event.seconds);
}
const localSavedTime = localStorage.getItem(localStorageEl);

if (localSavedTime !== null) {
  player.setCurrentTime(localSavedTime);
}
player.on('timeupdate', throttle(onTimeUpdate, 1000));

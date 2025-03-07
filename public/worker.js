/* eslint-disable no-restricted-globals */

let timerID;
let startTimerInterval;
let timeRemaining;
let count;
const initSeconds = (seconds) => {
  count = seconds;
  timeRemaining = seconds;
};

/// Timer logic
const updateTimer = () => {
  const currentTime = new Date().getTime();
  const elapsed = Math.floor((currentTime - startTimerInterval) / 1000);
  timeRemaining = count - elapsed;

  if (timeRemaining <= 0) {
    timeRemaining = 0;
    clearInterval(timerID);
  }

  return timeRemaining;
};

const startTimer = () => {
  // Check if timer is already running
  if (!timerID) {

    // Check if timer is paused
    startTimerInterval = new Date().getTime() - (count - timeRemaining) * 1000;

    // Start timer and sets the interval to 1 second
    timerID = setInterval(() => {
      const remainingSeconds = updateTimer();
      self.postMessage(remainingSeconds);
    }, 1000);
  }
};

const pauseTimer = () => {
  // Clear the interval and set the timerID to null
  clearInterval(timerID);
  timerID = null;
};

self.addEventListener("message", (e) => {
  const { command, seconds } = e.data;

  switch (command) {
    case "start":
      if (!timerID) {
        if (timeRemaining && timeRemaining !== count) {
          startTimer();
        } else {
          initSeconds(seconds);
          startTimer();
        }
      }
      break;
    case "pause":
      pauseTimer();
      break;
    case "change":
      initSeconds(seconds);
      startTimer();
      break;
    case "reset":
      pauseTimer();
      initSeconds(seconds);
      break;
    default:
      break;
  }
});

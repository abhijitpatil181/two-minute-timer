export const getFormattedTime = (time) => {
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = time % 60;

  const hourString = hours < 10 ? `0${hours}` : `${hours}`;
  const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${hourString}:${minuteString}:${secondString}`;
};

export const getTotalSeconds = (timerString) => {
  const timersData = timerString.split(":");
  const hour = parseInt(timersData[0]);
  const minutes = parseInt(timersData[1]);
  const seconds = parseInt(timersData[2]);

  const totalSeconds = hour * 60 * 60 + minutes * 60 + seconds;

  return totalSeconds;
};

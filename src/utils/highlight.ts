import { getHHmmss } from './date';

const ishaMessage = localStorage.getItem('isha-message');

export function getRemaining(todaySarray: string[]): string {
  if (todaySarray.length < 6) return 'array.length < 6';
  const currentTime = getHHmmss();
  const currentTimeValue = +currentTime.replace(':', '');
  const ishaTimeValue = +todaySarray[5].replace(':', '');
  if (currentTimeValue > ishaTimeValue)
    return ishaMessage || `Güneş: ${todaySarray[1]}`;

  for (let i = 0; i < todaySarray.length; i++) {
    const prayerTimeValue = +todaySarray[i].replace(':', '');

    if (currentTimeValue <= prayerTimeValue) {
      const [currentHours, currentMinutes] = currentTime.split(':');
      const [prayerHours, prayerMinutes] = todaySarray[i].split(':');

      const totalMinutes1 = +currentHours * 60 + +currentMinutes;
      const totalMinutes2 = +prayerHours * 60 + +prayerMinutes;

      const minutesDifference = totalMinutes2 - totalMinutes1;

      const hoursLeft = Math.floor(minutesDifference / 60).toString();
      let minutesLeft = (minutesDifference % 60).toString();
      if (+minutesLeft < 10) minutesLeft = `0${minutesLeft}`;

      if (hoursLeft === '0') return `${minutesLeft}`;
      return `${hoursLeft}:${minutesLeft}`;
    }
  }
  return '--';
}

export function getHighlightedIndex(todaySarray: string[]) {
  // if (todaySarray.length < 6) return -1;

  const currentTime = getHHmmss();
  const currentTimeValue = +currentTime.replace(':', '');
  const ishaTimeValue = +todaySarray[5].replace(':', '');
  if (currentTimeValue >= ishaTimeValue) return -1;

  for (let i = 0; i < todaySarray.length; i++) {
    const prayerTimeValue = +todaySarray[i].replace(':', '');
    if (currentTimeValue <= prayerTimeValue) return i;
  }
  return -1;
}

export function getTouched(touched: string) {
  const currentTime = getHHmmss();

  const [currentHours, currentMinutes] = currentTime.split(':');
  const [touchedHours, touchedMinutes] = touched.split(':');

  const totalMinutes1 = +currentHours * 60 + +currentMinutes;
  const totalMinutes2 = +touchedHours * 60 + +touchedMinutes;

  const minutesDifference = totalMinutes2 - totalMinutes1;

  if (minutesDifference > 0) {
    const hoursLeft = Math.floor(minutesDifference / 60).toString();
    const minutesLeft = (minutesDifference % 60).toString();

    if (hoursLeft === '0') return `+${minutesLeft}`;

    return `+${hoursLeft}:${minutesLeft}`;
  } else if (minutesDifference < 0) {
    const hoursLeft = Math.floor(-minutesDifference / 60).toString();
    const minutesLeft = (-minutesDifference % 60).toString();

    if (hoursLeft === '0') return `-${minutesLeft}`;

    return `-${hoursLeft}:${minutesLeft}`;
  }
  return '';
}

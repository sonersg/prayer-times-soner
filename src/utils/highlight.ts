import moment from 'moment-timezone';
import { storage } from '../app/(screens)/_layout';
import calculateArray from './calculate';

const ishaMessage =
  storage.getString('isha-message') || `Güneş: ${calculateArray(2)[1][1]}`;
const isAlways = storage.getBoolean('is-always');

export function getRemaining(todaySarray: string[]) {
  if (todaySarray.length < 6) return 'ah sana array';
  if (!isAlways && isAlways != undefined) return ishaMessage;

  const currentTime = moment().format('HH:mm');
  const currentTimeValue = +currentTime.replace(':', '');
  const ishaTimeValue = +todaySarray[5].replace(':', '');
  if (currentTimeValue > ishaTimeValue) return ishaMessage;

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
}

export function getHighlightedIndex(todaySarray: string[]) {
  if (todaySarray.length < 6) return -1;

  const currentTime = moment().format('HH:mm');
  const currentTimeValue = +currentTime.replace(':', '');
  const ishaTimeValue = +todaySarray[5].replace(':', '');
  if (currentTimeValue >= ishaTimeValue) return -1;

  for (let i = 0; i < todaySarray.length; i++) {
    const prayerTimeValue = +todaySarray[i].replace(':', '');
    if (currentTimeValue <= prayerTimeValue) return i;
  }
}

export function getTouched(touched: string) {
  const currentTime = moment().format('HH:mm');

  const [currentHours, currentMinutes] = currentTime.split(':');
  const [touchedHours, touchedMinutes] = touched.split(':');

  const totalMinutes1 = +currentHours * 60 + +currentMinutes;
  const totalMinutes2 = +touchedHours * 60 + +touchedMinutes;

  const minutesDifference = totalMinutes2 - totalMinutes1;

  if (minutesDifference > 0) {
    const hoursLeft = Math.floor(minutesDifference / 60).toString();
    const minutesLeft = (minutesDifference % 60).toString();

    if (hoursLeft === '0') {
      return `${minutesLeft} dakika sonra`;
    }

    return `${hoursLeft} saat ${minutesLeft} dakika sonra`;
  } else if (minutesDifference < 0) {
    const hoursLeft = Math.floor(-minutesDifference / 60).toString();
    const minutesLeft = (-minutesDifference % 60).toString();

    if (hoursLeft === '0') {
      return `${minutesLeft} dakika önce`;
    }

    return `${hoursLeft} saat ${minutesLeft} dakika önce`;
  }
  return '';
}

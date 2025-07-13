// get date as ISO string, format (2023-12-24)
export function getISO(future: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() + future);
  return date.toISOString().slice(0, 10);
}

// get date TR, format (6 Şubat 2025)
const aylar = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];

export function getTR(future: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() + future);
  const year = date.getFullYear(); // 2023

  const month = date.getMonth(); // 0 - 11

  const day = date.getDate(); // 31

  return day + ' ' + aylar[month] + ' ' + year;
}

// get date hijri, format (7 Şaban 1446)
import { toHijri } from 'hijri-converter';

const hicriAylar = [
  'Muharrem',
  'Safer',
  'R.evvel',
  'R.ahir',
  'C.evvel',
  'C.ahir',
  'Recep',
  'Şaban',
  'Ramazan',
  'Şevval',
  'Zilkade',
  'Zilhicce',
];

export function getHijri(future: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() + future);

  const year = date.getFullYear(); // 2023

  const month = date.getMonth(); // 9 -> Eylül

  const day = date.getDate(); // 12

  const hicri = toHijri(year, month + 1, day); // convert greg to hijri

  // const greg = toGregorian(1407, 7, 1); // convert 1st of Rajab, 1407 to Gregorian

  return hicri.hd + ' ' + hicriAylar[hicri.hm - 1] + ' ' + hicri.hy;
}

export function getHHmmss(s = false) {
  const date = new Date();
  let hour: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();

  if (hour < 10) hour = `0${hour}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;

  return s ? `${hour}:${minutes}:${seconds}` : `${hour}:${minutes}`;
}

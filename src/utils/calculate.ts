import PrayTimes from './prayTimes';

const timeZone = new Date().getTimezoneOffset() / -60;

export default function calculateArray(size: number, start: number = 0) {
  console.log('Calculate function called', timeZone);

  let prayTimes = new PrayTimes('Turkiye');
  const calculationMethod = localStorage.getItem('calculation-method');

  if (calculationMethod === 'Custom') {
    // Adjust calculation angles
    // prayTimes.adjust({
    //   fajr: 18,
    //   isha: 17,
    // });
  } else if (calculationMethod) {
    prayTimes = new PrayTimes(calculationMethod);
  }

  const tunes = localStorage.getItem('tunes');
  if (tunes) {
    // const parsedTunes = JSON.parse(tunes)
    // Add an offset to the sunrise time (e.g., +10 minutes)
    // prayTimes.tune({
    //   sunrise: -7,
    //   dhuhr: 5, // Add 5 minutes to dhuhr
    //   asr: 4,
    //   maghrib: 6,
    // });
  }

  const lat = localStorage.getItem('lat') || 37.066;
  const lon = localStorage.getItem('lon') || 37.3781;
  // const lat = 37.066;
  // const lon = 37.3781;

  const arr = new Array(size); // Pre-allocate

  for (let i = 0; i < size; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + start);
    // const iso = date.toISOString().slice(0, 10);
    // console.log(iso);
    const times = prayTimes.getTimes(date, [+lat, +lon], timeZone);
    const valuesArray = Object.values(times);
    valuesArray.splice(8, 1); // remove midnight
    valuesArray.splice(5, 1); // remove sunset
    valuesArray.splice(0, 1); // remove imsak
    arr[i] = valuesArray;
    // arr.push(times);
  }

  return arr;
}

// const lat = 37.066;
// const long = 37.3781;
// console.log(name(lat, long));

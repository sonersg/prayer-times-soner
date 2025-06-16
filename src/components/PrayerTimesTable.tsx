import { useEffect, useState } from 'react';
import calculateArray from '../utils/calculate';
import {
  getHighlightedIndex,
  getRemaining,
  getTouched,
} from '../utils/highlight';

function PrayerTimesTable() {
  const [arr, setarr] = useState<string[] | null>(null);
  const [remaining, setremaining] = useState('');
  const [highlightIndex, sethighlightIndex] = useState(-1);

  useEffect(() => {
    const todaysArr = calculateArray(1)[0];

    setarr(todaysArr);
    setremaining(getRemaining(todaysArr));
    sethighlightIndex(getHighlightedIndex(todaysArr));

    const interval = setInterval(() => {
      setremaining(getRemaining(todaysArr));
      sethighlightIndex(getHighlightedIndex(todaysArr));
    }, 3333);

    return () => {
      console.log('clear useeffect in PrayerTimesTable');
      clearInterval(interval);
    };
  }, []);

  if (arr)
    return (
      <main style={{ display: 'grid', placeItems: 'center' }}>
        <h2 className='remaining'>{remaining}</h2>
        {prayerTimeLabels.map((label, index) => (
          <div
            key={index}
            className={
              highlightIndex === index ? 'time-cell highlight' : 'time-cell'
            }
            onClick={() => setremaining(getTouched(arr[index]))}
          >
            <h2>{label}</h2>
            {/* <h2>{bell[index] === '1' ? '🔔' : '⚫️'}</h2> */}
            <h4>:</h4>
            <h2>{arr[index]}</h2>
          </div>
        ))}
      </main>
    );
}

export default PrayerTimesTable;

const prayerTimeLabels = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

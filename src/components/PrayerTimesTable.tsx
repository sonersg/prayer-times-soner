import { useEffect, useState } from 'react';
import calculateArray from '../utils/calculate';
import { getRemaining, getTouched } from '../utils/highlight';

function PrayerTimesTable() {
  const [arr, setarr] = useState<string[] | null>(null);
  const [remaining, setremaining] = useState('');

  useEffect(() => {
    const todaysArr = calculateArray(1)[0];
    setarr(todaysArr);

    setremaining(getRemaining(todaysArr));

    return () => {
      console.log('clear useeffect in PrayerTimesTable');
    };
  }, []);

  if (arr)
    return (
      <div>
        <h2 className='time-cell'>{remaining}</h2>
        {prayerTimeLabels.map((label, index) => (
          <div
            key={index}
            className='time-cell'
            onClick={() => setremaining(getTouched(arr[index]))}
          >
            <h2>{label}</h2>
            <section>
              {/* <h2>{bell[index] === '1' ? '🔔' : '⚫️'}</h2> */}
              <h4>:</h4>
              <h2>{arr[index]}</h2>
            </section>
          </div>
        ))}
      </div>
    );
}

export default PrayerTimesTable;

const prayerTimeLabels = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

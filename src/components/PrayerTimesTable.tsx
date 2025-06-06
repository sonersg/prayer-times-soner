import { useEffect, useState } from 'react';
import calculateArray from '../utils/calculate';

function PrayerTimesTable() {
  const [arr, setarr] = useState<string[] | null>(null);

  useEffect(() => {
    setarr(calculateArray(1));
    return () => {
      console.log('clear useeffect in PrayerTimesTable');
    };
  }, []);

  if (arr)
    return (
      <div>
        {prayerTimeLabels.map((label, index) => (
          <div key={index} className='time-cell'>
            <h2>{label}</h2>
            <section>
              {/* <h2>{bell[index] === '1' ? '🔔' : '⚫️'}</h2> */}
              <h4>:</h4>
              <h2>{arr[0][index]}</h2>
            </section>
          </div>
        ))}
      </div>
    );
}

export default PrayerTimesTable;

const prayerTimeLabels = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

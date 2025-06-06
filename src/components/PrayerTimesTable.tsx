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
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 222,
            }}
          >
            <h2 className='left'>{label}</h2>
            <h2 className='right'>{arr[0][index]}</h2>
          </div>
        ))}
      </div>
    );
}

export default PrayerTimesTable;

const prayerTimeLabels = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

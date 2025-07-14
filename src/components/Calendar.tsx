import { memo, useEffect, useState } from 'react';
import { getHHmmss, getHijri, getTR } from '../utils/date';

function Calendar() {
  const [HHmm, setHHmm] = useState(getHHmmss());

  // console.log('calendar is called');

  useEffect(() => {
    const interval = setInterval(() => {
      setHHmm(getHHmmss());
    }, 999);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <main className='calendar-main'>
      <p style={{ fontSize: '3rem' }}>{HHmm}</p>

      <div className='dates'>
        <p style={{ fontSize: '1rem' }}>{getTR()}</p>
        <p style={{ fontSize: '1rem' }}>{getHijri()}</p>
      </div>
    </main>
  );
}

export default memo(Calendar);

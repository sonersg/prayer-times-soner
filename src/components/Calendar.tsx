import { memo, useEffect, useState } from 'react';
import { getHHmmss, getHijri, getTR } from '../utils/date';

function Calendar() {
  const [currentTime, setCurrentTime] = useState(getHHmmss());

  useEffect(() => {
    // update current time
    const interval = setInterval(() => {
      setCurrentTime(getHHmmss());
    }, 2222);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // console.log('calendar is called');

  return (
    <main className='calendar-main'>
      <p style={{ fontSize: '3rem' }}>{currentTime}</p>

      <div className='dates'>
        <p style={{ fontSize: '1rem' }}>{getTR()}</p>
        <p style={{ fontSize: '1rem' }}>{getHijri()}</p>
      </div>
    </main>
  );
}

export default memo(Calendar);

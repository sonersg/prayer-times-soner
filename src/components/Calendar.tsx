import { memo, useEffect, useState } from 'react';
import { getHijri, getTR } from '../utils/date';

function Calendar() {
  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    // update current time
    const interval = setInterval(() => {
      setCurrentTime(getTime());
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

function getTime() {
  const date = new Date();
  let hour: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();

  if (hour < 10) hour = `0${hour}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hour}:${minutes}`;
}

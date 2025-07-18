import { Link } from 'react-router';
import PrayerTimesTable from '../components/PrayerTimesTable';
import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';

function Home() {
  const [city, setcity] = useState('Go to cities');

  // console.log('Home.tsx is called');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentCity = localStorage.getItem('current-city');
      if (currentCity) setcity(currentCity);
    }, 4444);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        // backgroundColor: '#55555533',
        borderRadius: 11,
        // height: '100vh',
        flex: 1,
        overflow: 'auto',
      }}
    >
      <Calendar />
      <PrayerTimesTable />
      <Link to='/cities'>
        <h2>{city}</h2>
      </Link>
      {/* <button onClick={scheduleNotification}>schedule a notification</button> */}
    </div>
  );
}

export default Home;

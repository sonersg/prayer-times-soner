import { Link } from 'react-router';
import PrayerTimesTable from '../components/PrayerTimesTable';
import { useEffect, useState } from 'react';
import Calendar from '../components/Calendar';

function Home() {
  const [city, setcity] = useState('Go to cities');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentCity = localStorage.getItem('current-city');
      if (currentCity) setcity(currentCity);
    }, 5555);
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
        height: '100vh',
        overflow: 'auto',
        paddingBottom: 55,
      }}
    >
      <Calendar />
      <PrayerTimesTable />
      <Link to='/cities'>
        <h2>{city}</h2>
      </Link>
    </div>
  );
}

export default Home;

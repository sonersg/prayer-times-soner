import { Link } from 'react-router';
import PrayerTimesTable from '../components/PrayerTimesTable';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#55555533',
        borderRadius: 11,
        // height: '99vh',
      }}
    >
      <h1>Home</h1>
      <PrayerTimesTable />
      <Link to='/cities'>Go to Cities</Link>
    </div>
  );
}

export default Home;

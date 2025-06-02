import { Link } from 'react-router';
import PrayerTimesTable from '../components/PrayerTimesTable';

function Home() {
  return (
    <div>
      Home
      <PrayerTimesTable />
      <Link to='/cities'>Go to Cities</Link>
    </div>
  );
}

export default Home;

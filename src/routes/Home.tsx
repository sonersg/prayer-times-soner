import { Link } from 'react-router';

function Home() {
  return (
    <div>
      Home
      <Link to='/cities'>Go to Cities</Link>
    </div>
  );
}

export default Home;

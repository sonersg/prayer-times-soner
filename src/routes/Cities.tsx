import { Link } from 'react-router';
import { iller } from '../assets/iller';

function Cities() {
  function handleClick(city: string, lat: number | null, lon: number | null) {
    console.log(city, lat, lon);
    alert(city);
  }

  return (
    <div>
      <h1>Cities</h1>
      <div
        className='scroll-view'
        style={{
          overflow: 'auto',
          maxHeight: '88vh',
          width: '66%',
          margin: '0 auto',
        }}
      >
        {iller.map((il, index) => (
          <div
            key={index}
            className='cities-item'
            onClick={() => handleClick(il.name, il.latitude, il.longitude)}
          >
            <h3>
              {il.name} - {il.code}
            </h3>
          </div>
        ))}
      </div>
      <Link to='/'>Go Home</Link>
    </div>
  );
}

export default Cities;

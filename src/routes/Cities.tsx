import { Link, useNavigate } from 'react-router';
import { iller } from '../assets/iller';

function Cities() {
  const navigate = useNavigate();

  function handleClick(city: string, lat: number | null, lon: number | null) {
    console.log(city, lat, lon);
    if (city && lat && lon) {
      localStorage.setItem('lat', lat?.toString());
      localStorage.setItem('lon', lon?.toString());
      localStorage.setItem('current-city', city);
      // alert(city);
      navigate('/');
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: 444,
        margin: '0 auto',
      }}
    >
      <h1>Cities</h1>
      <div
        className='scroll-view'
        style={{
          overflow: 'auto',
          flex: 1,
          margin: '1em 0',
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

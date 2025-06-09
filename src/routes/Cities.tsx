import { Link, useNavigate } from 'react-router';
import { iller } from '../assets/iller';
import getLocation from '../utils/location';

function Cities() {
  const navigate = useNavigate();

  async function handleClick(
    city: string,
    lat: number | null,
    lon: number | null
  ) {
    // console.log(city, lat, lon);
    if (city && lat && lon) {
      localStorage.setItem('lat', lat?.toString());
      localStorage.setItem('lon', lon?.toString());
      localStorage.setItem('current-city', city);
      navigate(-1);
    }
    if (city === 'Auto Locate') {
      const { res, latitude, longitude, accuracy } = await getLocation();
      if (res === 'success') {
        alert(
          `Latitude: ${latitude}\nLongitude: ${longitude}\nAccurasy: ${accuracy}`
        );
        localStorage.setItem('lat', latitude?.toString());
        localStorage.setItem('lon', longitude?.toString());
        localStorage.setItem('current-city', 'Auto Located');
        navigate(-1);
      } else {
        alert(res);
      }
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
      <Link to='/'>
        <span className='link-btn'>Go Home</span>
      </Link>
    </div>
  );
}

export default Cities;

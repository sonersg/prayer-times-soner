import { useNavigate } from 'react-router';
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
        // flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100vh',
        paddingBottom: 55,
        // backgroundColor: '#99999977',
      }}
    >
      <h1>Cities</h1>
      <div
        style={{
          overflow: 'auto',
          // flex: 1,
          // padding: '2em 2em',
          height: '77vh',
          minWidth: '88%',
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
    </div>
  );
}

export default Cities;

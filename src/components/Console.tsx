import { useState } from 'react';

function Console() {
  const [value, setvalue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let define = ['', ''];
    if (value.includes('~')) define = value.trim().split('~');

    if (define[0].trim().toLowerCase() === 'isha message') {
      // ISHA MESSAGE
      localStorage.setItem('isha-message', define[1].trim());
      setvalue('');
    } else if (value.trim().toLowerCase() === 'soner') {
      setvalue('Güçlü');
    } else if (value.trim().toLowerCase() === 'güçlü') {
      setvalue('');
    } else if (value.trim().toLowerCase() === 'get timezone') {
      // GET TIMEZONE
      const tz = new Date().getTimezoneOffset() / -60;
      setvalue(tz.toString());
    } else if (value.trim().slice(0, 4) === 'http') {
      // BACKGROUND IMAGE START
      localStorage.setItem('bg-img', value.trim());
      setvalue('');
    } else if (value.trim().toLowerCase() === 'defaults') {
      localStorage.removeItem('bg-img');
      localStorage.removeItem('color-primary');
      setvalue('');
      // BACKGROUND IMAGE END
    } else if (value.trim().toLowerCase() === 'i am sure to reset storage') {
      // CLEAR STORAGE
      localStorage.clear();
      setvalue('');
    } else if (value.trim()[0] === '#') {
      // SET PRIMARY COLOR
      const hexColorPattern = /^#([A-Fa-f0-9]{6})$/;
      const isValidColor = hexColorPattern.test(value.trim());
      if (isValidColor) {
        document.documentElement.style.setProperty(
          '--color-primary',
          value.trim()
        );
        localStorage.setItem('color-primary', value.trim());
        setvalue('');
      }
    } else if (define[0].trim().toLowerCase() === 'lat-lon') {
      // LATITUDE AND LONGITUDE
      const [lat, lon] = define[1].trim().split('-');
      localStorage.setItem('current-city', 'Manuel Input');
      localStorage.setItem('lat', lat);
      localStorage.setItem('lon', lon);
      setvalue('');
    }
    // else {
    //   useToast('Oyuncağa benziyor galiba.');
    //   setinput('');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={value}
        onChange={e => setvalue(e.target.value)}
      />
    </form>
  );
}

export default Console;

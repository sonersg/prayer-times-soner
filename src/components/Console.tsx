import { useState } from 'react';

function Console() {
  const [value, setvalue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let define = ['', ''];
    if (value.includes('~')) define = value.trim().split('~');

    if (value.trim().slice(2, 5) === 'dgg') {
      // RELIGIOUS DAYS NIGHTS
      //   storage.set('holy-days-nights', value.trim());
      setvalue('');
    } else if (define[0].trim().toLowerCase() === 'isha message') {
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
      //   storage.delete('theme-color');
      //   storage.delete('auto-location');
      //   storage.delete('calculation-method');
      setvalue('');
      // BACKGROUND IMAGE END
    } else if (value.trim().toLowerCase() === 'i am sure to reset storage') {
      // CLEAR STORAGE
      localStorage.clear();
      setvalue('');
    } else if (value.trim()[0] === '#') {
      // SET THEME-COLOR
      // const hexColorPattern = /^#([A-Fa-f0-9]{6})$/;
      // const isValidColor = hexColorPattern.test(value.trim());
      // if (isValidColor) {
      //   storage.set('theme-color', value.trim());
      //   setvalue('');
      // }
    } else if (define[0].trim().toLowerCase() === 'lat-lon') {
      // LATITUDE AND LONGITUDE
      //   const [lat, lon] = define[1].trim().split('-');
      //   storage.set('selected-city', 'Manuel Input');
      //   storage.set('lat', +lat);
      //   storage.set('lon', +lon);
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

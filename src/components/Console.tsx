import { useState } from 'react';

function Console() {
  const [value, setvalue] = useState('');

  // handleChange function
  const handleChange = (e: any) => {
    setvalue(e.value);

    let define = ['', ''];
    if (value.includes('~')) define = value.trim().split('~');

    if (value.trim().slice(2, 5) === 'dgg') {
      // RELIGIOUS DAYS NIGHTS
      //   storage.set('holy-days-nights', value.trim());
      setvalue('');
    } else if (define[0].trim().toLowerCase() === 'isha message') {
      // ISHA MESSAGE
      //   storage.set('isha-message', define[1].trim());
      setvalue('');
    } else if (value.trim().slice(0, 4) === 'http') {
      // BACKGROUND IMAGE START
      //   storage.set('bg-img-URL', value.trim());
      setvalue('');
    } else if (value.trim().toLowerCase() === 'defaults') {
      //   storage.delete('bg-img-URL');
      //   storage.delete('theme-color');
      //   storage.delete('auto-location');
      //   storage.delete('calculation-method');
      setvalue('');
      // BACKGROUND IMAGE END
    } else if (define[0].trim().toLowerCase() === 'notification body message') {
      // NOTIFICATION BODY MESSAGE
      //   storage.set('notification-body-message', define[1].trim());
      setvalue('');
    } else if (define[0].trim().toLowerCase() === 'sponsor of the city') {
      // SET SPONSOR OF THE CITY
      //   storage.set('sponsor-of-the-city', define[1].trim());
      setvalue('');
    } else if (value.trim().toLowerCase() === 'i am sure to reset storage') {
      // CLEAR STORAGE
      //   storage.clearAll();
      setvalue('');
    } else if (value.trim().toLowerCase() === 'get timezone') {
      // GET TIMEZONE
      const tz = new Date().getTimezoneOffset() / -60;
      setvalue(tz.toString());
    } else if (value.trim()[0] === '#') {
      // SET THEME-COLOR
      const hexColorPattern = /^#([A-Fa-f0-9]{6})$/;
      const isValidColor = hexColorPattern.test(value.trim());
      if (isValidColor) {
        // storage.set('theme-color', value.trim());
        setvalue('');
      }
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
    <div>
      <input type='text' value={value} onChange={handleChange} />
    </div>
  );
}

export default Console;

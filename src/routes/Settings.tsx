import { useEffect, useState } from 'react';

function Settings() {
  const [method, setmethod] = useState('Turkiye');

  useEffect(() => {
    const cm = localStorage.getItem('calculation-method');
    setmethod(cm || 'Turkiye');
  }, []);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'Custom') {
      // const cm = localStorage.getItem('calculation-method');
      // console.log(cm);
      return;
    }
    setmethod(e.target.value);
    localStorage.setItem('calculation-method', e.target.value);
  }

  return (
    <main style={{ display: 'grid', placeItems: 'center' }}>
      <h2>Settings</h2>

      <section>
        <select
          name='calculation-methods'
          id='calculation-methods'
          value={method}
          //@ts-ignore
          onChange={handleSelect}
        >
          <option value='Egypt'>Egyptian General Authority of Survey</option>
          <option value='Tehran'>
            Institute of Geophysics, University of Tehran
          </option>
          <option value='ISNA'>Islamic Society of North America, ISNA</option>
          <option value='MWL'>Muslim World League</option>
          <option value='Jafari'>
            Shia Ithna-Ashari, Leva Institute, Qum, Jafari
          </option>
          <option value='Turkiye'>Turkiye</option>
          <option value='Makkah'>Umm Al-Qura University, Makkah</option>
          <option value='Karachi'>
            University of Islamic Sciences, Karachi
          </option>
          <option value='Custom'>Custom</option>
        </select>
      </section>
    </main>
  );
}

export default Settings;

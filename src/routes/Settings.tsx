import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Console from '../components/Console';

function Settings() {
  const [method, setmethod] = useState('Turkiye');
  const [modalVisible, setmodalVisible] = useState(false);
  const [fajrAngle, setFajrAngle] = useState('0');
  const [ishaAngle, setIshaAngle] = useState('0');

  useEffect(() => {
    const cm = localStorage.getItem('calculation-method');
    const fa = localStorage.getItem('fajr-angle');
    const ia = localStorage.getItem('isha-angle');
    if (cm) setmethod(cm);
    if (fa) setFajrAngle(fa);
    if (ia) setIshaAngle(ia);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value === 'Custom') setmodalVisible(true);
    if (e.target.value != 'Custom') {
      localStorage.removeItem('fajr-angle');
      localStorage.removeItem('isha-angle');
    }
    setmethod(e.target.value);
    localStorage.removeItem('tunes-object');
    localStorage.setItem('calculation-method', e.target.value);
  }

  const handleClick = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    degree: string,
    angle: string
  ) => {
    e.stopPropagation(); // Stops the event from reaching the outer div
    if (angle === 'fajr') {
      setFajrAngle(degree);
      localStorage.setItem('fajr-angle', degree);
    }
    if (angle === 'isha') {
      setIshaAngle(degree);
      localStorage.setItem('isha-angle', degree);
    }
  };

  return (
    <main style={{ display: 'grid', placeItems: 'center', flex: 1 }}>
      <h2>Settings</h2>

      <Console />

      <div>
        <label htmlFor='calculation-methods'>Choose a calculation method</label>
        <section>
          <select
            name='calculation-methods'
            id='calculation-methods'
            value={method}
            onChange={handleChange}
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
            <option value='Turkiye'>Türkiye</option>
            <option value='Makkah'>Umm Al-Qura University, Makkah</option>
            <option value='Karachi'>
              University of Islamic Sciences, Karachi
            </option>
            <option value='Custom'>Custom</option>
          </select>
        </section>
      </div>

      <Modal modalVisible={modalVisible} setmodalVisible={setmodalVisible}>
        <main
          className='modal-inner-container'
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <h3>Fajr Angle: {fajrAngle} °</h3>
            <h3>Isha Angle: {ishaAngle} °</h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1em',
            }}
          >
            <div className='spinner-container'>
              {degrees.map((degree) => (
                <h3
                  key={degree}
                  onClick={(e) => handleClick(e, degree, 'fajr')}
                >
                  {degree} °
                </h3>
              ))}
            </div>
            <div className='spinner-container'>
              {degrees.map((degree) => (
                <h3
                  key={degree}
                  onClick={(e) => handleClick(e, degree, 'isha')}
                >
                  {degree} °
                </h3>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button onClick={() => setmodalVisible(false)}>OK</button>
          </div>
        </main>
      </Modal>
    </main>
  );
}

export default Settings;

const degrees = [
  '4.0',
  '5.0',
  '6.0',
  '7.0',
  '8.0',
  '9.0',
  '10.0',
  '11.0',
  '12.0',
  '13.0',
  '14.0',
  '15.0',
  '15.5',
  '16.0',
  '16.5',
  '17.0',
  '17.5',
  '18.0',
  '18.5',
  '19.0',
  '19.5',
  '20.0',
  '20.5',
  '21.0',
  '21.5',
  '22.0',
  '22.5',
  '23.0',
  '24.0',
  '25.0',
  '26.0',
  '27.0',
  '28.0',
];

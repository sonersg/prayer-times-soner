import { useEffect, useState } from 'react';
import calculateArray from '../utils/calculate';
import {
  getHighlightedIndex,
  getRemaining,
  getTouched,
} from '../utils/highlight';
import Modal from './Modal';

function PrayerTimesTable() {
  const [arr, setarr] = useState<string[] | null>(null);
  const [remaining, setremaining] = useState('');
  const [highlightIndex, sethighlightIndex] = useState(-1);
  const [modalVisible, setmodalVisible] = useState(false);
  const [TR, setTR] = useState(false);
  const [tunesObject, settunesObject] = useState(defaultTunesObject);

  useEffect(() => {
    const to = localStorage.getItem('tunes-object');
    if (to) settunesObject(JSON.parse(to));

    const todaysArr = calculateArray(1)[0];

    setarr(todaysArr);
    setremaining(getRemaining(todaysArr));
    sethighlightIndex(getHighlightedIndex(todaysArr));

    const interval = setInterval(() => {
      setremaining(getRemaining(todaysArr));
      sethighlightIndex(getHighlightedIndex(todaysArr));
    }, 3333);

    return () => {
      console.log('clear useeffect in PrayerTimesTable');
      clearInterval(interval);
    };
  }, []);

  function handleDoubleClick(label: string) {
    setmodalVisible(true);
    settunesObject({ ...tunesObject, label: label });
  }

  function handleSpinnerClick(min: string) {
    const currentLabel = tunesObject.label.toLowerCase();
    const updatedTunesObject = { ...tunesObject, [currentLabel]: min };
    settunesObject(updatedTunesObject);
    localStorage.setItem('tunes-object', JSON.stringify(updatedTunesObject));
    setarr(calculateArray(1)[0]);
  }

  function handleResetOffsets() {
    localStorage.removeItem('tunes-object');
    settunesObject({
      ...tunesObject,
      fajr: '0',
      sunrise: '0',
      dhuhr: '0',
      asr: '0',
      maghrib: '0',
      isha: '0',
    });
    setarr(calculateArray(1)[0]);
  }

  if (arr)
    return (
      <main style={{ display: 'grid', placeItems: 'center' }}>
        <h2 className='remaining'>{remaining}</h2>
        {prayerTimeLabels.map((label, index) => (
          <div
            key={index}
            className='time-cell'
            onClick={() => setremaining(getTouched(arr[index]))}
          >
            <h2
              className={highlightIndex === index ? 'remaining' : ''}
              onDoubleClick={() => setTR((prev) => !prev)}
            >
              {TR ? getTurkish(index) : label}
            </h2>
            {/* <h2>{bell[index] === '1' ? '🔔' : '⚫️'}</h2> */}
            <h4>:</h4>
            <h2
              className={highlightIndex === index ? 'remaining' : ''}
              onDoubleClick={() => handleDoubleClick(label)}
            >
              {arr[index]}
            </h2>
          </div>
        ))}

        <Modal modalVisible={modalVisible} setmodalVisible={setmodalVisible}>
          <main
            className='modal-inner-container'
            onClick={(e) => e.stopPropagation()}
          >
            <h3>
              {tunesObject.label}:{' '}
              {
                tunesObject[
                  tunesObject.label.toLowerCase() as keyof typeof tunesObject
                ]
              }{' '}
              min
            </h3>

            <div>
              <div className='spinner-container'>
                {mins.map((min) => (
                  <h3 key={min} onClick={() => handleSpinnerClick(min)}>
                    {min} min
                  </h3>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button onClick={handleResetOffsets}>RESET OFFSETS</button>
              <button onClick={() => setmodalVisible(false)}>OK</button>
            </div>
          </main>
        </Modal>
      </main>
    );
}

export default PrayerTimesTable;

function getTurkish(index: number) {
  const TRLabels = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];
  return TRLabels[index];
}

// Don't change the names in the array below, they r used for object access.
const prayerTimeLabels = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

const defaultTunesObject = {
  label: '',
  fajr: '0',
  sunrise: '0',
  dhuhr: '0', // Add 5 minutes to dhuhr
  asr: '0',
  maghrib: '0',
  isha: '0',
};

const mins = [
  '-44',
  '-43',
  '-42',
  '-41',
  '-40',
  '-39',
  '-38',
  '-37',
  '-36',
  '-35',
  '-34',
  '-33',
  '-32',
  '-31',
  '-30',
  '-29',
  '-28',
  '-27',
  '-26',
  '-25',
  '-24',
  '-23',
  '-22',
  '-21',
  '-20',
  '-19',
  '-18',
  '-17',
  '-16',
  '-15',
  '-14',
  '-13',
  '-12',
  '-11',
  '-10',
  '-9',
  '-8',
  '-7',
  '-6',
  '-5',
  '-4',
  '-3',
  '-2',
  '-1',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
];

interface ILocationResult {
  res: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}

export default function getLocation(): Promise<ILocationResult> {
  return new Promise((resolve) => {
    const defaultResult = {
      res: '',
      latitude: 0,
      longitude: 0,
      accuracy: 0,
    };

    if ('geolocation' in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            res: 'success',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy, // in meters
          });
        },
        (error) => {
          let res = '';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              res = 'User denied the request for Geolocation.';
              break;
            case error.POSITION_UNAVAILABLE:
              res = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              res = 'The request to get user location timed out.';
              break;
            default:
              res = 'An unknown error occurred.';
          }
          resolve({ ...defaultResult, res });
        },
        {
          // Optional options
          enableHighAccuracy: true, // Request high accuracy (may take longer)
          timeout: 5000, // Maximum time to wait for location (in milliseconds)
          maximumAge: 0, // Do not use a cached position
        }
      );
    } else {
      // Geolocation is not supported
      resolve({
        ...defaultResult,
        res: 'Geolocation is not supported by this browser.',
      });
    }
  });
}

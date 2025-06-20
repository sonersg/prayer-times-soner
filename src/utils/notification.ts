// const triggerTime = Date.now() + 3 * 1000;

export async function scheduleNotification() {
  Notification.requestPermission().then((result) => {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: 'icon-192x192.png',
          //   vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample',
        });
      });
    }
  });
}

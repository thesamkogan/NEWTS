import axios from 'axios';

export default function subscribePush() {
  const vapidPublicKey =
    'BNry0JPtUoohxAgDrv6rP7m6uWVM0DudtqAxFaalucJHbjSqyDYM3plgoR3lwVOXaWpcLCmdtPoMfKSb_kDK5rY';
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  navigator.serviceWorker.ready.then(registration => {
    if (!registration.pushManager) {
      // alert('Push Unsupported');
      return;
    }

    registration.pushManager
      .subscribe({
        userVisibleOnly: true, //Always display notifications
        applicationServerKey: convertedVapidKey
      })
      .then(subscription => axios.post('/api/push/register', subscription))
      .catch(err => console.error('Push subscription error: ', err));
  });

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}


export function unsubscribePush() {
  navigator.serviceWorker.ready.then(registration => {
    //Find the registered push subscription in the service worker
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (!subscription) {
          return
          //If there isn't a subscription, then there's nothing to do
        }

        subscription
          .unsubscribe()
          .then(() => axios.delete('/api/push/unregister'))
          .catch(err => console.error(err))
      })
      .catch((err) => console.error(err))
  })
}

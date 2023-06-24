
import messaging from '@react-native-firebase/messaging';
import {
  StoreDatatoAsync,
  getDatafromAsync,
} from '../repository/AsyncStorageServices';
import DeviceInfo from 'react-native-device-info';
import notifee from '@notifee/react-native';
import {ToastAndroid} from 'react-native';
// import {Text,Alert} from 'react-native';
// import * as Animatable from 'react-native-animatable';

async function onDisplayNotification(title, body) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // alert('hi')
  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('authStatus', enabled);
  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  } else {
    alert('Push NotificationPermission Not enabled');
  }
}

async function getFCMToken() {
  // alert('old')
  let fcmtoken = await getDatafromAsync('fcmtoken');
  console.log('FCM_TOKEN_OLD', fcmtoken);
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      console.log('FCM_TOKEN_NEW', fcmtoken);
      //   alert('new')
      if (fcmtoken) {
        await StoreDatatoAsync('fcmtoken', fcmtoken);
      }
    } catch (err) {
      console.log('catch error in push notification', err);
    }
  }
}

export const NotificationListner = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  // alert('hi')
  messaging().onNotificationOpenedApp(remoteMessage => {
    // console.log(
    //   'Notification caused app to open from background state:',
    //   remoteMessage.notification,
    // );
    // alert(remoteMessage.notification);
    // alert(JSON.stringify(remoteMessage));
    console.log("=====================>",remoteMessage.notification);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      } else {
        // alert('else')
      }
    });
  messaging().onMessage(async remoteMessage => {
    ToastAndroid.showWithGravityAndOffset(
      `${JSON.stringify(remoteMessage.notification.body)}`,
      ToastAndroid.TOP,
      ToastAndroid.LONG,
      10,
      10,
    );
    // return(
    // <Animatable.View animation='bounceInDown' >
    //   <Text>{remoteMessage.notification.body}</Text>
    // </Animatable.View>
    // )
    // onDisplayNotification(remoteMessage.notification.title,remoteMessage.notification.body)
    // Alert.alert(`Notification`, `${remoteMessage.notification.body}`);
    console.log('forgoound push notification', remoteMessage.notification);
  });
};

// export const NotificationListner = () => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification Caused app to open from background state',
//             remoteMessage.notification,
//         );
//     });
//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if(remoteMessage){
//                 console.log(
//                     'Notification Caused app to open from background state',
//                     remoteMessage.notification,
//                 )
//             }
//         })

//     messaging().onMessage(async remoteMessage => {
//         console.log("Notification on forground state....", remoteMessage)
//     })

// }

export async function getDeviceInfo() {
  let deviceName = await getDatafromAsync('deviceName');
  // alert(deviceName)
  if (!deviceName) {
    try {
      DeviceInfo.getDeviceName().then(deviceName => {
        let dName = deviceName.replace(/[^a-zA-Z0-9]/g, "")
        StoreDatatoAsync('deviceName', dName);
        console.log('DEVICE_NAME :- ', dName);
      });
    } catch (e) {
      console.log('catch error from device Name function', e);
    }
  }
}

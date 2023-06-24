import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCfkfawn_bBYW9bnBKmVqHd9tP3Iw-A9-g',
  authDomain: 'rncrud-76ea3.firebaseapp.com',
  databaseURL: 'https://rncrud-76ea3.firebaseio.com',
  projectId: 'rncrud-76ea3',
  storageBucket: 'rncrud-76ea3.appspot.com',
  messagingSenderId: '724736049958',
  appId: '1:724736049958:web:2ef3e3d1839705c67cf7e7',
  measurementId: 'G-DWH7DT0QSN',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {firebase, Auth, database, storage};

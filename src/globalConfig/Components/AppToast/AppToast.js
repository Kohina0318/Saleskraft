import {ToastAndroid} from 'react-native';

export default function AppToast(message) {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
  );
}

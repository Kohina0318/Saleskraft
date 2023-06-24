import React from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    Dimensions,
    BackHandler,
} from 'react-native';

import Father from 'react-native-vector-icons/Feather';
import styles from '../../assets/css/styleCreateTour';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { store } from '../../../App';
const { width } = Dimensions.get('window');
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
export default function HeaderWithPicker(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const navigation = useNavigation();

    function handleBackButtonClick() {
        store.dispatch({ type: 'REMOVE_ALL_TOUR_PLANS' })
        store.dispatch({ type: 'REMOVE_ROSTER_PLANS' })
        store.dispatch({ type: 'REMOVE_ROSTER_PLANS_FINALE' })
        navigation.goBack()
        return true;
    }

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButtonClick,
            );
        };
    }, []);


    return (
        <View style={{ ...styles.headerCTP, backgroundColor: themecolor.HEADERTHEMECOLOR }}>
            <View
                style={styles.innerview}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                        store.dispatch({ type: 'REMOVE_ALL_TOUR_PLANS' })
                        store.dispatch({ type: 'REMOVE_ROSTER_PLANS' })
                        store.dispatch({ type: 'REMOVE_ROSTER_PLANS_FINALE' })
                        navigation.goBack()
                    }}>
                    <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.hw}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <View style={styles.widths}>
                    <Text style={styles.Text}>{props.title}</Text>
                </View>
            </View>
            <View style={styles.MV15} />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around', alignSelf: 'center', width: width * 0.95, height: 40,

            }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: width * 0.45, borderRadius: 10, backgroundColor: 'white', backgroundColor: themecolor.BOXTHEMECOLOR }}>
                    <TextInput value={props.startdate} style={{ width: width * 0.35, alignSelf: 'center', textAlign: 'center', color: themecolor.TXTWHITE }} editable={false} />
                    <Father name="calendar" style={{ ...styles.calendar, color: themecolor.TXTWHITE }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', width: width * 0.45, borderRadius: 10, backgroundColor: 'white', backgroundColor: themecolor.BOXTHEMECOLOR }}>
                    <TextInput value={props.enddate} style={{ width: width * 0.35, alignSelf: 'center', textAlign: 'center', color: themecolor.TXTWHITE, }} editable={false} />
                    <Father name="calendar" style={{ ...styles.calendar, color: themecolor.TXTWHITE }} />
                </View>

            </View>
            <View style={styles.MV10} />
        </View>
    )
}
HeaderWithPicker.defaultProps = {
    title: ''
}
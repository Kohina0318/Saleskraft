import React, { useState } from 'react';
import {
    TouchableOpacity,
    StatusBar,
    View,
    Text,
    ScrollView,
    TextInput,
} from 'react-native';
import Father from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/styleTrip';
import Header_2 from '../../components/shared/Header_2';
import VerifyModal from '../../components/shared/VerifyModel';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { useNavigation } from '@react-navigation/native';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function UpdateTrip(props) {
    const modes = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(modes).getThemeColor()
    // console.log("params updatetrip==>",props.route.params.tripData)
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [modalVisible1, setmodalVisible1] = useState(false);
    const [modalVisible2, setmodalVisible2] = useState(false);
    const handlePress = () => {
        setmodalVisible1(true);
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };
    const showMode = currentMode => {
        setMode(currentMode);
    };
    const showDatepicker = () => {
        setShow(true);
        showMode('date');
    };

    // var tripData = props.route.params.tripData

    return (
        <View style={{...styles.FirstView,backgroundColor: themecolor.THEMECOLOR}}>
            <StatusBar translucent backgroundColor="transparent" />
            <Header_2 title={"Update Trip"} onPress={() => props.navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.SView}>
                <View style={{ marginVertical: 5 }} />
                <View style={{...styles.datacheckFlatView,backgroundColor: themecolor.THEMECOLOR}}>
                    <View>
                        <Text style={styles.title}>My Trip</Text>
                    </View>
                    <View style={styles.textContainer1}>

                        <Picker mode="dropdown" style={{ width: '100%', }}>
                            <Picker.Item
                                label="Ex-HQ"
                                style={{
                                    fontSize: FontSize.labelText,
                                    color: '#333',
                                    height: 10,
                                    fontFamily: FontFamily.PopinsMedium
                                }}
                                value=""
                            />
                            <Picker.Item
                                label="Out station"
                                style={{ color: '#333', fontWeight: 'bold' }}
                                value=""
                            />

                        </Picker>
                    </View>
                </View>
                <View style={{ marginVertical: 5 }} />
                <View style={styles.TViewMain}>
                    <View style={{ marginVertical: 0 }} />
                    <View style={styles.datacheckFlatView}>
                        <Text style={styles.title}>Origin location</Text>
                        <View style={styles.textContainer1}>
                            <TextInput
                                placeholder="Thatipur, Gwalior"
                                keyboardType="name-phone-pad"
                                style={styles.FullInput}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 4 }} />
                    <View style={styles.datacheckFlatView}>
                        <Text style={styles.title}>Destination location</Text>
                        <View style={styles.textContainer1}>
                            <TextInput
                                placeholder="Indore, Madhya Pradesh"
                                keyboardType="name-phone-pad"
                                style={styles.FullInput}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 4 }} />
                    <View style={styles.datacheckFlatView}>
                        <Text style={styles.title}>Reason</Text>
                        <View style={{ ...styles.textContainer1, ...styles.Height70 }}>
                            <TextInput
                                placeholder="Personal Trip"
                                keyboardType="name-phone-pad"
                                multiline={true}
                                style={styles.TextArea}
                            />
                        </View>
                    </View>
                    <View style={{ marginVertical: 4 }} />
                    <View style={styles.datacheckFlatView}>
                        <View>
                            <Text style={styles.title}>Budget</Text>
                        </View>
                        <View style={styles.textContainer1}>
                            <Picker mode="dropdown" style={{ width: '100%', }}>
                                <Picker.Item
                                    label="Ex-HQ"
                                    style={{
                                        fontSize: FontSize.labelText,
                                        color: '#333',
                                        height: 10,
                                        fontFamily: FontFamily.PopinsMedium
                                    }}
                                    value=""
                                />
                                <Picker.Item
                                    label="Out station"
                                    style={{ color: '#333', fontWeight: 'bold' }}
                                    value=""
                                />

                            </Picker>
                        </View>
                    </View>


                    <View style={{ marginVertical: 5 }} />
                    <View style={styles.datacheckFlatView}>
                        <Text style={styles.title}>Start date & time</Text>
                        <View style={styles.textContainer1}>
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={styles.RangeDateView1}>
                                    <TextInput
                                        editable={false}
                                        value={date.toUTCString().substring(0, 16)}
                                        label="* Enter Date"
                                        style={styles.SelectDateInput}
                                        underlineColor={'transparent'}
                                        labelStyle={{ fontSize: 12 }}
                                    />
                                    <Father name="calendar" style={styles.CalendarIcon} />
                                </View>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                    {/* Pickup request */}

                    <View style={{ marginVertical: 4 }} />
                    <View style={styles.datacheckFlatView}>
                        <Text style={styles.title}>End date & time</Text>
                        <View style={styles.textContainer1}>
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={styles.RangeDateView1}>
                                    <TextInput
                                        editable={false}
                                        value={date.toUTCString().substring(0, 16)}
                                        label="* Enter Date"
                                        style={styles.SelectDateInput}
                                        underlineColor={'transparent'}
                                        labelStyle={{ fontSize: 12 }}
                                    />
                                    <Father name="calendar" style={styles.CalendarIcon} />
                                </View>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>
                    {/* Pickup request end */}
                </View>
                <View style={{ marginVertical: 7 }} />
                <View style={styles.center}>
                    <FullsizeButton backgroundColor={Colors.bluetheme} onPress={() => handlePress()} title='Update Trip' />
                </View>
            </ScrollView>
            {/*=============otp modal start=============== */}
            {modalVisible1 &&
                <VerifyModal
                    PressDone={() => navigation.navigate('MyTrip')}
                    SubText="Are you sure you wants to update the trip ?"
                    modalVisible1={modalVisible1}
                    setmodalVisible1={setmodalVisible1}
                    handleOpen2={() => {
                        setmodalVisible1(false);
                        setmodalVisible2(true);
                    }}
                />

            }
        </View>
    );
}
import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    Image,
    Dimensions,
    TextInput,
    Platform,
    PermissionsAndroid,
    TouchableOpacity
} from 'react-native';

import StyleCss from '../../assets/css/styleOutlet';
import styles from '../../assets/css/stylesDashboard'
import { Colors } from '../../assets/config/Colors';
import { Picker } from '@react-native-picker/picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import {
    launchCamera,
} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import { openDatabase } from 'react-native-sqlite-storage';
import { getUserCurrentLocationCommon } from '../../repository/commonRepository';

const { width } = Dimensions.get('window');
var db = openDatabase({ name: 'Beatdump.db' });

export default CheckoutModal = props => {
    console.log("Navigate From in Checkout Modal--->", props.navigateFrom)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const toast = useToast();
    const network = useSelector(state => state.network);
    const [filePath, setFilePath] = useState({});
    const [modalVisible2, setModalVisible2] = useState(true);
    const [meetingNotes, setMeetingNotes] = useState('No retailing');
    const [remark, setRemark] = useState('');
    const [refresh, setRefresh] = useState(false);
    const checkoutImage = useSelector(state => state.CheckoutImage);
    const currentLatLng = useSelector(state => state.currentLatLng);
    // console.log("CheckoutImage IN CheckoutModal Line 41........",checkoutImage)

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    //Camera portion start
    const captureImage = async (type, { setRefresh, refresh }) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, response => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    // alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                console.log('base64 -> ', response.assets[0].base64);
                console.log('uri -> ', response.uri);
                console.log('width -> ', response.assets[0].width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.assets[0].fileName);
                setFilePath(response);
                ImgToBase64.getBase64String(`${response.assets[0].uri}`).then(
                    base64String => {
                        // console.log('Base 64 String ....', base64String);
                        let body = {
                            imgurl: base64String,
                            id: response.assets[0].fileName,
                        };
                        dispatch({
                            type: 'ADD_CHECKOUT_IMAGE',
                            payload: base64String,
                        });
                        setRefresh(!refresh);
                    },
                );
                // .catch(err => alert('Error During Bas64 Converting...'));
            });
        }
    };
    /******* Images Part End */


    // const handleClickOnDone = () =>{
    //   setModalVisible2(!modalVisible2)
    //   navigation.push(props.navigateTo,{
    //       navigateFrom:props.navigateFrom
    //   });
    // }

    const handleClickOnCancel = () => {
        setModalVisible2(!modalVisible2);
        props.setIsCheckoutModalVisible(false);
    };

    const handleClickOnSubmit = async () => {
        var Checkout_Lat = '';
        var Checkout_Lng = '';
        if (meetingNotes == '') {
            toast.show("Please choose meeting note.", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
                offset: 30,
                animationType: "slide-in",
            });
        }
        else if (remark == '') {
            toast.show("Please fill meeting remark.", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
                offset: 30,
                animationType: "slide-in",
            });
        }


        else {
            try {

                let getCurrentAddress = await getUserCurrentLocationCommon(currentLatLng.latitude,
                    currentLatLng.longitude);

                await db.transaction(async tx => {
                    await tx.executeSql("UPDATE CheckinCheckout SET EndTime=?,Checkout_Lat=?,Checkout_Lng=?,isBeatEnd=?,MeetingEndNotes=?,Remark=?,chekout_address=? where OutletId=? AND EndTime IS NULL", [
                        new Date(),
                        currentLatLng.latitude,
                        currentLatLng.longitude,
                        true,
                        meetingNotes,
                        remark,
                        getCurrentAddress,
                        props.outletId
                    ], async (tx, results) => {
                        // alert('Line 67 Update in checkincheckout'+JSON.stringify(results))
                        var temp = [
                        ];
                        for (let i = 0; i < results.rows.length; ++i) {
                            temp.push(results.rows.item(i));
                        }

                        props.setIsCheckoutModalVisible(false);
                        console.log("Data return After UPDATION of CheckinCheckout Line 64 --->", temp);


                    });
                });
            } catch (e) {
                alert(e);
            }

            await updateOutletStatus()
        }
        console.log("props.outletId-->", props.outletId);
        console.log("meetingNotes-->", meetingNotes);
        console.log("remark-->", remark);

    };


    const updateOutletStatus = async () => {
        // alert("Hi")
        try {
            await db.transaction(async tx => {
                await tx.executeSql("UPDATE Outlets SET BeatStatus=? where Id=?", [
                    'Completed',
                    props.outletId

                ], (tx, results) => {
                    console.log("tx Line 105-->" + tx)
                    console.log("result Line 106-->" + results)
                    // alert('Line 103 Update in Outlets'+JSON.stringify(results))
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                    }
                    // if(temp[0].isBeatStart == '1'){
                    //   setCheckinStatus(false) 
                    // }
                    // setCheckinCheckoutData(temp);
                    // props.setRefresh(!props.refresh);

                    if (props.navigateFrom == 'AirportRoute') {
                        // props.beatName
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AirportRoute', params: { beatName: props.beatName, beatId: props.beatId } }],
                        });
                    } else {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'RetailerCustomer', params: { beatName: props.beatName } }],
                        });
                    }
                    console.log('Data returned after UPDATION of Outlets SQLITE Line  83----->', temp);
                });
            });
        } catch (e) {
            alert(e);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible2}
        // onRequestClose={() => {
        //     setModalVisible2(!modalVisible2);
        // }}
        >
            <View style={StyleCss.centeredView}>
                <View style={StyleCss.modalView}>
                    <View style={StyleCss.ModalViewWidth}>
                        <View>
                            <Text style={StyleCss.titleReport}>Report Item</Text>
                        </View>

                        <View style={StyleCss.ModelVideoCenter}>
                            <View style={StyleCss.view3}>
                                <View style={StyleCss.textContainer}>
                                    <Picker
                                        mode="dropdown"
                                        style={StyleCss.widths}
                                        itemStyle={StyleCss.heights1}
                                        selectedValue={meetingNotes}
                                        onValueChange={item => {
                                            setMeetingNotes(item);
                                        }}>
                                        <Picker.Item
                                            label="No retailing"
                                            style={StyleCss.picker1}
                                            value="No retailing"
                                        />
                                        <Picker.Item
                                            label="Sales Pitch"
                                            style={StyleCss.picker1}
                                            value="Sales Pitch"
                                        />
                                        <Picker.Item
                                            label="Sampling"
                                            style={StyleCss.picker1}
                                            value="Sampling"
                                        />
                                        <Picker.Item
                                            label="Telephonic order"
                                            style={StyleCss.picker1}
                                            value="Telephonic order"
                                        />
                                        <Picker.Item
                                            label="Postponed order"
                                            style={StyleCss.picker1}
                                            value="Postponed order"
                                        />
                                    </Picker>
                                </View>
                            </View>
                            <View style={StyleCss.MV5} />
                            <View style={StyleCss.view3}>
                                <View style={StyleCss.textContainerRemark}>
                                    <TextInput
                                        placeholder="Enter Remark"
                                        keyboardType="name-phone-pad"
                                        multiline={true}
                                        style={StyleCss.textStyleText}
                                        onChangeText={txt => setRemark(txt)}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* </View> */}

                        <View style={StyleCss.FLexLeft}>
                            {network ? (
                                <>
                                    <View style={StyleCss.MV5} />
                                    <TouchableOpacity
                                        onPress={() => captureImage('photo', { setRefresh, refresh })}
                                    // onPress={() => alert("Hii")}
                                    >
                                        <View

                                            style={StyleCss.CameraView}>
                                            <FAIcon
                                                size={30}
                                                style={StyleCss.ImageView}
                                                name="camera"
                                            />
                                        </View>

                                    </TouchableOpacity>
                                    <View style={{ ...styles.ProImageView, padding: 10 }}>

                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${checkoutImage}` }}
                                            style={{ width: 50, height: 50, borderRadius: 10 }}
                                            resizeMode={'contain'}
                                        />
                                    </View>
                                </>

                            ) : (
                                <></>
                            )}
                        </View>
                        <View style={StyleCss.MV5} />
                        <View style={StyleCss.MV5} />
                        <View style={StyleCss.FLexLeft}>
                            <FullsizeButton
                                width={width * 0.32}
                                BRadius={30}
                                height={35}
                                backgroundColor={Colors.bluetheme}
                                onPress={() => handleClickOnSubmit()}
                                title="Submit"
                            />
                            <FullsizeButton
                                width={width * 0.25}
                                BRadius={30}
                                height={35}
                                backgroundColor={'transparent'}
                                titlecolor={Colors.grey}
                                onPress={() => handleClickOnCancel()}
                                title="Cancel"
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

import {
    FlatList,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    Modal
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useToast } from 'react-native-toast-notifications';

import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { FontSize } from '../../assets/fonts/Fonts';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { StoreDatatoAsync } from '../../repository/AsyncStorageServices';
import styles from '../../assets/css/stylesDashboard';
import { Colors } from '../../assets/config/Colors';
import { RadioButton, Avatar, Checkbox } from 'react-native-paper';
import { db } from '../../helper/SQLite DB/Sqlite';

import { getAllBeats } from '../../repository/dashboard/DashboardRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBeatOutlets } from '../../repository/beat Planning/beatPlaningRepository';
const { width, height } = Dimensions.get('window');


const TourTeam = ({ item, props, themecolor, saveEmpData, setModalVisible1, getBeats, modalVisible1 }) => {
    console.log('itemitem000222', item);
    const [fullname, setfullname] = useState(
        `${item?.FirstName} ${item?.LastName}`
    );
    return (
        <>
            <TouchableOpacity
                onPress={() =>
                // saveEmpData()
                {
                    getBeats(item.EmployeeId);
                    // setModalVisible1(!modalVisible1)
                }
                }
                style={{
                    flexDirection: 'row',
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    width: width * 0.93,
                    marginTop: 5,
                    padding: 7,
                    borderRadius: 12,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: 50,
                        height: 50,
                        borderWidth: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        borderRadius: 50,
                        overflow: 'hidden',
                        marginLeft: 6,
                    }}>
                    {/* {item.ProfilePicture == null || item.ProfilePicture == '' ? ( */}
                    <Image
                        source={require('../../assets/images/dummyuser.png')}
                        style={{ height: 50, width: 50 }}
                        resizeMode={'cover'}
                    />
                    {/* ) : ( */}
                    {/* <Image
                source={{
                  uri: `${getBaseUrl}uploads/2/${item.ProfilePicture}`,
                }}
                style={{height: 60, width: 60}}
                resizeMode={'stretch'}
              />
            )} */}
                </View>
                <View style={{ width: width * 0.93 - 80, marginLeft: 8 }}>
                    <Text
                        style={{
                            color: themecolor.TXTWHITE,
                            fontSize: FontSize.labelText2,
                            fontFamily: FontFamily.Popinssemibold,
                            top: 4,
                        }}>
                        {fullname}
                    </Text>
                    <View style={{ marginVertical: 2 }} />
                    <Text
                        style={{
                            color: themecolor.TXTWHITE,
                            fontSize: FontSize.smallText,
                            fontFamily: FontFamily.PopinsMedium,
                        }}>
                        {item.Designations.Designation}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    );
};

function ItemCheked({
    item,
    checked,
    setChecked,
    index,
    setBeatName,
    defaultBeat,
    themecolor,
    // agendaType1
}) {
    console.log('item-->', item);
    const [g, s] = React.useState({});
    const [refresh, setRefresh] = React.useState(false);

    // const network = useSelector(state => state.network);
    console.log(item);

    const handleRadioBox = (id, name) => {
        console.log('Event>>>>', id, name);
        console.log('isChecked-->>>>', item.isChecked);
        setChecked(id);
        setBeatName(name);
        setRefresh(!refresh);
    };

    var answr;
    answr = g[item.BeatId];
    console.log('answer----->', answr);
    return (
        <>
            {/* If Default Beat != ''  */}
            {defaultBeat != '' ? (
                item.isBeat ? (
                    <>
                        <View style={styles.CenterView}>
                            <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>Default Beat</Text>
                            <TouchableOpacity>
                                <View style={styles.R1}>
                                    <View style={styles.RadioVIew}>
                                        <RadioButton
                                            value={answr}
                                            color={themecolor.TXTWHITE}
                                            uncheckedColor={themecolor.TXTWHITE}
                                            status={
                                                item.BeatId == checked ? 'checked' : 'unchecked'
                                            }
                                            onPress={() =>
                                                handleRadioBox(item.BeatId, item.BeatName)
                                            }
                                        />
                                    </View>
                                    <Text style={{ ...styles.BoxHeading, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Borderline2} />
                        <View style={styles.MV5} />
                        <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>All Beats</Text>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                            activeOpacity={1}
                        // style={{ backgroundColor: answr == checked ? '#FFF' : '#fff' }}
                        >
                            <View style={styles.RadioVIew}>
                                <RadioButton
                                    // value={item.isChecked}
                                    color={themecolor.TXTWHITE}
                                    uncheckedColor={themecolor.TXTWHITE}
                                    status={item.BeatId == checked ? 'checked' : 'unchecked'}
                                    onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                                />

                                <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )
            ) : (
                <>
                    {index == 0 ? (
                        <Text style={{ ...styles.submittext, color: themecolor.TXTWHITE }}>All Beats</Text>
                    ) : (
                        <></>
                    )}
                    <TouchableOpacity
                        onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                        activeOpacity={1}
                    // style={{ backgroundColor: answr == checked ? '#FFF' : '#fff' }}
                    >
                        <View style={styles.RadioVIew}>
                            <RadioButton
                                // value={item.isChecked}
                                color={themecolor.TXTWHITE}
                                uncheckedColor={themecolor.TXTWHITE}
                                status={item.BeatId == checked ? 'checked' : 'unchecked'}
                                onPress={() => handleRadioBox(item.BeatId, item.BeatName)}
                            />

                            <Text style={{ ...styles.RadioText, color: themecolor.TXTWHITE }}>{item.BeatName}</Text>
                        </View>
                    </TouchableOpacity>
                </>
            )}

        </>
    );
}

export default EmpListForBeats = props => {
    const network = useSelector(state => state.network);
    const toast = useToast();
    // alert(JSON.stringify(props.route.params))
    var arr = [];
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const roles = useSelector(state => state.userRoles);
    const [teamlist, setteamlist] = useState([]);
    // const [modalVisible5, setmodalVisible5] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [allBeats, setAllBeats] = useState([]);
    const [checked, setChecked] = useState('');
    const [beatName, setBeatName] = React.useState('');
    const [defaultBeat, setIsDefaultBeat] = useState('');
    const [loader, setLoader] = useState(false);





    const getMyTeam = async () => {
        const result = await gettripLocationApi(`api/getMyTeam?filter=0`);
        console.log('data in console', result.data.team);
        setteamlist(result.data.team);
        // setfullname(result.data.FirstName);
    };

    useEffect(() => {
        getMyTeam();
        // getBeats();
    }, []);

    const getBeats = async (emp) => {
        // alert("empId in Beat component",props.empId)
        // console.log("data of empid on beat component",props.empId)
        // alert(JSON.stringify(props))
        try {
            let res = await getAllBeats(emp);
            console.log('res Line 70 In DashboardStartDay====', res);
            if (res.statusCode == 200) {
                if (res.data.DefaultBeat != null) {
                    if (Object.keys(res.data.DefaultBeat).length > 0) {
                        res.data.DefaultBeat['isBeat'] = true;
                        res.data.DefaultBeat['isChecked'] = true;
                        setIsDefaultBeat('yes');
                        arr.push(res.data.DefaultBeat);
                        setChecked(res.data.DefaultBeat.BeatId);
                        setBeatName(res.data.DefaultBeat.BeatName);
                        await AsyncStorage.setItem(
                            '@beatStatus',
                            JSON.stringify('NotStarted'),
                        );
                    } else {
                        res.data.DefaultBeat['isBeat'] = false;
                        res.data.DefaultBeat['isChecked'] = false;
                        arr.push(res.data.DefaultBeat);
                    }
                }

                res.data.OtherBeats.forEach(item => {
                    item['isBeat'] = false;
                    item['isChecked'] = false;
                    arr = [...arr, item];
                });
                if(arr.length > 0){
                setAllBeats(arr);
                setModalVisible1(!modalVisible1)
                }else{
                    setModalVisible1(false);
                    toast.show("No beat found.", {
                        type: 'danger',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });  
                }
                console.log('arr******', arr);
            } else if (res.statusCode == 500 && res.message == 'No Tour Plan Set') {
                setIsTourPlan(res.message);
                console.warn(
                    'No Tour Plan Set DahboardStartDay.js Line 61---->',
                    res.message,
                );
            } else {
                setIsTourPlan(res.message);
            }
        } catch (e) {
            console.log('In Catch in getAllBeats Line 44 --->', e);
        }
    };



    const saveEmpData = async (id, name) => {
        try {
            await StoreDatatoAsync('beatEmpInfo', { empId: id, empName: name })
            props.navigation.push('NewDashboard')
        } catch (err) {
            console.log('Error is ,' + err)
        }
    }

    const handleSubmitData = async () => {
        try {
            // console.log('beatId-------', checked);
            if (network) {
                if (checked != '') {
                    setLoader(true);
                    setModalVisible1(false);
                    let res = await getBeatOutlets(checked);
                    // console.log("==============",res)
                    if (res.statusCode == 200) {
                        /*** Truncate Beat table Start ****/

                        db.transaction(async function (tx) {
                            tx.executeSql('DELETE FROM Beat', [], (tx, results) => { });
                        });
                        /**** Truncate Beat table End  ***/

                        /**
                         * Insert new data Beat Data
                         *
                         */
                        var tempArr = [];
                        res.data.OutletCheckInDump.forEach(item1 => {
                            tempArr.push(Object.keys(item1)[0]);
                        });
                        console.log('tempArr Line 199===>', tempArr);

                        db.transaction(async function (tx) {
                            res.data.OutletIds.forEach(async item => {
                                console.log("beat chech data", item)
                                //if checkinCheckout already Sync
                                if (tempArr.includes(`${item}`)) {

                                    await tx.executeSql(
                                        'insert into Beat(outletId,visitstatus) VALUES(?,?)',
                                        [item, 'Completed'],
                                        (tx, results) => {
                                            // alert("Beat Status Completed"+JSON.stringify(results),item);
                                        },
                                    );
                                    //if checkinCheckout Pending
                                } else {
                                    console.log("ITem Line 284===", item)
                                    await tx.executeSql(
                                        'insert into Beat(outletId,visitstatus) VALUES(?,?)',
                                        [item, 'Pending'],
                                        (tx, results) => {
                                            // alert("Beat Status Pending"+JSON.stringify(results),item);
                                        },
                                    );
                                }
                            }); //End of forEach Loop
                        });

                        await AsyncStorage.setItem('@beatId', JSON.stringify(checked));
                        await AsyncStorage.setItem('@beatName', JSON.stringify(beatName));
                        await AsyncStorage.setItem(
                            '@firstTime',
                            JSON.stringify('firstTime'),
                        );
                        await AsyncStorage.setItem(
                            '@beatStatus',
                            JSON.stringify('Started'),
                        );
                        await AsyncStorage.setItem('@beatDate', JSON.stringify(new Date()));
                        props.navigation.navigate('AirportRoute', {
                            beatId: checked,
                            beatName: beatName,
                            navigateFrom: 'start_beat',
                        });
                    }
                    else if (res.statusCode == 404) {
                        toast.show(`${res.message}`, {
                            type: 'danger',
                            placement: 'bottom',
                            duration: 3000,
                            offset: 30,
                            animationType: 'slide-in',
                        });
                        setModalVisible1(!modalVisible1);
                        setLoader(false)
                    } else {
                        toast.show('Something went wrong,please try again later.', {
                            type: 'danger',
                            placement: 'bottom',
                            duration: 3000,
                            offset: 30,
                            animationType: 'slide-in',
                        });
                        setModalVisible1(!modalVisible1);
                    }
                } else {
                    toast.show('Please choose your beat.', {
                        type: 'danger',
                        placement: 'bottom',
                        duration: 3000,
                        offset: 30,
                        animationType: 'slide-in',
                    });
                }
            } else {
                toast.show('No network.', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
                setModalVisible1(!modalVisible1);
            }
        } catch (e) {
            // alert(e)
            toast.show('Something went wrong,please try again later.', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setModalVisible1(!modalVisible1);
        }
    };

    return (
        <View style={{ flex:1 , backgroundColor:themecolor.THEMECOLOR}}>
            <Header_2 title="Beat on behalf of" onPress={() => props.navigation.goBack()} />

            <View style={{ height: height - 90, alignItems: "center" }}>
                <FlatList
                    data={teamlist}
                    renderItem={({ item }) => (
                        <TourTeam
                            item={item}
                            props={props}
                            roles={roles}
                            themecolor={themecolor}
                            saveEmpData={saveEmpData}
                            setModalVisible1={setModalVisible1}
                            getBeats={getBeats}
                            modalVisible1={modalVisible1}
                        />
                    )}
                    keyExtractor={(_, indx) => indx}
                    scrollEnabled={true}
                />
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
            // onRequestClose={() => {
            //     setModalVisible1(!modalVisible1);
            // }}
            >
                <View style={{ ...styles.centeredView, }}>
                    <View style={{ ...styles.modalView, backgroundColor: themecolor.LIGHTGREY, }}>
                        {/* <View style={{ ...styles.Modal85,backgroundColor:'yellow' }}> */}
                        <FlatList
                            data={allBeats}
                            renderItem={({ item, index }) => (
                                <ItemCheked
                                    item={item}
                                    index={index}
                                    props={props}
                                    checked={checked}
                                    setChecked={setChecked}
                                    allBeats={allBeats}
                                    setBeatName={setBeatName}
                                    setLoader={setLoader}
                                    defaultBeat={defaultBeat}
                                    themecolor={themecolor}
                                // agendaType1={props.agendaType1}
                                />
                            )}
                            keyExtractor={(item, indx) => indx}
                            scrollEnabled={true}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', }}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => handleSubmitData()}
                                style={{
                                    height: 30,
                                    width: width * 0.25,
                                    // top: 10,
                                    backgroundColor: Colors.bluetheme,
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    backgroundColor: themecolor.HEADERTHEMECOLOR
                                }}>
                                <Text style={{ ...styles.textStyle }}>Submit</Text>
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 4 }} />
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => {
                                    setModalVisible1(!modalVisible1)
                                    setIsDefaultBeat('')
                                }
                                }
                                style={{
                                    height: 30,
                                    width: width * 0.25,
                                    backgroundColor: Colors.white,
                                    borderRadius: 50,
                                    justifyContent: 'center'
                                }}>
                                <Text style={{ ...styles.textStyle, color: Colors.grey }}>
                                    Cancel
                                </Text>

                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.MV2} /> */}
                        {/* </View> */}

                    </View>

                </View>
            </Modal >
        </View>
    );
};

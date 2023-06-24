import React, { useState, useEffect, useRef } from 'react';
import {
    StatusBar,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    BackHandler
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../../assets/css/stylesDashboardBA';
import { BAsList } from '../../components/shared/BADataListComponent';
import Header_2 from '../../components/shared/Header_2';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux'
import { store } from '../../../App'
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useToast } from 'react-native-toast-notifications';
import NoData from '../../components/shared/NoData';
import { BAFlatListSortBy } from './BAFlatListSortBy';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { StockInReturnLineItemShimmer } from '../../components/Beat_outlet/ProductCategoriesListShimmer';
const { height, width } = Dimensions.get('window');

const Bas = (props) => {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const refRBSheet1 = useRef();
    const toast = useToast();
    const [loader, setLoader] = useState(true);
    // const [filterdata, setFilterData] = useState([])
    const [search, setSearchData] = useState([])
    const [balist, setBaList] = useState([])
    const [getBaseUrl, setBaseUrl] = useState('')
    const [particularTeamData, setParticularTeamData] = useState([]);
    const [uniqueDesig, setUniqueDesig] = useState([]);
    const [baData, setBaData] = useState([]);
    const [tempDataSearching, setTempDataSearching] = useState([])
    const [selectedDesig, setSelectedDesig] = useState(0)
    // alert(JSON.stringify(particularTeamData))
    const BAsFilterRedux = useSelector(state => state.BAsFilter);
    // const BAsFilterReduxValue = Object.values(BAsFilterRedux);
    const BAsFilterReduxTemp = useSelector(
        state => state.BAsFilterTemporary,
    );
    const BAsFilterReduxValueTemp = Object.values(BAsFilterReduxTemp);
    const [isDoneVisible, setIsDoneVisible] = React.useState(false);

    function handleBackButtonClick() {
        props.navigation.goBack();
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

    React.useEffect(() => {
        async function temp() {
            setBaseUrl(await SERVER_URL())
        }
        temp()
    }, [])

    const GetBAs = async () => {
        try {
            const result = await gettripLocationApi('api/getMyTeam?filter=0')
            console.log("BA's...getMyTeam.....>>", result)
            if (result.statusCode == 200) {
                setBaData(result.data.team)
                setSearchData(result.data.team);
                setBaList(result.data.team);
                setTempDataSearching(result.data.team);
                let allDesignations = [];
                result.data.team.map((item, index) => !allDesignations.includes(item.Designations.Designation) && allDesignations.push(item.Designations.Designation))
                allDesignations.unshift('All Team')
                // alert(JSON.stringify(allDesignations))
                setUniqueDesig(allDesignations)
                setParticularTeamData(result.data.team)
                // new end=============
                setLoader(false)
            } else {
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
                setLoader(false)
            }
        } catch (err) {
            console.log("Error in GetBAs in BA's page ", err)
            toast.show("Something went wrong!, Please try again later.", {
                type: 'warning',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
            });
            setLoader(false)
        }
    }

    const handleClickOnDone = async () => {

        try {
            store.dispatch({ type: 'ADD_BAS_FILTER', payload: [BAsFilterReduxValueTemp[0], BAsFilterReduxValueTemp[0]] })
            var res = await gettripLocationApi(`api/getMyTeam?filter=${BAsFilterReduxValueTemp[0]}`)
            // console.log("getOutletOrderFilter...................page OrderList line 33", res)
            if (res.statusCode === 200) {
                setBaData(res.data);
                refRBSheet1.current.close();
            }
            else {
                setBaData(res.data);
                refRBSheet1.current.close();
                toast.show(res.message, {
                    type: 'warning',
                    placement: 'bottom',
                    duration: 3000,
                    offset: 30,
                    animationType: 'slide-in',
                });
            }
            setIsDoneVisible(false);
        } catch (err) {
            console.log(err)
        }
    }

    const findParticularData = (item, index) => {
        try {
            setSelectedDesig(index)
            // alert("item is "+item)
            if (item == 'All Team') {
                setParticularTeamData(baData)
                setTempDataSearching(baData)
            } else {
                // alert(loader)
                const particulatData = baData.filter((items, indexes) => {
                    // alert(`${item.DesignationName}===${items.Designations.Designation}`)
                    return (item === items.Designations.Designation)
                })
                setParticularTeamData(particulatData)
                setTempDataSearching(particulatData)
            }
        } catch (err) {
            console.log(err)
        }
        // alert(JSON.stringify(particulatData))
    }

    const filtering = (search) => {
        try {
            console.log("searching txt", search);
            if (search != '') {
                var temp = tempDataSearching.filter(item => {
                    let fullName = `${item.FirstName}${' '}${item.LastName}`
                    // alert(fullName)
                    if (fullName.toLowerCase().includes(search.toLowerCase()) || item.Phone.includes(search)) {
                        return true
                    }
                })
                // setBaData(temp)
                setParticularTeamData(temp)
            } else {
                setParticularTeamData([...tempDataSearching])
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetBAs();
    }, [])

    return (
        <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR  }}>
            <StatusBar translucent backgroundColor="transparent" />
            <Header_2 bottomLeftRadius={0} bottomRightRadius={0} height={85} title={"My Team"} Size={20} iconname="" onPressIconPlus={() => refRBSheet1.current.open()}
                onPress={() => {
                    store.dispatch({ type: 'REMOVE_BAS_FILTER_TEMPORARY' })
                    store.dispatch({ type: 'REMOVE_BAS_FILTER' })
                    setIsDoneVisible(false)
                    props.navigation.goBack()
                }}
            />
            <View style={{ height: 40, backgroundColor: themecolor.HEADERTHEMECOLOR, borderBottomRightRadius: 17, borderBottomLeftRadius: 17, alignItems: "center" }} >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginHorizontal: 10 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center" }} >
                        {uniqueDesig.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} style={index === selectedDesig ?
                                    {
                                        // width:width*0.4,
                                        backgroundColor: "#fff",
                                        marginHorizontal: 12,
                                        height: 30,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingHorizontal: 10
                                    } :
                                    {
                                        // width:width*0.4,
                                        marginHorizontal: 12,
                                        height: 30,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        paddingHorizontal: 10
                                    }}
                                    onPress={() => findParticularData(item, index)}>
                                    <Text style={index === selectedDesig ? { color: "#3862F8", fontWeight: "500" } : { color: "#dcdde1", fontWeight: "500" }}>
                                        {`${item?.slice(0, 1).toUpperCase()}${item?.slice(1).toLowerCase()}`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            <View style={{ marginTop: 10 }} />
            {/* <View style={{...styles.view,}}>
                <View style={styles.SearchInputView}>
                    <Text style={styles.PH10}>
                        <FIcon name="search" size={15} />
                    </Text>
                    <TextInput
                        onChangeText={text => filtering(text)}
                        placeholder="Search" style={styles.InputText} />
                </View>
            </View> */}

            <View
                style={{
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    borderWidth: 0.5,
                    width: width * 0.94,
                    alignSelf: 'center'
                }}>
                <Text style={{ paddingHorizontal: 10, top: -2, left: 2 }}>
                    <FIcon name="search" size={12} color={themecolor.AV2} />
                </Text>
                <TextInput
                    onChangeText={text => filtering(text)}
                    placeholder="Search"
                    style={{
                        width: width * 0.8,
                        fontFamily: FontFamily.PopinsRegular,
                        color: themecolor.AV2
                    }}
                    placeholderTextColor={themecolor.AV2}
                />
            </View>

            <View
                showsVerticalScrollIndicator={false}
                style={styles.H}>

                {loader ? (
                    < StockInReturnLineItemShimmer />
                ) : (

                    <View style={{ ...styles.view, }}>
                        {(baData.length >= 1)
                            ?
                            <BAsList baData={particularTeamData} getBaseUrl={getBaseUrl} />
                            : <NoData message='No Team Available' />
                        }
                    </View>
                )}
            </View>
            <View>

                <RBSheet
                    ref={refRBSheet1}
                    animationType={'slide'}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={250}
                    customStyles={{
                        container: {
                            borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,
                            padding: 10,
                        },
                        draggableIcon: {
                            display: 'none',
                        },
                    }}>
                    <View style={styles.RBVIEW}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                store.dispatch({ type: 'REMOVE_BAS_FILTER_TEMPORARY' })
                                refRBSheet1.current.close()
                            }}>
                            <Image
                                source={require('../../assets/images/close.png')}
                                style={styles.CloseIcon}
                                resizeMode={'contain'}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={{ ...styles.CardText }}>Set Filters</Text>
                        </View>
                        <View>
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => handleClickOnDone()}>
                                    <Text style={styles.RBText1}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.Borderline }} />
                    <View style={styles.SortView}>
                        <View style={styles.MV3} />
                        <View style={styles.Width9}>
                            <Text style={styles.CardText1}>Sort by</Text>
                        </View>

                        <BAFlatListSortBy setIsDoneVisible={setIsDoneVisible} />

                        {/* <View style={styles.MV3} />
                    <Text style={styles.CardText1}>Sort by date range</Text>
                    <View style={styles.MV3} /> */}
                        {/* <DatePickerRange /> */}
                    </View>
                </RBSheet>

            </View>


        </View>
    )
}


export default Bas;

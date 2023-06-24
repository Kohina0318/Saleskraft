// import React, { useRef, useEffect, useState } from 'react';
// import {
//     TouchableOpacity,
//     View,
//     Text,
//     ScrollView,
//     Animated,
// } from 'react-native';
// import FAIcon from 'react-native-vector-icons/FontAwesome';
// import styles from '../../assets/css/styleCreateTour';
// import { Colors } from '../../assets/config/Colors';
// import { getAllOutlets } from '../../repository/outlet/OutletRepositoy';

// function Item({
//     options,
//     setSelectedItem,
//     pholder,
//     setPholder,
//     filterTypeData,
//     allData,
//     setRefresh,
//     refresh,empOutletData
// }) {
//     const [open, setOpen] = useState(true);
//     const [collapsed, setCollapsed] = useState(true);

//     const [maxLines, setMaxLines] = useState(2);
//     // const scrollYAnimatedValue = new Animated.Value(0)
//     const animationHeight = useRef(new Animated.Value(0)).current;

//     const toggleCollapsed = () => {
//         setCollapsed(!collapsed);
//     };

//     const collapseView = () => {
//         Animated.timing(animationHeight, {
//             duration: 0,
//             toValue: 17,
//         }).start();
//     };

//     const expandView = () => {
//         setMaxLines(null);
//         Animated.timing(animationHeight, {
//             duration: 0,
//             toValue: 100,
//         }).start();
//     };

//     useEffect(() => {
//         if (collapsed) {
//             collapseView();
//         } else {
//             expandView();
//         }
//         setOpen(!open);
//     }, [collapsed]);

//     return (
//         <TouchableOpacity onPress={toggleCollapsed}>
//             <View
//                 style={{
//                     ...styles.itemV,
//                     backgroundColor: Colors.bluetheme,
//                     width: 115,
//                     borderRadius: 14,
//                     overflow: 'hidden',
//                     padding: 3,
//                 }}>
//                 <Animated.View style={{ maxHeight: animationHeight }}>

//                 {/* <ScrollView style={{height:120}} showsVerticalScrollIndicator={true}  scrollEventThrottle={16} onScroll={Animated.event(
//                  [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }]
//                  )}> */}
//                     <Text style={{ ...styles.paragraph }} numberOfLines={maxLines}>
//                         <View
//                             style={{
//                                 width: 115,
//                                 overflow: 'hidden',
//                                 height: 'auto',
//                             }}>
//                             <View
//                                 style={{
//                                     flexDirection: 'row',
//                                     width: 115,
//                                     alignItems: 'center',
//                                     position: 'relative',
//                                     right: 10,
//                                 }}>
//                                 <View style={{}}>
//                                     <Text style={{ color: 'white', left: 15, fontSize: 11 }}>
//                                         {pholder}
//                                     </Text>
//                                 </View>
//                                 <View style={{ position: 'absolute', right: 0 }}>
//                                     <View onPress={() => { }} style={{ justifyContent: 'center' }}>
//                                         {open == false ? (
//                                             <FAIcon
//                                                 name="caret-down"
//                                                 size={18}
//                                                 style={{ color: 'white' }}
//                                             />
//                                         ) : (
//                                             <FAIcon
//                                                 name="caret-up"
//                                                 size={18}
//                                                 style={{ color: 'white' }}
//                                             />
//                                         )}
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                         <View>
//                             {options.map((i, ind) => {
//                                 return (
//                                     <TouchableOpacity
//                                         onPress={() => {
//                                             // alert('id'+i.Id)
//                                             setSelectedItem(i.Id);
//                                             filterTypeData(allData, i.OutletName);
//                                             setPholder(i.OutletName);
//                                             setCollapsed(!collapsed);
//                                             setRefresh(!refresh)
//                                         }}>

//                                         <Text style={{ left: 5, color: 'white', fontSize: 12 }}>
//                                             {i.OutletName}
//                                         </Text>

//                                     </TouchableOpacity>
//                                 );
//                             })}
//                         </View>

//                     </Text>
//                     <View style={{ marginVertical: 1 }} />
//                 {/* </ScrollView> */}

//                 </Animated.View>
//             </View>
//         </TouchableOpacity>
//     );
// }

// export default function CashInHandDropdown(props) {
//     const setSelectedItem = props.setSelectedItem1;
//     const setRefresh = props.setRefresh;
//     const refresh = props.refresh;
//     const [outLates, setOutLates] = useState([]);
//     const [allData, setAllData] = useState([]);
//     const [pholder, setPholder] = useState('');

//     const getAllOutlet = async () => {
//         let res = await getAllOutlets();
//         // console.log('aaaaaaaaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyyy', res.data);
//         setAllData(res.data);
//         setPholder(res.data[0].OutletName);
//         filterTypeData(res.data, res.data[0].Id);
//     };

//     const filterTypeData = (data, key) => {
//         const filteredData = data.filter(i => i.Id != key);
//         setOutLates(filteredData);
//         // console.log('fffffffffffffffffdddddddddddddddddd ', filteredData);
//     };

//     useEffect(() => {
//         getAllOutlet();
//     }, []);

//     return (
//         <View>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={{ width: 115 }} >
//                     <Item
//                         options={empOutletData}
//                         setSelectedItem={setSelectedItem}
//                         setRefresh={setRefresh}
//                         refresh={refresh}
//                         pholder={pholder}
//                         setPholder={setPholder}
//                         filterTypeData={filterTypeData}
//                         allData={allData}
//                     />
//                 </View>
//             </ScrollView>
//         </View>
//     );
// }


import React, { useRef, useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Animated,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styleCreateTour';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux'

function Item({ options, setSelectedItem, widthh, toValue, widthPlaceHolder, widthIcon, selectedAttendanceItem, placeholder, setPlaceholder,themecolor }) {

    const [open, setOpen] = useState(true)
    const [collapsed, setCollapsed] = useState(true);
    const [maxLines, setMaxLines] = useState(2);
    const animationHeight = useRef(new Animated.Value(0)).current;

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const collapseView = () => {
        Animated.timing(animationHeight, {
            duration: 0,
            toValue: 17,
        }).start();
    };

    const expandView = () => {
        setMaxLines(null);
        Animated.timing(animationHeight, {
            duration: 0,
            toValue: toValue,
        }).start();
    };

    useEffect(() => {
        if (collapsed) {
            collapseView();
        } else {
            expandView();
        }
        setOpen(!open)
    }, [collapsed]);

    const onpressfun = (t, i) => {
        setPlaceholder(t)
        setSelectedItem(t)
        toggleCollapsed()
    }

    return (

        <TouchableOpacity onPress={toggleCollapsed} >
            <View style={{ ...styles.itemV, backgroundColor: themecolor.HEADERTHEMECOLOR, width: widthh, borderRadius: 14, alignSelf: 'flex-end', overflow: 'hidden', padding: 3 }}>
                <Animated.View
                    style={{ maxHeight: animationHeight }}>
                    <Text style={{ ...styles.paragraph, }} numberOfLines={maxLines}>
                        <View style={{ ...styles.MainViewDrop }}>
                            <View style={{ flexDirection: 'row', width: '100%', }}>
                                <View style={{ width: widthPlaceHolder }}>
                                    <Text ellipsizeMode='tail' numberOfLines={1} style={{ color: 'white', left: 5, fontSize: 12, }}>{placeholder}</Text>
                                </View>
                                <View style={{ width: widthIcon, left: 5 }}>
                                    <View style={{ justifyContent: 'center', }} >
                                        {open == false ?
                                            <FAIcon name="caret-down" size={18} style={{ color: 'white', }} />
                                            :
                                            <FAIcon name="caret-up" size={18} style={{ color: 'white', }} />}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View >
                            {options.map((i, ind) => {
                                return (
                                    <TouchableOpacity onPress={() => onpressfun(i, ind + 1)}  >
                                        <Text ellipsizeMode='tail' numberOfLines={1} style={{ left: 5, color: 'white', fontSize: 12, width: 110 }}>
                                            {i}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}

                        </View>
                    </Text>

                    <View style={{ marginVertical: 1 }} />
                </Animated.View>
            </View>
        </TouchableOpacity>
    );
}

export default function CashInHandDropdown(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const { options, widthh, toValue, widthPlaceHolder, widthIcon, selectedAttendanceItem } = props;
    const setSelectedItem = props.setSelectedItem

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    <Item options={options} setSelectedItem={setSelectedItem} widthh={widthh} toValue={toValue} widthPlaceHolder={widthPlaceHolder} widthIcon={widthIcon} selectedAttendanceItem={selectedAttendanceItem}
                        placeholder={props.placeholder} setPlaceholder={props.setPlaceholder} themecolor={themecolor}
                    />
                </View>
            </ScrollView>
        </View>
    );
}


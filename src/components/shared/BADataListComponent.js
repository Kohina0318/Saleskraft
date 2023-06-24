import React from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native';
import styles from '../../assets/css/stylesDashboardBA';
import { Colors } from '../../assets/config/Colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function BAsFlateList({ item, getBaseUrl, themecolor }) {
console.log("item----------------------",item)
    // console.log("item" + JSON.stringify(item.ProfilePicture))
    const navigation = useNavigation();

    const onPressMobileNumClick = (Phone) => {

        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${Phone}`;
        } else {
            phoneNumber = `telprompt:${Phone}`;
        }
         try{
        Linking.openURL(phoneNumber);
         }catch(e){
            console.log("Error in Linking Line 34",e)
         }
        }


    return (
        <TouchableOpacity style={{ ...styles.returnview, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1, padding: 2 }} onPress={() => navigation.push('BAsProfile', { data: item })}>
            <View style={{...styles.innerview1, height: 50,width: 50,left:2}}>
                {
                (item.ProfilePicture === null || item.ProfilePicture === "" ? (
                    <Image source={require('../../assets/images/dummyuser.png')} resizeMode='cover' style={{ height: 60, width: 60 }} />
                ) : (
                    <Image source={{ uri: `${getBaseUrl}uploads/2/${item.ProfilePicture}` }} resizeMode='center' style={{ height: 60, width: 60 }} />
                ))
                }
            </View>
            <View style={styles.margin}>
{   item.FirstName != null ?
                <Text style={{ ...styles.text1, color: themecolor.TXTWHITE }}>{`${item.FirstName} ${item.LastName != null ? item.LastName:''}`}</Text>
:(<></>)
            }               
                <Text style={{ fontFamily: FontFamily.PopinsMedium, fontSize: 12, color: 'black', color: themecolor.TXTWHITE, marginTop: -4 }}>{item.Designations.Designation}</Text>
                <TouchableOpacity onPress={() => { onPressMobileNumClick(item.Phone) }} style={{}}>
                    <Text style={{ ...styles.text2, color: themecolor.TXTWHITE, }}>{<FontAwesome5Icon name='mobile-phone' size={13} color={Colors.bluetheme} />} {(item.Phone) ? item.Phone : 'not available'} </Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

}
export function BAsList(props) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    return (
        <FlatList
            data={props.baData}
            renderItem={({ item }) => <BAsFlateList item={item} getBaseUrl={props.getBaseUrl} themecolor={themecolor} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}    
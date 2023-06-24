import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/styleCreateTour';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function CusPickerListD({ eventTypeData, setEventTypeName, eventTypeName , themecolor}) {
    // console.log("eventTypeData=====>", eventTypeData)
    // const mode = useSelector(state => state.mode);
    // const themecolor = new MyThemeClass(mode).getThemeColor()
    return (
        <View>
            <View style={styles.marg5} />
            <View style={styles.viewCustom}>
                <View>
                    <Text style={{...styles.title,color: themecolor.TXTWHITE}}>
                        Event Type
                    </Text>
                </View>
                <View style={{...styles.textContainer,borderWidth:0.5,height:40,backgroundColor:themecolor.BOXTHEMECOLOR,borderColor:themecolor.BOXBORDERCOLOR1}}>
                    <Picker
                        mode="dropdown"
                        style={styles.W}
                        itemStyle={styles.H1}
                        selectedValue={eventTypeName}
                        dropdownIconColor={themecolor.TXTWHITE}          
                        onValueChange={(itemValue, itemIndex) =>
                            setEventTypeName(itemValue)
                        }>
                        {eventTypeData.map((item1 => {
                            return (
                                <Picker.Item
                                    label={item1.EventTypeName}
                                    style={{...styles.picker,color: themecolor.TXTWHITE, backgroundColor:themecolor.BOXTHEMECOLOR}}
                                    value={item1.EventTypeId}
                                />
                            )
                        }))
                        }
                    </Picker>
                </View>
            </View>
        </View>
    );
}

export default function CustomSelect(props) {

    var temp = [{
        id: '',
        name: ''
    }];
    return (

        <FlatList
            data={temp}
            renderItem={({ item }) => <CusPickerListD item={item} eventTypeData={props.eventTypeData} setEventTypeName={props.setEventTypeName} eventTypeName={props.eventTypeName} themecolor={props.themecolor} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    )
}
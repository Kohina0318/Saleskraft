import React from 'react';
import {
    View,
    FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/css/styleCompetition';

function CusPickerCompetitors({ props, competitors, competitorId, setCompetitorId, themecolor }) {

    return (
        <View>
            <View>
                <View style={{ ...styles.textContainer, width: props.width, height: props.height, 
                            borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR,color: themecolor.TXTWHITE }}>
                    <Picker
                        mode="dropdown"
                        style={styles.W}
                        itemStyle={styles.H1}
                        selectedValue={competitorId}
                        dropdownIconColor={themecolor.TXTWHITE}
                        onValueChange={(itemValue, itemIndex) =>
                            setCompetitorId(itemValue)
                        }
                    >
                        <Picker.Item
                            label="Select Competitors"
                            style={{...styles.picker, color: themecolor.TXTWHITE , backgroundColor: themecolor.BOXTHEMECOLOR}}
                            value=""
                        />
                        {competitors.map((item1, index) => {

                            return (
                                <Picker.Item
                                    label={item1.CompetitorName}
                                    style={{...styles.picker, color: themecolor.TXTWHITE , backgroundColor: themecolor.BOXTHEMECOLOR}}
                                    value={item1.Id}
                                    key={index}
                                />
                            )
                        })}
                    </Picker>
                </View>
            </View>
        </View>
    );
}
function  PickerCompetitors(props) {

    var temp = [{
        id: '',
        name: ''
    }];

    return (
        <FlatList
            data={temp}
            renderItem={({ item }) => <CusPickerCompetitors item={item} props={props} competitors={props.competitors}
                competitorId={props.competitorId} setCompetitorId={props.setCompetitorId}  themecolor={props.themecolor}/>}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    )
}

function CusPickerCompetitorUnit({ item, props, competitorUnit, competitorUnitId, setCompetitorUnitId, themecolor }) {

    return (
        <View>
            <View>
                <View style={{ ...styles.textContainer, width: props.width, height: props.height ,  borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR,color: themecolor.TXTWHITE }}>
                    <Picker
                        mode="dropdown"
                        style={styles.W}
                        itemStyle={{}}
                        selectedValue={competitorUnitId}  
                        dropdownIconColor={themecolor.TXTWHITE}
                        onValueChange={(itemValue, itemIndex) =>
                            setCompetitorUnitId(itemValue)
                        }
                    >
                        <Picker.Item
                            label="Select Unit"
                            // style={styles.picker}
                            style={{...styles.picker, color: themecolor.TXTWHITE , backgroundColor: themecolor.BOXTHEMECOLOR}}
                            value=""
                        />
                        {competitorUnit.map((item1 => {
                            return (
                                <Picker.Item
                                    label={item1.UnitDescription}
                                    // style={styles.picker}
                                    style={{...styles.picker, color: themecolor.TXTWHITE , backgroundColor: themecolor.BOXTHEMECOLOR}}
                                    value={item1.UnitId}
                                />
                            )
                        }))}

                    </Picker>
                </View>
            </View>
        </View>
    );
}

function PickerCompetitorUnit(props) {
    var temp = [{
        id: '',
        name: ''
    }];
    return (
        <FlatList
            data={temp}
            renderItem={({ item }) => <CusPickerCompetitorUnit item={item} props={props}
                competitorUnit={props.competitorUnit} competitorUnitId={props.competitorUnitId}
                setCompetitorUnitId={props.setCompetitorUnitId}  themecolor={props.themecolor}/>}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />
    )
}


export { PickerCompetitors, PickerCompetitorUnit }
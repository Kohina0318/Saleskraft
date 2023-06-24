import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Modal,
    Dimensions,
    TextInput,
} from 'react-native';
import FullsizeButton from '../../components/shared/FullsizeButton';
import { PickerCompetitors, PickerCompetitorUnit } from './PickerCompetition';
import styles from '../../assets/css/styleCompetition';
import { getCompetitors, getUnits } from '../../repository/CompetitionMapping/CompetitionMappingRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

export default function CompetitionModal(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
   
    const [modalCart, setModalCart] = useState(true);

    const handleCompetitors = async () => {
        var res = await getCompetitors();
        console.log("Get Competitors.... line 88", res)
        props.setCompetitors(res.data);
    }

    const handleUnits = async () => {
        var res = await getUnits();
        console.log("Get Units.... line 88", res)
        props.setCompetitorUnit(res.data);
    }

    useEffect(() => {
        handleCompetitors()
        handleUnits()
    }, [])

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalCart}>
                <View style={styles.CompMView1}>
                    <View style={{...styles.CompMView2, backgroundColor: themecolor.RB2,}}>
                        <View style={{ width: width * 0.8, height: 'auto', paddingBottom: 20 }}>

                            <View style={{ marginTop: 8, padding: 5 }}>
                                <Text style={{...styles.CompMText, color: themecolor.TXTWHITE}}>
                                    Add Competitor Analysis
                                </Text>
                            </View>

                            <PickerCompetitors width={'100%'} height={45} competitors={props.competitors} themecolor={themecolor}
                                   competitorId={props.competitorId} setCompetitorId={props.setCompetitorId} />

                            <View style={styles.CompMViewMarginV} />

                            <View style={{...styles.CompMView3, borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE }}>
                                <TextInput placeholder={'Mention Product Name'} placeholderTextColor={themecolor.TXTWHITE}
                                    style={{...styles.CompMInputText, color: themecolor.TXTWHITE }}
                                    onChangeText={(text) => props.setCompetitorProductName(text)} />

                            </View>
                            <View style={styles.CompMViewMarginV} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                                <View style={{ width: width * 0.4 }}>
                                    <PickerCompetitorUnit width={'100%'} height={45} competitorUnit={props.competitorUnit} competitorUnitId={props.competitorUnitId}
                                        setCompetitorUnitId={props.setCompetitorUnitId} themecolor={themecolor} />
                                </View>

                                <View style={{...styles.CompMView4,  borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR,  color: themecolor.TXTWHITE }} >
                                    <TextInput placeholder={'Enter Qty'} placeholderTextColor={themecolor.TXTWHITE}
                                        style={{...styles.CompMInputText,  color: themecolor.TXTWHITE }}
                                        onChangeText={(text) => props.setCompetitorQty(text)}
                                    />
                                </View>
                            </View>

                            <View style={styles.CompMViewMarginV} />

                            <View style={{...styles.CompMView5,borderColor: themecolor.BOXBORDERCOLOR1, backgroundColor: themecolor.BOXTHEMECOLOR,  color: themecolor.TXTWHITE }}>

                                <TextInput placeholder={'Remark'} placeholderTextColor={themecolor.TXTWHITE}
                                    style={{...styles.CompMInputText,  color: themecolor.TXTWHITE }}
                                    onChangeText={(text) => props.setCompetitorRemark(text)} />
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', width: width * 0.8, }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                                <FullsizeButton title={'Submit'} backgroundColor={themecolor.HEADERTHEMECOLOR}
                                    width={100} BRadius={20} height={30} onPress={() => props.handleCreateCompetition()} />
                            </View>
                            <View  style={{ margin:2}}/>
                            <View>
                                <FullsizeButton title={'Cancel'}
                                    width={80} BRadius={30} height={30} backgroundColor={'white'} titlecolor={'gray'} onPress={() => props.setshowCompetitionModal(false)} />
                            </View>
                        </View>

                        <View style={{ marginVertical: 5 }} />
                    </View>

                </View>
            </Modal>
        </>
    )
}
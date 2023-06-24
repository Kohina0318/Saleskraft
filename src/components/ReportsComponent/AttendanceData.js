import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import { Colors } from '../../assets/config/Colors'
import { FontFamily } from '../../assets/fonts/FontFamily'
import { FontSize } from '../../assets/fonts/Fonts';
import Color from '../../components/Theme/ThemeDarkLightColor';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window')

const AttendanceData = (props) => {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    console.log("PROPS OF ATTENDANCE DATA>>>>>>>>>>>>>>>>>>", props)
    
    return (
        <>
            <View style={{
                alignSelf: 'center',
                // backgroundColor: Colors.white,
                borderWidth: 1,
                borderColor: Colors.borderColor1,
                height: 'auto',
                // top:8,
                overflow: 'hidden',
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                borderWidth: 1,
                // borderColor: '#E9E9E9',
                backgroundColor: themecolor.BOXTHEMECOLOR,
                borderColor: props.width != undefined ? '#E9E9E9' : themecolor.BOXBORDERCOLOR1,
                width: props.width != undefined ? props.width : "100%",
            }}>

                {/* <View
            style={{
                justifyContent: 'space-between',
                padding: 8,
                width: width * 0.92,
            }}>

            <View style={{ flexDirection: 'row' }}>
                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            fontSize: FontSize.labelText3,
                            color: Colors.bluetheme,
                            fontFamily: FontFamily.Popinssemibold,
                        }}>
                        {props.TotalDays}
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.small,
                            color: Colors.black,
                            fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Total month days
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            fontSize: FontSize.labelText3,
                            color: Colors.bluetheme,
                            fontFamily: FontFamily.Popinssemibold,
                        }}>
                        {props.PresentDays}
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.small,
                            color: Colors.black,
                            fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Present days
                    </Text>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            fontSize: FontSize.labelText3,
                            color: Colors.bluetheme,
                            fontFamily: FontFamily.Popinssemibold,
                        }}>
                        {props.PartiallyDays}
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.small,
                            color: Colors.black,
                            fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Partially Present
                    </Text>
                </View>
            </View> */}

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 8,
                        width: props.width != undefined ? width * 0.88 : width * 0.92,
                    }}>
                    <View
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontSize: FontSize.labelText3,
                                // color: Colors.bluetheme,
                                color: Color.Color.BLUEWHITE,
                                fontFamily: FontFamily.Popinssemibold,
                            }}>
                            {props.TotalDays}
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.SMALL8,
                                // color: Colors.black,
                                color: themecolor.TXTWHITE,
                                fontFamily: FontFamily.PopinsMedium,
                            }}>Total month days</Text>
                    </View>
                    <View
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontSize: FontSize.labelText3,
                                // color: Colors.bluetheme,
                                color: Color.Color.BLUEWHITE,
                                fontFamily: FontFamily.Popinssemibold,
                            }}>{props.PresentDays}
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.SMALL8,
                                // color: Colors.black,
                                color: themecolor.TXTWHITE,
                                fontFamily: FontFamily.PopinsMedium,
                            }}> Present days</Text>
                    </View>
                    <View
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontSize: FontSize.labelText3,
                                // color: Colors.bluetheme,
                                color: Color.Color.BLUEWHITE,
                                fontFamily: FontFamily.Popinssemibold,
                            }}>  {props.PartiallyDays}</Text>
                        <Text
                            style={{
                                fontSize: FontSize.SMALL8,
                                // color: Colors.black,
                                color: themecolor.TXTWHITE,
                                fontFamily: FontFamily.PopinsMedium,
                            }}>Partially Present</Text>
                    </View>
                </View>

                <View style={{
                    borderWidth: 0.2,
                    borderColor: 'lightgrey',
                    width: width * 0.85,
                    alignSelf: 'center'
                }} />

                {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 8,
                    width: width * 0.92,
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            fontSize: FontSize.labelText3,
                            color: Colors.bluetheme,
                            fontFamily: FontFamily.Popinssemibold,
                        }}>
                        {props.WeekOffDays}
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.verysmallText,
                            color: Colors.black,
                            fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Weekly off
                    </Text>
                </View>

                <View
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            fontSize: FontSize.labelText3,
                            color: Colors.bluetheme,
                            fontFamily: FontFamily.Popinssemibold,
                        }}>
                        {props.LeaveDays}
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.verysmallText,
                            color: Colors.black,
                            fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Leave
                    </Text>
                </View>
            </View> */}

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 8,
                        width: props.width != undefined ? width * 0.88 : width * 0.92,
                    }}>
                    <View
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontSize: FontSize.labelText3,
                                // color: Colors.bluetheme,
                                color: Color.Color.BLUEWHITE,
                                fontFamily: FontFamily.Popinssemibold,
                            }}>{props.WeekOffDays}</Text>
                        <Text
                            style={{
                                fontSize: FontSize.SMALL8,
                                // color: Colors.black,
                                color: themecolor.TXTWHITE,
                                fontFamily: FontFamily.PopinsMedium,
                            }}> Weekly off</Text>
                    </View>
                    <View
                        style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>
                        <Text
                            style={{
                                fontSize: FontSize.labelText3,
                                // color: Colors.bluetheme,
                                color: Color.Color.BLUEWHITE,
                                fontFamily: FontFamily.Popinssemibold,
                            }}> {props.LeaveDays}</Text>
                        <Text
                            style={{
                                fontSize: FontSize.SMALL8,
                                // color: Colors.black,
                                color: themecolor.TXTWHITE,
                                fontFamily: FontFamily.PopinsMedium,
                            }}> Leave</Text>
                    </View>
                </View>

            </View>
        </>
    )
}

export default AttendanceData
import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { FontSize } from '../../assets/fonts/Fonts';
import Spacer from '../../globalConfig/Components/AppSpacer/Spacer';
import { screenWidth } from '../../globalConfig/Components/Metric';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import Video from 'react-native-video';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux'
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';


const { width, height } = Dimensions.get('window');
var heightY = Dimensions.get('window').height;
const imgArr = [
  {
    imagesname: require('../../assets/images/app,intro,splashscreen,login/Attendance.mp4'),
    headings: [
      {
        icon: require('../../assets/images/app,intro,splashscreen,login/Attendance.mp4'),
        text: 'Mark your Attendance, Leave all in one place',
        text2: 'Get rid of daily attendance by simply tapping on your phone',
      },

    ],
  },
  {
    imagesname1: require('../../assets/images/app,intro,splashscreen,login/beatroutes.mp4'),
    headings: [
      {
        icon: require('../../assets/images/app,intro,splashscreen,login/beatroutes.mp4'),
        text: 'Plan and execute your beat routes easily',
        text2: 'Design your own beats and route and sent them for approvals.',
      },

    ],
  },
  {
    imagesname: require('../../assets/images/app,intro,splashscreen,login/product.mp4'),
    headings: [
      {
        icon: require('../../assets/images/app,intro,splashscreen,login/product.mp4'),
        text: 'Present your product anywhere anytime',
        text2: 'Get present your product to your customer at anytime anywhere from your mobile devices',
      },

    ],
  },
];
  
class ViewPager extends React.Component {

  scrollX = new Animated.Value(0);
  state = {
    currentIndex: 0,
  };
 
  _enableEventHandler = index => {
    if (index < imgArr.length) {
      this.setState({ currentIndex: index });
      this.flatListRef.scrollToIndex({
        viewPosition: 0.5,
        index: index,
        animated: true,
      });
    } else {
      this.flatListRef.scrollToIndex({
        viewPosition: 0.5,
        index: 0,
        animated: true,
      });
    }
  };
  componentDidMount = async () => {
    await AsyncStorage.setItem('@isFirstTime', 'false');
  };

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    this.setState({ currentIndex: viewableItems[0].index });
  };

  handleTouch = async () => {
    navigate('BFirst');
  };

  
  render() {
    let position = Animated.divide(this.scrollX, width);
    const mode= this.props.mode 
    const themecolor = new MyThemeClass(mode).getThemeColor()
    
    return (
      <View
        style={{ flex: 1, width: width, height: height * 1.32 }}
      >
        <View style={{ flex: 1, }}>
          <View style={{...styles.mainView, backgroundColor:themecolor.THEMECOLOR1}}>
            <StatusBar translucent backgroundColor="transparent" />
            <View >

              <FlatList
                data={imgArr}
                renderItem={({ item, index }) => {
                  return (
                    <View
                      style={{ flex: 1, width: width, height: height * 1.32 }}
                    >
                      <View style={{ ...styles.fMainView }}>
                        <View style={{ marginVertical: 30 }} />
                        <View style={{ top: 20, }}>
                          <View >
                            <Text style={{ ...styles.fTitle, color: themecolor.TXTWHITE }}>{item.title}</Text>

                            <Text style={{ ...styles.fTitle, color: themecolor.TXTWHITE }}>{item.desc}</Text>
                          </View>
                          <View style={{ marginVertical: 15 }} />
                          {item.headings.map(itm => (
                            <View style={{ ...styles.header, paddingVertical: 12 }}>
                              <View style={{ flex: 1 }}>
                                <Video
                                  key={index}
                                  style={styles.backgroundVideo}
                                  source={itm.icon}
                                  muted={true}
                                  resizeMode={"cover"}
                                  repeat={true}
                                  rate={1.0}
                                  ignoreSilentSwitch={"obey"}
                                />
                                <View
                                  style={{
                                    margin: 5,
                                    alignSelf: 'center',
                                    width: width * 0.9
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 21,
                                      color:themecolor.TXTWHITE,
                                      lineHeight: 22,
                                      fontFamily: FontFamily.Popinssemibold,
                                      textAlign: 'center',
                                      width: width * 0.85,
                                      alignSelf: 'center',
                                    }}>
                                    {itm.text}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: FontSize.labelText3,
                                      color: themecolor.TXTWHITE,
                                      fontFamily: FontFamily.PopinsMedium,
                                      textAlign: 'center',
                                      width: width * 0.7,
                                      alignSelf: 'center',
                                    }}>
                                    {itm.text2}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ))}
                        </View>
                      </View>
                    </View>
                  );
                }}
                horizontal
                pagingEnabled
                ref={ref => {
                  this.flatListRef = ref;
                }}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                  { nativeEvent: { contentOffset: { x: this.scrollX } } },
                ])}
                keyExtractor={(item, index) => String(index)}
                scrollEventThrottle={50}
                onViewableItemsChanged={this.onViewableItemsChanged}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 50,
                }}
              />
            </View>

            {/* <Spacer /> */}
            {this.state.currentIndex < 2 ? (
              <View style={{ bottom: 0, position: 'absolute' }}>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: width * 0.9
                  }}>
                  <TouchableOpacity

                    activeOpacity={1}
                    onPress={() => this.props.navigation.navigate('QRScannerNew')}
                  // onPress={() => this.props.navigation.navigate('QRScannerNew')}
                  >
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: FontSize.VText,
                        fontFamily: FontFamily.PopinsMedium,
                        color: themecolor.TXTWHITE,
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    // style={styles.touchSkip}
                    onPress={() =>
                      this.flatListRef.scrollToIndex({
                        viewPosition: 0.5,
                        index: imgArr.length - 1,
                        animated: true,
                      })
                    }>
                    <View style={styles.row}>
                      {imgArr.map((_, i) => {
                        return (
                          <Animated.View

                            key={i}
                            style={{
                              ...styles.dotStyle,
                              width: this.state.currentIndex == i ? 29 : 8,
                              backgroundColor: this.state.currentIndex != i ? Colors.dotdiablecolor : Colors.bluetheme1,
                            }}
                          />
                        );
                      })}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this._enableEventHandler(this.state.currentIndex + 1)
                    }>
                    <Image
                      style={{
                        width: 44,
                        height: 45,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                        top: -15
                      }}
                      source={require('../../assets/images/app,intro,splashscreen,login/nextarrow.png')}
                    />

                  </TouchableOpacity>
                </View>
                <Spacer size={20} />
              </View>
            ) : (
              <View style={{ bottom: 0, position: 'absolute', }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: screenWidth,
                    top: -15,
                    alignContent: 'center',
                    alignSelf: 'center'
                  }}>
                  <View style={{ width: width * 0.3, alignSelf: 'center', justifyContent: 'center' }}>
                  </View>
                  <View style={{ width: width * 0.2, alignSelf: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      activeOpacity={1}

                      onPress={() =>
                        this.flatListRef.scrollToIndex({
                          viewPosition: 0.5,
                          index: imgArr.length - 1,
                          animated: true,
                        })
                      }>
                      <View style={styles.row}>
                        {imgArr.map((_, i) => {

                          return (
                            <Animated.View
                              key={i}
                              style={{

                                ...styles.dotStyle,
                                width: this.state.currentIndex == i ? 29 : 8,
                                backgroundColor: this.state.currentIndex != i ? Colors.dotdiablecolor : Colors.bluetheme1,
                              }}
                            />
                          );
                        })}
                      </View>

                    </TouchableOpacity>
                  </View>
                  <View style={{ alignSelf: 'center', justifyContent: 'center', width: width * 0.35, marginRight: 10 }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{ ...styles.LinearGradientStyle1, backgroundColor: themecolor.HEADERTHEMECOLOR }}

                      onPress={() => this.props.navigation.navigate('QRScannerNew')}
                    >
                      <Text
                        style={{
                          ...styles.continue,
                          fontFamily: FontFamily.PopinsMedium,
                        }}>
                        Get Started
                      </Text>

                    </TouchableOpacity>
                  </View>
                </View>
                <Spacer size={20} />
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
}

export default connect(mapStateToProps)(ViewPager); 
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff" ,
  },
  header: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 30
  },
  dotStyle: {
    height: 8,
    width: 12,
    margin: 6,
    borderRadius: 10,
    backgroundColor: Colors.dotcolor,
  },
  row: {
    flexDirection: 'row',
  },
  LinearGradientStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    width: 40,
    height: 40,
    backgroundColor: '#3862f8'
  },
  LinearGradientStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 10,
    alignSelf: 'center',
    paddingVertical: 3,


  },
  touchSkip: {
    alignSelf: 'flex-start',
    left: 20,
  },
  touchNext: {
    alignSelf: 'flex-end',
    right: 20,
  },
  textSkip: {
    padding: 5,
    fontSize: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  imageView: {
    width,
    height: height * 0.5,
  },
  fImage: {
    alignSelf: 'center',
    height: 65,
    width: 65,
  },
  fMainView: {
    flexDirection: 'column',
    width,
  },
  backgroundVideo: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width * 0.9,
    height: 300
  },
  fTitle: {
    fontSize: heightY * 0.042,
    alignSelf: 'center',
    color: '#000',
    width: width * 0.83,
    fontFamily: FontFamily.Popinssemibold,
  },
  fDesc: {
    width: width * 0.8,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#494949',
    fontSize: heightY * 0.015,
    fontFamily: FontFamily.Popinssemibold,
  },
  continue: {
    fontSize: 12,
    padding: 4,
    color: Colors.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  touch: {
    borderRadius: 30,
    backgroundColor: Colors.lightpurple,
  },
});

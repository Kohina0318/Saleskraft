import { View, Text, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleGrievance';
import { FontSize } from '../../assets/fonts/Fonts';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import LoaderAllInOne from '../../components/shared/Loader';
import { Colors } from '../../assets/config/Colors';
import { FontFamily } from '../../assets/fonts/FontFamily';
import DummyImage from '../../components/shared/DummyImage';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');

const CaseDescription = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const Case_id = props.route.params.Case_id;
  // console.log('case_id2525', Case_id);
  // const [data, setData] = useState('');
  // const [casetype, setCasetype] = useState([]);
  // const [note, setNote] = useState('');
  // const [filePath, setFilePath] = useState({
  //   uri: 'https://picsum.photos/200/300?random=1',
  // });

  const [outlet, setOutlet] = useState('');
  const [casetype, setCasetype] = useState('');
  const [description, setDescription] = useState('');
  const [replies, setReplies] = useState('');
  const [repliesData, setRepliesData] = useState([]);
  const [manager, setManager] = useState('');
  const [loader, setLoader] = useState(true);
  const [Imgarr, setImgarr] = useState([]);
  const [getBaseUrl, setBaseUrl] = useState('');

  // ===========CAMERA MEDIA FUNCTION START==========

  const getTicketDetails = async () => {
    try {
      const result = await gettripLocationApi(
        `api/getIdByTicket?ticket_id=${Case_id}`,
      );
      if (result.statusCode == 200) {
        setDescription(result.data.ticket[0].Description);
        const media_id = result.data.ticket[0].MediaId.split(',');
        setCasetype(result.data.ticket[0].TicketType.TicketType);
        setOutlet(result.data.ticket[0].Outlets.OutletName);
        setRepliesData(result.data.replies);
        if (result.data.replies.length >= 1) {
          setReplies(result.data.replies[0].TicketReplies);
          setManager(
            `${result.data.replies[0].Employee.FirstName}_${result.data.replies[0].Employee.LastName}`,
          );
        }
        var tArr = [];
        if (media_id != '') {
          setTimeout(() => {
            setImgarr(media_id);
            console.log('tARr inside setimeout', media_id);
          }, 0);
        }
        setLoader(false);
        console.log('tArrtArr==+', tArr);
      } else {
        alert(result.message);
        setLoader(false);
      }
    } catch (err) {
      console.log('catch error in getTicketById ', err);
      setLoader(false);
    }
  };

  useEffect(() => {
    getTicketDetails();
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: themecolor.THEMECOLOR }}>
      {/* <View style={{ flex: 0.1 }}> */}
      <Header_2
        title={'Case Description'}
        onPress={() => props.navigation.goBack()}
      />
      {loader ? (
        <>
        <View  style={{backgroundColor:'red'}}>
          <LoaderAllInOne />
          </View>
        </>
      ) : (
        <View>
          <View style={{ height: 10 }} />
          <View style={styles.typem}>
            <View>
              <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>Case type</Text>
            </View>
            <View style={{ ...styles.textContainerr, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              {/* <TextInput style={{width: width * 0.92}} value={casetype} /> */}
              <Text
                style={{
                  width: width * 0.92,
                  color: themecolor.TXTWHITE,
                  left: 5,
                  fontFamily: FontFamily.PopinsRegular,
                }}>
                {casetype}
              </Text>
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View style={styles.typem}>
            <View>
              <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>Reporting on behalf of</Text>
            </View>
            <View style={{ ...styles.textContainerr, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              {/* <TextInput style={{width: width * 0.92}} value={outlet} /> */}
              <Text
                style={{
                  width: width * 0.92,
                  color: themecolor.TXTWHITE,
                  left: 5,
                  fontFamily: FontFamily.PopinsRegular,
                }}>
                {outlet}
              </Text>
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View style={styles.typem}>
            <View>
              <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>Uploaded media</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <View
                style={{
                  borderRadius: 10,
                  position: 'relative',
                  flexWrap: 'wrap',
                  flexDirection: 'row',

                }}>
                {Imgarr.length >= 1 ? (
                  Imgarr?.map((i,index) => {
                    console.log('ii', i);
                    return (
                      <Image
                      key={index}
                        resizeMode="center"
                        source={{
                          uri: `${getBaseUrl}media?id=${i}`,
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          marginLeft: 3,
                          borderRadius: 10,
                        }}
                      />
                    );
                  })
                ) : (
                  <View style={{ borderRadius: 12, overflow: 'hidden', }}>
                    <DummyImage width={50} height={50} />
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View style={styles.typem}>
            <View>
              <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>Note</Text>
            </View>
            <View style={{ ...styles.ti, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
              <Text
                style={{
                  padding: 10,
                  color: themecolor.TXTWHITE,
                  fontFamily: FontFamily.PopinsRegular,
                }}>
                {description}
              </Text>
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View style={{ width: width * 0.93, alignSelf: 'center' }}>
            <Text style={{ ...styles.type, color: themecolor.TXTWHITE }}>Comments</Text>
            <View style={{ height: 10 }} />
            {repliesData.length >= 1 ? (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '10%' }}>
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderWidth: 0.5,
                      borderColor: Colors.borderColor1,
                      backgroundColor: 'white',
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      borderBottomLeftRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1
                    }}>
                    <Text
                      style={{
                        fontFamily: FontFamily.Popinssemibold,
                        color: themecolor.TXTWHITE
                      }}>
                      By
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '85%',
                    backgroundColor: 'white',
                    minHeight: 50,
                    borderRadius: 13,
                    borderWidth: 0.5,
                    borderColor: Colors.borderColor1,
                    padding: 8,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                    borderColor: themecolor.BOXBORDERCOLOR1
                  }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text
                      style={{
                        top: 2,
                        color: Colors.productcolor1,
                        fontFamily: FontFamily.Popinssemibold,
                      }}>
                      {manager.toLowerCase()}
                    </Text>
                    <View
                      style={{
                        borderRadius: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: FontSize.verysmallText,
                          textAlignVertical: 'center',
                          backgroundColor: 'transparent',
                          paddingHorizontal: 5,
                          color: Colors.green1,
                          fontFamily: FontFamily.PopinsRegular,
                          left: 5,
                          borderRadius: 10,
                          borderWidth: 0.5,
                          borderColor: Colors.green1,
                        }}>
                        Manager
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      top: 2,
                      color: 'black',
                      fontFamily: FontFamily.PopinsRegular,
                      paddingBottom: 8,
                      fontSize: FontSize.smallText,
                    }}>
                    {replies.trim()}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: width,
                  marginVertical: 60,

                }}>
                <Text style={{ ...styles.CardText, color: themecolor.TXTWHITE }}>No Comments available</Text>
              </View>
            )}
          </View>

          {/* <FullsizeButton
            backgroundColor={'grey'}
            height={38}
            width={width * 0.92}
            onPress={() => {
              // ToastAndroid.showWithGravityAndOffset(
              //   `${JSON.stringify(remoteMessage.notification.body)}`,
              //   ToastAndroid.TOP,
              //   ToastAndroid.LONG,
              //   10,
              //   10,
              // );
              
            }}
          /> */}
        </View>
      )}
    </View>
  );
};

export default CaseDescription;

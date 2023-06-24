import { View, Text, StatusBar, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../../assets/css/stylesDashboardBA';
import Header_2 from './Header_2';
import StyleCss from '../../assets/css/stylesDashboardBA';
import { db } from '../../helper/SQLite DB/Sqlite';
import { SERVER_URL } from '../../repository/commonRepository';
const { width } = Dimensions.get('window')
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function VisitHistoryMoreDetails(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [outcomeName, setOutcomeName] = React.useState('')
  const [getBaseUrl, setBaseUrl] = React.useState('')
  var Data = props.route.params.item;

  var Name = Data.EmployeeRelatedByEmpId.FirstName + " " + Data.EmployeeRelatedByEmpId.LastName
  var date = '';
  var checkInTime = '';
  var checkOutTime = '';
  const [checkoutImage, setCheckoutImage] = useState([])

  React.useEffect(() => {
    async function temp() {
      setBaseUrl(await SERVER_URL())
    }
    temp()
  }, [])

  /*.... Date ...*/
  try {
    date = Data.CreatedAt.split(' ')[0];
  } catch (e) {
    date = '';
  }

  /*.... CheckInTime ...*/
  try {
    var hh = `${Data.CheckinTime.split(':')[0]}`;
    var minute = `${Data.CheckinTime.split(':')[1]}`;

    if (hh < 12) {
      checkInTime = `${hh}:${minute} Am`
    }
    else {
      checkInTime = `${parseInt(hh) - 12}:${minute} Pm`
    }
    console.log("KKKKKKKKKK=====>", checkInTime)
  } catch (e) {
    checkInTime = '';
  }

  /*.... CheckOutTime ...*/
  try {
    var hh = `${Data.CheckoutTime.split(':')[0]}`;
    var minute = `${Data.CheckoutTime.split(':')[1]}`;
    if (hh < 12) {
      checkOutTime = `${hh}:${minute} Am`
    }
    else {
      checkOutTime = `${parseInt(hh) - 12}:${minute} Pm`
    }
    console.log("KKKKKKKKKK=====>", checkOutTime)
  } catch (e) {
    checkOutTime = '';
  }

  console.log("IMage URL==",)

  React.useEffect(() => {
    try {
      if (Data.CheckoutMedia == null || Data.CheckoutMedia == '') {
        setCheckoutImage([]);
      }

      else {
        setCheckoutImage(Data.CheckoutMedia.split(','));
        // setCheckoutImage(`http://saleskraft.archisys.biz/media?id=${Data.CheckoutMedia}`);
      }
    } catch (e) {
      setCheckoutImage([]);
    }
  }, [])

  React.useEffect(() => {
    async function temp() {
      try {
        await db.transaction(async tx => {
          await tx.executeSql(
            `SELECT OutcomeName from Outcome where Id='${Data.OutletOutcome}'`,
            [],
            (tx, results) => {
              console.log('errr', tx);
              console.log('result Line 141--->', results);
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i) {
                temp.push(results.rows.item(i));
              }
              console.log("OUTCOME NAME===", temp)
              try {
                setOutcomeName(temp[0].OutcomeName);

              } catch (e) {
                setOutcomeName('');
              }

              console.log(
                'Data returned From Outlets SQLITE ine 66 ----->',
                temp,
              );
            },
          );
        });
      } catch (e) {
        console.log('Err in OutletvIew Line 174', e);
      }
    }
    temp()
  }, [])

  console.log("checkoutImage==", checkoutImage)


  return (
    <View style={{ ...styles.bg, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header_2 title={Name} onPress={() => props.navigation.goBack()} />

      {/* <View style={{ marginTop: 6 }} /> */}

      {/* <View style={{
        width: width * 0.97, padding: 17,
        justifyContent: 'center', alignSelf: 'center',backgroundColor:'red'
      }}> */}
      <View style={{ width: width * 0.96, justifyContent: 'center', alignSelf: 'center', padding: 10, top: 5 }}>
        <View style={{ flexDirection: 'row', }}>
          <Text style={styles.RateTextDetailsBlue}>
            Date :
          </Text>
          <Text style={{ ...styles.RateTextboldblackCircleDetails1, color: themecolor.TXTWHITE }}>
            {" "} {date}
          </Text>
        </View>

        <View style={{ marginTop: 10 }} />

        <View>
          <Text style={styles.RateTextDetailsBlue}>
            Check-in Details :
          </Text>

          <View style={{
            backgroundColor: themecolor.BOXTHEMECOLOR,
            borderWidth: 0.5,
            borderColor: themecolor.BOXBORDERCOLOR1,
            borderRadius: 10,

          }}>
            <View style={{ padding: 15, }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                  Time
                </Text>
                <Text style={{ ...styles.RateTextboldblackCircleDetails, color: themecolor.TXTWHITE }}>
                  {' '} {checkInTime}
                </Text>
              </View>

              <View style={{ marginTop: 5 }} />

              <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                Address
              </Text>
              <Text style={{ ...styles.RateTextboldblackCircleDetails, color: themecolor.TXTWHITE }}>
                {Data.CheckinAddress !=null ? Data.CheckinAddress : ""}
              </Text>

            </View>

          </View>

        </View>

        <View style={{ marginTop: 10 }} />

        {(checkOutTime != "") && (Data.CheckoutAddress != null) ?
          <View>
            <Text style={styles.RateTextDetailsBlue}>
              Check-out Details :
            </Text>

            <View style={{
              backgroundColor: themecolor.BOXTHEMECOLOR,
              borderWidth: 0.5,
              borderColor: themecolor.BOXBORDERCOLOR1,
              borderRadius: 9,
              width: width * 0.9,
            }}>
              <View style={{ padding: 15 }}>

                {checkOutTime != "" ?
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                      Time
                    </Text>
                    <Text style={{ ...styles.RateTextboldblackCircleDetails, color: themecolor.TXTWHITE }}>
                      {' '} {checkOutTime}
                    </Text>
                  </View>
                  : <></>}



                {Data.CheckoutAddress != null ? (<>
                  <View style={{ marginTop: 5 }} />

                  <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                    Address
                  </Text>
                  <Text style={{ ...styles.RateTextboldblackCircleDetails, color: themecolor.TXTWHITE }}>
                    {Data.CheckoutAddress !=null ? Data.CheckoutAddress :""}
                  </Text>
                </>) : <></>}

                {outcomeName != "" ? (
                  <>
                    <View style={{ marginTop: 5 }} />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                        Meeting Notes
                      </Text>
                      <Text style={{ ...styles.RateTextboldblackCircleDetails, color: themecolor.TXTWHITE }}>
                        {' '} {outcomeName}
                      </Text>
                    </View>

                  </>) : (<></>)}



                {checkoutImage.length > 0 ?
                  (<>
                    <View style={{ marginTop: 5 }} />

                    <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                      Media
                    </Text>

                    <View style={{ ...StyleCss.Width2, flexDirection: 'row' }}>
                      {
                        checkoutImage.map((itm) => {
                          return (
                            <View style={{ padding: 2 }}>
                              <Image
                                source={{ uri: `${getBaseUrl}media?id=${itm}` }}
                                style={{ ...styles.viewImageDetails }}
                                resizeMode={'contain'} />
                            </View>

                          )
                        })}
                    </View>
                  </>
                  ) : (<></>)
                }

                {Data.CheckoutRemark != null ? (
                  <>
                    <View style={{ marginTop: 5 }} />

                    <Text style={{ ...styles.RateTextDetails, color: themecolor.TXTWHITE }}>
                      Remark
                    </Text>
                    <Text style={{ ...styles.RateTextboldblackCircleDetails, color: themecolor.TXTWHITE }}>
                      {Data.CheckoutRemark != null ? Data.CheckoutRemark : "" }
                    </Text>
                  </>
                ) : (
                  <></>
                )
                }


              </View>

            </View>
          </View>
          : <></>
        }
      </View>

    </View>
  )


}
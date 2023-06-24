import React, {useState,useCallback} from 'react';
import Header_2 from '../../components/shared/Header_2';
import {gettripLocationApi} from '../../repository/trip/tripRepository';
import EFooter from '../../components/ExpenseData/EFooter';
import moment from 'moment';
import Color from '../../components/Theme/ThemeDarkLightColor';
import {FontSize} from '../../assets/fonts/Fonts';
import {FontFamily} from '../../assets/fonts/FontFamily';
import MIC from 'react-native-vector-icons/MaterialCommunityIcons';
import {MyThemeClass} from '../../components/Theme/ThemeDarkLightColor';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  // FlatList,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const {width, height} = Dimensions.get('window');

const RequestDashboardExp = props => {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  const [approvalData, setApprovalData] = useState([]);
  const [tripData, setTripData] = useState([]);
  const [loader, setLoader] = useState(true);

  // alert(JSON.stringify(tripData))

  const startOfMonth = moment().subtract(30, 'days').format('DD-MM-YYYY');
  // console.log("START OF MONTH>>>>>>>>>>>>>>11",startOfMonth)
  const curDate = moment().format('DD-MM-YYYY');
  // console.log("CUR DATE>>>>>>>>>>>>>>>>>>>>>>>13",curDate)

  useFocusEffect(
    useCallback(() => {
      const asyncSeprateFun = async () => {
        const result = await gettripLocationApi(
          `api/getawatingApprovalExpenses?from_date=${startOfMonth}&to_date=${curDate}`,
        );
        // console.log(
        //   'RESULT OF AWAITING APPROVAL EXPENSES>>>>>>>>>17',
        //   result.data[0],
        // );
        setApprovalData(result.data);
        const tripResult = await gettripLocationApi(
          `api/getawatingApprovalTripNew?filterdate=${curDate}`,
        );
        // console.log('RESULT OF AWAITING APPROVAL TRIP NEW', tripResult);
        setTripData(tripResult.data);
        setLoader(!loader);
      };
      asyncSeprateFun();
    }, []),
  );

  let tempLength = [];
  const lengthOfBothData = approvalData.length + tripData.length;
  for (let index = 1; index <= lengthOfBothData; index++) {
    tempLength.push({index});
  }
  // alert(tempLength.length)
  // alert(JSON.stringify(tempLength))

  function ComponentRequestDashboardStartShimmer(props) {
    return (
      <SkeletonPlaceholder>
        <View style={{alignSelf: 'center', margin: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: width * 0.93,
              marginTop: 2,
              // padding: 2,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: Color.Color.BOXBORDERCOLOR,
              alignItems: 'center',
              padding: 4,
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                // borderColor: Colors.borderColor1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 50,
                overflow: 'hidden',
                marginLeft: 6,
              }}
            />
            <View>
              <View
                style={{height: 13, width: width * 0.93 - 80, marginLeft: 8}}
              />
              <View
                style={{
                  marginLeft: 8,
                  width: 75,
                  padding: 1,
                  borderRadius: 5,
                  height: 10,
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  // Dont remove🤞 this below commented code================ Vishwas🤷‍♀️

  // const RenderAprrovalData = ({ item }) => (
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       backgroundColor: Color.Color.BOXTHEMECOLOR,
  //       width: width * 0.93,
  //       marginTop: 2,
  //       // padding: 2,
  //       borderRadius: 12,
  //       borderWidth: 1,
  //       borderColor: Color.Color.BOXBORDERCOLOR,
  //       alignItems: 'center',
  //       padding: 10,
  //     }}>
  //     <View
  //       style={{
  //         width: 50,
  //         height: 50,
  //         borderWidth: 1,
  //         // borderColor: Colors.borderColor1,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         backgroundColor: 'white',
  //         borderRadius: 50,
  //         overflow: 'hidden',
  //         marginLeft: 6,
  //       }}>
  //       {item.picture == null || item.picture == '' ? (
  //         <Image
  //           source={require('../../assets/images/dummyuser.png')}
  //           style={{ height: 50, width: 50 }}
  //           resizeMode={'cover'}
  //         />
  //       ) : (
  //         <Image
  //           source={{
  //             uri: `${getBaseUrl}uploads/2/${item.picture}`,
  //           }}
  //           style={{ height: 60, width: 60 }}
  //           resizeMode={'contain'}
  //         />
  //       )}
  //     </View>
  //     <View style={{ width: width * 0.93 - 80, marginLeft: 8 }}>
  //       <Text
  //         style={{
  //           color: Color.Color.TXTWHITE,
  //           fontSize: FontSize.labelText2,
  //           fontFamily: FontFamily.Popinssemibold,
  //           //   top:4
  //         }}>
  //         {item.employeeName}
  //       </Text>
  //       <View style={{ flexDirection: 'row' }}>
  //         <TouchableOpacity
  //           onPress={() =>
  //             navigation.navigate('EmpExpensesReqList', {
  //               empId: item.EmployeeId,
  //               navigateFrom: 'Expense',
  //             })
  //           }
  //           style={{
  //             marginRight: 5,
  //             backgroundColor: '#F75A32',
  //             width: 65,
  //             padding: 1,
  //             borderRadius: 5,
  //             alignItems: 'center',
  //           }}>
  //           <View
  //             style={{
  //               alignItems: 'center',
  //               flexDirection: 'row',
  //             }}>
  //             <View style={{ top: -1.5 }}>
  //               <MIC name="wallet-outline" color={'#fff'} />
  //             </View>
  //             <View>
  //               <Text
  //                 style={{
  //                   color: '#fff',
  //                   fontSize: 10,
  //                   fontFamily: FontFamily.PopinsMedium,
  //                   marginLeft: 2,
  //                 }}>
  //                 Expense
  //               </Text>
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // )

  // const RenderTripData = ({ item }) => (
  //   <View
  //     style={{
  //       flexDirection: 'row',
  //       backgroundColor: Color.Color.BOXTHEMECOLOR,
  //       width: width * 0.93,
  //       marginTop: 2,
  //       // padding: 2,
  //       borderRadius: 12,
  //       borderWidth: 1,
  //       borderColor: Color.Color.BOXBORDERCOLOR,
  //       alignItems: 'center',
  //       padding: 10,
  //     }}>
  //     <View
  //       style={{
  //         width: 50,
  //         height: 50,
  //         borderWidth: 1,
  //         // borderColor: Colors.borderColor1,
  //         alignItems: 'center',
  //         justifyContent: 'center',
  //         backgroundColor: 'white',
  //         borderRadius: 50,
  //         overflow: 'hidden',
  //         marginLeft: 6,
  //       }}>
  //       {item.picture == null || item.picture == '' ? (
  //         <Image
  //           source={require('../../assets/images/dummyuser.png')}
  //           style={{ height: 50, width: 50 }}
  //           resizeMode={'cover'}
  //         />
  //       ) : (
  //         <Image
  //           source={{
  //             uri: `${getBaseUrl}uploads/2/${item.picture}`,
  //           }}
  //           style={{ height: 60, width: 60 }}
  //           resizeMode={'contain'}
  //         />
  //       )}
  //     </View>
  //     <View style={{ width: width * 0.93 - 80, marginLeft: 8 }}>
  //       <Text
  //         style={{
  //           color: Color.Color.TXTWHITE,
  //           fontSize: FontSize.labelText2,
  //           fontFamily: FontFamily.Popinssemibold,
  //           //   top:4
  //         }}>
  //         {item.employeeName}
  //       </Text>
  //       <View style={{ flexDirection: 'row' }}>
  //         <TouchableOpacity
  //           onPress={() =>
  //             navigation.navigate('EmpExpensesReqList', {
  //               empId: item.EmployeeId,
  //               navigateFrom: 'Trip',
  //             })
  //           }
  //           style={{
  //             backgroundColor: '#52BC2F',
  //             width: 45,
  //             padding: 1,
  //             borderRadius: 5,
  //             alignItems: 'center',
  //           }}>
  //           <View
  //             style={{
  //               alignItems: 'center',
  //               flexDirection: 'row',
  //             }}>
  //             <View style={{ top: -1.5 }}>
  //               <MIC name="airplane" color={'#fff'} />
  //             </View>
  //             <View>
  //               <Text
  //                 style={{
  //                   color: '#fff',
  //                   fontSize: 10,
  //                   fontFamily: FontFamily.PopinsMedium,
  //                   marginLeft: 2,
  //                 }}>
  //                 Trip
  //               </Text>
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // )

  // Dont remove this above commented code================ Vishwas

  return (
    <>
      <View style={{flex: 1, backgroundColor: themecolor.THEMECOLOR}}>
        <Header_2 title="Approvals" onPress={() => props.navigation.goBack()} />
        {loader ? (
          tempLength.map((_,index) => {
            return <ComponentRequestDashboardStartShimmer key={index} />;
          })
        ) : (
          <View style={{alignSelf: 'center', margin: 10}}>
            {/* <FlatList
            data={approvalData}
            renderItem={({ item }) => <RenderAprrovalData item={item} />}
            keyExtractor={item => item.EmployeeId}
          /> */}
            {/* <FlatList
            data={tripData}
            renderItem={({ item }) => <RenderTripData item={item} />}
            keyExtractor={item => item.EmployeeId}
          /> */}
            {approvalData.map((item, index) => {
              return (
                <TouchableOpacity
                key={index}
                  onPress={() =>
                    props.navigation.navigate('EmpExpensesReqList', {
                      empId: item.EmployeeId,
                      navigateFrom: 'Expense',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    backgroundColor: Color.Color.BOXTHEMECOLOR,
                    width: width * 0.93,
                    marginTop: 2,
                    // padding: 2,
                    borderRadius: 12,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderWidth: 1,
                      // borderColor: Colors.borderColor1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 50,
                      overflow: 'hidden',
                      marginLeft: 6,
                    }}>
                    {item.picture == null || item.picture == '' ? (
                      <Image
                        source={require('../../assets/images/dummyuser.png')}
                        style={{height: 50, width: 50}}
                        resizeMode={'cover'}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: `${getBaseUrl}uploads/2/${item.picture}`,
                        }}
                        style={{height: 60, width: 60}}
                        resizeMode={'contain'}
                      />
                    )}
                  </View>
                  <View style={{width: width * 0.93 - 80, marginLeft: 8}}>
                    <Text
                      style={{
                        color: Color.Color.TXTWHITE,
                        fontSize: FontSize.labelText2,
                        fontFamily: FontFamily.Popinssemibold,
                        color: themecolor.TXTWHITE,
                      }}>
                      {item.employeeName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          marginRight: 5,
                          backgroundColor: '#F75A32',
                          width: 65,
                          padding: 1,
                          borderRadius: 5,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <View style={{top: -1.5}}>
                            <MIC name="wallet-outline" color={'#fff'} />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 10,
                                fontFamily: FontFamily.PopinsMedium,
                                marginLeft: 2,
                              }}>
                              Expense
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {tripData.map((item, index) => {
              return (
                <TouchableOpacity
                key={index}
                  onPress={() =>
                    props.navigation.navigate('EmpExpensesReqList', {
                      empId: item.EmployeeId,
                      navigateFrom: 'Trip',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    backgroundColor: Color.Color.BOXTHEMECOLOR,
                    width: width * 0.93,
                    marginTop: 8,
                    // padding: 2,
                    borderRadius: 12,
                    borderWidth: 0.5,
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    alignItems: 'center',
                    padding: 4,
                    backgroundColor: themecolor.BOXTHEMECOLOR,
                  }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderWidth: 1,
                      // borderColor: Colors.borderColor1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      borderRadius: 50,
                      overflow: 'hidden',
                      marginLeft: 6,
                    }}>
                    {item.picture == null || item.picture == '' ? (
                      <Image
                        source={require('../../assets/images/dummyuser.png')}
                        style={{height: 50, width: 50}}
                        resizeMode={'cover'}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: `${getBaseUrl}uploads/2/${item.picture}`,
                        }}
                        style={{height: 60, width: 60}}
                        resizeMode={'contain'}
                      />
                    )}
                  </View>
                  <View style={{width: width * 0.93 - 80, marginLeft: 8}}>
                    <Text
                      style={{
                        color: Color.Color.TXTWHITE,
                        fontSize: FontSize.labelText2,
                        fontFamily: FontFamily.Popinssemibold,
                        color: themecolor.TXTWHITE,
                      }}>
                      {item.employeeName}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          backgroundColor: '#52BC2F',
                          width: 45,
                          padding: 1,
                          borderRadius: 5,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <View style={{top: -1.5}}>
                            <MIC name="airplane" color={'#fff'} />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: '#fff',
                                fontSize: 10,
                                fontFamily: FontFamily.PopinsMedium,
                                marginLeft: 2,
                              }}>
                              Trip
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
      <View style={{justifyContent: 'flex-end'}}>
        <EFooter manager={false} />
      </View>
    </>
  );
};

export default RequestDashboardExp;

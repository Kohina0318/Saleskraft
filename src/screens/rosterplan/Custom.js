import React, { useRef, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styleCreateTour';
import { store } from '../../../App';
import Selector from './Selector';
import { Checkbox } from 'react-native-paper';
import { Colors } from '../../assets/config/Colors';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

function Item({
  allBeats,
  eventTypes,
  wholemonthDatesObj,
  headingVal,
  navigateFor,
  tRefresh,
  setTRefresh,
  beatObj,
  checked,
  setChecked,
}) {
  var BEATTTT = '';
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const [beatforshow, setBeatforShow] = useState('Select');
  const [refresh, setRefresh] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const RoasterPlans = useSelector(state => state.RoasterPlans);
  const [isBeatVisible, setIsBeatVisible] = useState(false);

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  // console.log(
  //   'wholemonthDatesObj[headingVal].OutletIds==========',
  //   wholemonthDatesObj,
  // );

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  useEffect(() => {
    // console.log(" wholemonthDatesObj[headingVal].TpState>>>>>>>>>>>>>", wholemonthDatesObj[headingVal].TpState)

    if (
      navigateFor === 'editTour' &&
      wholemonthDatesObj[headingVal].OutletIds != '' &&
      wholemonthDatesObj[headingVal].OutletIds != null
    ) {
      // alert(navigateFor)
      // alert("OutletsId"+wholemonthDatesObj[headingVal].OutletIds)
      // console.log("beatObj[wholemonthDatesObj[headingVal].",wholemonthDatesObj[headingVal].OutletIds)
      // var n = wholemonthDatesObj[headingVal].OutletIds.split(',');
      // var s = '';

      // n.forEach(itmm1 => {
      //   allBeats.forEach(itmm => {
      //     if (itmm1 == itmm.Outlets.Id) {
      //       if (s != '') {
      //         s += ` , ${itmm.Outlets.OutletName}`;
      //       } else {
      //         s = itmm.Outlets.OutletName;
      //       }
      //     }
      //   });
      // });
      setBeatforShow(wholemonthDatesObj[headingVal].TpOutlets);

    }

    if (headingVal.split(',')[0] == 'Sun') {
      // console.log("SUNDAY LINE 86===,,,,,>", headingVal.split(',')[0], headingVal)
      setBeatforShow('Sunday');
      Animated.timing(animationHeight, {
        duration: 0,
        toValue: 20,
      });
    }
    else if (navigateFor === 'createTour' && wholemonthDatesObj[headingVal].TpState != '' && wholemonthDatesObj[headingVal].TpState != null && (wholemonthDatesObj[headingVal].OutletIds == '' || wholemonthDatesObj[headingVal].OutletIds == null)) {
      // alert(headingVal+'----'+wholemonthDatesObj[headingVal].TpState)
      setBeatforShow(wholemonthDatesObj[headingVal].TpState)
    }
    setRefresh(!refresh);
  }, [beatObj]);

  const toggleCollapsed = () => {
    // setCollapsed(!collapsed);
    console.log("Beats Line 103=======", allBeats)
    var dateInPast = function (firstDate, secondDate) {
      if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
        return true;
      }
      return false;
    };

    var past = new Date(headingVal);
    var t = dateInPast(new Date(past), new Date());
    //  Return True if past date is smaller than today Date

    var past = new Date(headingVal);

    console.log('++++++++Paset', past);
    console.log('++++++++headingVal', headingVal);
    console.log(
      'dateInPast(new Date(past),new Date()====',
      dateInPast(new Date(past), new Date()),
    );
    var t = dateInPast(new Date(past), new Date());
    // alert(t)

    if (headingVal.split(',')[0] === 'Sun') {
      setBeatforShow('Sunday');
      Animated.timing(animationHeight, {
        duration: 0,
        toValue: 20,
      });
    }
    else if (t) {
      Animated.timing(animationHeight, {
        duration: 0,
        toValue: 20,
      })
    }
    else {
      Animated.timing(animationHeight, {
        duration: 0,
        toValue: 500,
      }).start();
      setIsBeatVisible(true);
      setCollapsed(!collapsed);
    }

  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 0,
      toValue: 40,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 0,
      toValue: 500,
    }).start();
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
      setRefresh(!refresh);
    }
  }, [collapsed]);

  useEffect(() => {
    try {
      // console.log("navigateFor Line 180",navigateFor)
      // console.log("wholemonthDatesObj[headingVal].BeatId 181",wholemonthDatesObj[headingVal].BeatId)

      //  if (navigateFor === 'editTour') {
      console.log(
        'beatObj[wholemonthDatesObj[headingVal].OutletIds]===',
        beatObj[wholemonthDatesObj[headingVal].OutletIds],
      );
      if (
        wholemonthDatesObj[headingVal].OutletIds != '' &&
        wholemonthDatesObj[headingVal].OutletIds != null
      ) {
        console.log('Inside If');
        var a = wholemonthDatesObj[headingVal].OutletIds.split(',');
        let obj = {
          TpId: wholemonthDatesObj[headingVal].TpId,
          TpDate: formatDate(headingVal),
          BeatId: wholemonthDatesObj[headingVal].BeatId,
          OutletIds: a,
          TpState: wholemonthDatesObj[headingVal].TpState,
          TpRemark: '',
        };
        store.dispatch({
          type: 'ADD_ROSTER_PLANS_FINALE',
          payload: [headingVal, obj],
        });
        // setBeatforShow(beatObj[wholemonthDatesObj[headingVal].BeatId]);
        // setRefreshNew(!refreshNew)
        collapseView();
        setBeatforShow(wholemonthDatesObj[headingVal].TpOutlets)
      }
      //if Event Selected
      else if (wholemonthDatesObj[headingVal].TpState != '' && wholemonthDatesObj[headingVal].TpState != null) {
        // console.log("Inside Else If---")
        let obj = {
          TpId: wholemonthDatesObj[headingVal].TpId,
          TpDate: formatDate(headingVal),
          BeatId: null,
          OutletIds: '',
          TpState: wholemonthDatesObj[headingVal].TpState,
          TpRemark: '',
        };

        store.dispatch({
          type: 'ADD_ROSTER_PLANS',
          payload: [headingVal, obj],
        });
        setBeatforShow(wholemonthDatesObj[headingVal].TpState);
        collapseView();
      } else {
        console.log('Inside ELse====');
        let obj = {
          TpId: wholemonthDatesObj[headingVal].TpId,
          TpDate: formatDate(headingVal),
          BeatId: null,
          OutletIds: '',
          TpState: wholemonthDatesObj[headingVal].TpState,
          TpRemark: '',
        };
        store.dispatch({
          type: 'ADD_ROSTER_PLANS',
          payload: [headingVal, obj],
        });
        setBeatforShow('Select');
      }
      collapseView();
      setTRefresh(!tRefresh);
      // }else{
      //   if (
      //     wholemonthDatesObj[headingVal].OutletIds != '' &&
      //     wholemonthDatesObj[headingVal].OutletIds != null
      //   ){
      //    setBeatforShow(wholemonthDatesObj[headingVal].TpOutlets);
      //   }
      // }
    } catch (e) {
      // alert("HII In Catch")
    }
    setRefresh(!refresh);
  }, []);

  const handleSelectBeat = itm => {


    if (navigateFor == 'createTour') {
      setChecked(true);

      let obj = {
        TpId: wholemonthDatesObj[headingVal].TpId,
        TpDate: formatDate(headingVal),
        BeatId: '',
        OutletIds: `${itm.Outlets.Id}`,
        TpState: 'RosterPlan',
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_ROSTER_PLANS',
        payload: [headingVal, obj],
      });

      setBeatforShow(itm.Outlets.OutletName);
      // setCollapsed(!collapsed);
    } else {
      let obj = {
        TpId: wholemonthDatesObj[headingVal].TpId,
        TpDate: formatDate(headingVal),
        BeatId: null,
        OutletIds: `${itm.Outlets.Id}`,
        TpState: 'RosterPlan',
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_ROSTER_PLANS',
        payload: [headingVal, obj],
      });
      setBeatforShow(itm.Outlets.OutletName);
      // setCollapsed(!collapsed);
    }
  };


  var tempTPId = '';
  try {
    tempTPId = wholemonthDatesObj[headingVal].TpId;
  } catch (e) {
    tempTPId = '';
  }
  var k = beatforshow;
  console.log("headingVal===>", headingVal, beatforshow)

  return (
    <>
      <TouchableOpacity onPress={toggleCollapsed} style={styles.MainVIew2}>
        <View style={styles.itemV}>
          <Animated.View style={{ maxHeight: animationHeight ,backgroundColor: themecolor.BOXTHEMECOLOR }}>
            <Text style={styles.paragraph} numberOfLines={maxLines}>
              <View style={{...styles.mainviewselect,backgroundColor: themecolor.BOXTHEMECOLOR , borderColor: themecolor.BOXBORDERCOLOR1,}}>
                <View style={styles.TC}>
                  {/* <View style={{width:40,padding:0}}> */}
                  <Text style={{ ...styles.List,  left: 10, top: 10, backgroundColor: themecolor.BOXTHEMECOLOR, color: themecolor.TXTWHITE, }}>{beatforshow}</Text>
                  {/* </View> */}
                  <FAIcon
                    name="caret-down"
                    size={20}
                    style={{
                      // color: '#000',
                      color: themecolor.TXTWHITE,
                      alignSelf: 'flex-end',
                      justifyContent: 'flex-end',
                      top: -10,
                    }}
                  />
                </View>
                {
                  isBeatVisible ?
                    <FlatList
                      data={allBeats}
                      renderItem={({ item }) => {
                        var temporary = false;
                        try {
                          if (
                            RoasterPlans[headingVal].OutletIds.includes(
                              `${item.Outlets.Id}`,
                            )
                          ) {
                            temporary = true;
                          }
                        } catch (e) {
                          console.log("catch Line 350===>", e)
                          temporary = false;
                        }

                        return (
                          <View style={styles.CHECBOX}>
                            <Checkbox
                              value={checked}
                              tintColors={{ true: Colors.bluetheme, false: 'black',  }}
                              // style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                              color={Colors.bluetheme}
                              uncheckedColor={Colors.lightgrey}
                              status={temporary ? 'checked' : 'unchecked'}
                              onPress={() => handleSelectBeat(item)}
                            />
                            <TouchableOpacity
                              style={styles.TC}
                            // onPress={() =>handleSelectBeat(item)}
                            >
                              <Text style={{ ...styles.List, lineHeight: 30, color: themecolor.TXTWHITE, }}>
                                {item.Outlets.OutletName}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                      showsVerticalScrollIndicator={false}
                    />
                    : <></>}
              </View>
            </Text>

            <Selector
              eventTypes={eventTypes}
              setBeatforShow={setBeatforShow}
              wholemonthDatesObj={wholemonthDatesObj}
              headingVal={headingVal}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              navigateFor={navigateFor}
              TPID={tempTPId}
            />
            <View style={{ marginVertical: 5 }} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default function Custom(props, { item }) {
  var data = [];
  const {
    allBeats,
    eventTypes,
    wholemonthDatesObj,
    renderFor,
    refresh,
    setRefresh,
    beatObj,
  } = props;
  const [tRefresh, setTRefresh] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [g, s] = React.useState([]);

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()


  React.useEffect(() => {
    s(props.data);
  }, [props]);

  return (
    <View style={{ flex: 1 ,}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {g.map(i => {
          return (
            <>
              <Text style={{...styles.List,color: themecolor.TXTWHITE}}>{i}</Text>
              <Item
                item={item}
                props={props}
                headingVal={i}
                allBeats={allBeats}
                eventTypes={eventTypes}
                wholemonthDatesObj={wholemonthDatesObj}
                navigateFor={renderFor}
                refresh={refresh}
                setRefresh={setRefresh}
                setTRefresh={setTRefresh}
                tRefresh={tRefresh}
                beatObj={beatObj}
                setChecked={setChecked}
                checked={checked}
              />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}

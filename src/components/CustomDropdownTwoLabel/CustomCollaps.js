import React, { useRef, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ScrollView,
  Animated
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomSelectComponent from '../CreateTourPlan/CustomSelectComponent';
import styles from '../../assets/css/styleCreateTour';
import { store } from '../../../App';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

function Item({ allBeats, eventTypes, wholemonthDatesObj, headingVal, navigateFor, tRefresh, setTRefresh, beatObj, themecolor }) {
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const [beatforshow, setBeatforShow] = useState('Select');
  // const [beatOpacity, setBeatOpacity] = useState(true);
  const animationHeight = useRef(new Animated.Value(0)).current;

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
    // alert(navigateFor)
    if (navigateFor === 'editTour' && wholemonthDatesObj[headingVal].BeatId != '') {
      // console.log("163,", beatObj[wholemonthDatesObj[headingVal].BeatId])
      setBeatforShow(beatObj[wholemonthDatesObj[headingVal].BeatId])
    }
    else if (wholemonthDatesObj[headingVal].TpState != '' && wholemonthDatesObj[headingVal].TpState != null && wholemonthDatesObj[headingVal].BeatId == '') {
      // console.log("Line 43---->,",wholemonthDatesObj[headingVal].TpState)
      setBeatforShow(wholemonthDatesObj[headingVal].TpState)
      /////New code for Manager Start         
      let obj = {
        TpId: wholemonthDatesObj[headingVal].TpId,
        TpDate: formatDate(headingVal),
        BeatId: null,
        OutletIds: '',
        TpState: wholemonthDatesObj[headingVal].TpState,
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_TOUR_PLANS',
        payload: [headingVal, obj],
      });

      /////New code for Manager E
      // alert(wholemonthDatesObj[headingVal].TpState)
    }

    if (headingVal.split(",")[0] == "Sun") {
      setBeatforShow("Sunday");
      Animated.timing(animationHeight, {
        duration: 0,
        toValue: 20,
      })
    }
  }, [beatObj, beatforshow])


  const toggleCollapsed = () => {
    // if (empId == undefined) {
    // alert("Hii")
    var dateInPast = function (firstDate, secondDate) {
      if (firstDate.setHours(0, 0, 0, 0) < secondDate.setHours(0, 0, 0, 0)) {
        return true;
      }

      return false;
    }
    var past = new Date(headingVal)
    var t = dateInPast(new Date(past), new Date());
    //  Return True if past date is smaller than today Date   
    var past = new Date(headingVal)
    // console.log("++++++++Paset", past)
    // console.log("++++++++headingVal", headingVal)
    // console.log("dateInPast(new Date(past),new Date()====", dateInPast(new Date(past), new Date()))
    var t = dateInPast(new Date(past), new Date());
    if (headingVal.split(",")[0] === "Sun") {

      setBeatforShow("Sunday");
      Animated.timing(animationHeight, {
        duration: 0,
        toValue: 20,
      })
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
      setCollapsed(!collapsed);
    }
    // } else {
    //   Animated.timing(animationHeight, {
    //     duration: 0,
    //     toValue: 500,
    //   })
    // }
    // setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 0,
      toValue: 40,
    }).start();
  };

  const expandView = async () => {
    // alert("hii")
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 0,
      toValue: 500,
    }).start();
  }

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);


  useEffect(() => {
    try {
      // console.log("navigateFor Line 180",navigateFor)
      // console.log("wholemonthDatesObj[headingVal].BeatId 181",wholemonthDatesObj[headingVal].BeatId)
      if (navigateFor === 'editTour') {
        // console.log("beatObj[wholemonthDatesObj[headingVal].BeatId]===", beatObj[wholemonthDatesObj[headingVal].BeatId])
        if (wholemonthDatesObj[headingVal].BeatId != '') {
          console.log("Inside If")
          let obj = {
            TpId: wholemonthDatesObj[headingVal].TpId,
            TpDate: formatDate(headingVal),
            BeatId: wholemonthDatesObj[headingVal].BeatId,
            OutletIds: '',
            TpState: wholemonthDatesObj[headingVal].TpState,
            TpRemark: '',
          };
          store.dispatch({ type: 'ADD_TOUR_PLANS', payload: [headingVal, obj] });
          collapseView();
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

          store.dispatch({ type: 'ADD_TOUR_PLANS', payload: [headingVal, obj] });
          console.log("241,", wholemonthDatesObj[headingVal].TpState)
          setBeatforShow(wholemonthDatesObj[headingVal].TpState);
          collapseView();
        } else {
          console.log("Inside ELse====")
          let obj = {
            TpId: wholemonthDatesObj[headingVal].TpId,
            TpDate: formatDate(headingVal),
            BeatId: null,
            OutletIds: '',
            TpState: wholemonthDatesObj[headingVal].TpState,
            TpRemark: '',
          };
          store.dispatch({ type: 'ADD_TOUR_PLANS', payload: [headingVal, obj] });
          // setBeatforShow(wholemonthDatesObj[headingVal].TpState);
          // setCollapsed(!collapsed)
        }
        // setCollapsed(!collapsed);
        // setRefreshNew(!refreshNew) 
        //  setRefresh(!refresh) 
        collapseView();
        setTRefresh(!tRefresh);
      } else {
        console.log("wholemonthDatesObj[headingVal].BeatId==>", wholemonthDatesObj[headingVal].BeatId)
        if (wholemonthDatesObj[headingVal].BeatId != "" && wholemonthDatesObj[headingVal].BeatId != null) {
          setBeatforShow(wholemonthDatesObj[headingVal].BeatName);
          // setBeatforShow(wholemonthDatesObj[headingVal].BeatId);
          /////New code for Manager Start         
          let obj = {
            TpId: wholemonthDatesObj[headingVal].TpId,
            TpDate: formatDate(headingVal),
            BeatId: wholemonthDatesObj[headingVal].BeatId,
            OutletIds: '',
            TpState: "FieldWork",
            TpRemark: '',
          };

          store.dispatch({
            type: 'ADD_TOUR_PLANS',
            payload: [headingVal, obj],
          });

          /////New code for Manager End
        }
      }
    } catch (e) {

    }
  }, [])

 
  const handleSelectBeat = (itm) => {
    if (navigateFor == 'createTour') {
      let obj = {
        TpId: wholemonthDatesObj[headingVal].TpId,
        TpDate: formatDate(headingVal),
        BeatId: itm.BeatId,
        OutletIds: '',
        TpState: "FieldWork",
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_TOUR_PLANS',
        payload: [headingVal, obj],
      });

      setBeatforShow(itm.BeatName)
      setCollapsed(!collapsed);
    }

    else {
      let obj = {
        TpId: wholemonthDatesObj[headingVal].TpId,
        TpDate: formatDate(headingVal),
        BeatId: itm.BeatId,
        OutletIds: '',
        TpState: "FieldWork",
        TpRemark: '',
      };

      store.dispatch({
        type: 'ADD_TOUR_PLANS',
        payload: [headingVal, obj],
      });
      setBeatforShow(itm.BeatName);
      setCollapsed(!collapsed);
    }

  }

  var tempTPId = 0;
  try {
    tempTPId = wholemonthDatesObj[headingVal].TpId
  } catch (e) {
    tempTPId = 0
  }

  // console.log(`beatforshow----${beatforshow},headingVal====${headingVal}`);

  return (
    <>

      <TouchableOpacity onPress={toggleCollapsed} style={styles.MainVIew2}>
        <View style={{...styles.itemV,backgroundColor:themecolor.BOXTHEMECOLOR}}>
          <Animated.View style={{ maxHeight: animationHeight }}>
            <Text style={{...styles.paragraph,color:themecolor.TXTWHITE}} numberOfLines={maxLines}>
              <View style={{...styles.mainviewselect,backgroundColor:themecolor.BOXTHEMECOLOR}}>
                <View style={styles.TC}>
                  <Text style={{ ...styles.List, top: 10,color:themecolor.TXTWHITE }}>{beatforshow}</Text>
                  <FAIcon name="caret-down" size={20} style={{ color:themecolor.TXTWHITE, alignSelf: 'flex-end', justifyContent: 'flex-end', top: -10 }} />
                </View>
              </View>
              <FlatList
                data={allBeats}
                renderItem={({ item }) => {
                  // console.log(item.BeatName)
                  return (
                    <View>
                      <TouchableOpacity style={styles.TC} onPress={() => handleSelectBeat(item)}>
                        <Text
                          style={{ ...styles.List, lineHeight: 30,color:themecolor.TXTWHITE }}>
                          {item.BeatName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
              />
            </Text>
            <CustomSelectComponent eventTypes={eventTypes} setBeatforShow={setBeatforShow} wholemonthDatesObj={wholemonthDatesObj}
              headingVal={headingVal}
              setCollapsed={setCollapsed} collapsed={collapsed} navigateFor={navigateFor} TPID={tempTPId} />
            <View style={{ marginVertical: 5 }} />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={toggleCollapsed} style={styles.MainVIew2}
>>>>>>> 0559736b86d6e43f58013deae6d3f0886844d798
    
    >
      <View style={styles.itemV}>
        <Animated.View style={{ maxHeight: animationHeight }}>
          <Text style={styles.paragraph} numberOfLines={maxLines}>
            <View style={{...styles.MainView}}>
              <View style={styles.TC}>
                <Text style={{ ...styles.List, top: 10,left:30 }}>{beatforshow}</Text>
                <FAIcon name="caret-down" size={20} style={styles.IconRight} />
              </View>
            </View>
            <FlatList
              data={allBeats}
              renderItem={({ item }) => {
                // console.log(item.BeatName)
                return (
                  <View>
                    <TouchableOpacity style={styles.TC} onPress={() =>handleSelectBeat(item)}>
                      <Text
                        style={{ ...styles.List, lineHeight: 30 }}>
                        {item.BeatName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
           
          </Text>

          <CustomSelectComponent eventTypes={eventTypes} setBeatforShow={setBeatforShow} wholemonthDatesObj={wholemonthDatesObj} 
          headingVal={headingVal}
          setCollapsed={setCollapsed} collapsed={collapsed} navigateFor={navigateFor} TPID={tempTPId}/>
          <View style={{ marginVertical: 5 }} />
        </Animated.View>
      </View>
    </TouchableOpacity> */}
    </>
  );
}

export default function CustomCollaps(props, { item }) {
  // var data = []
  const { allBeats, eventTypes, wholemonthDatesObj, renderFor, refresh, setRefresh, beatObj } = props;
  const [tRefresh, setTRefresh] = React.useState(false);
  const [g, s] = React.useState([]);
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  React.useEffect(() => {
    s(props.data)

  }, [props,])

  return (
    <View style={{ flex: 1, }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        {g.map((i) => {
          return (
            <>
              <Text style={{ ...styles.List, color:themecolor.TXTWHITE }}>{i}</Text>
              <Item item={item} props={props}
                headingVal={i}
                allBeats={allBeats} eventTypes={eventTypes}
                wholemonthDatesObj={wholemonthDatesObj}
                navigateFor={renderFor}
                refresh={refresh}
                setRefresh={setRefresh}
                setTRefresh={setTRefresh}
                tRefresh={tRefresh}
                beatObj={beatObj}
                empId={props.empId}
                themecolor={themecolor}
              />
            </>
          )
        })}

      </ScrollView>
    </View>
  );
}
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import Carousel from 'react-native-banner-carousel';
import { useToast } from 'react-native-toast-notifications';
import StyleCss from '../../assets/css/styleCarousal';
import { db } from '../../helper/SQLite DB/Sqlite';
import { gettripLocationApi } from '../../repository/trip/tripRepository';
import { AbortController } from 'native-abort-controller'
// import useToastComponent from './useToastComponent';

// const controller = new AbortController()
// const signal = controller.signal
// signal.addEventListener('abort', () => {
//     console.log('aborted!')
// })

// controller.abort()
const { width, height } = Dimensions.get('window');


const DATAS = [
  {
    name: 'No Birthdays Today',
    OutletContactName: '',
    OutletContactBday: '',
    OutletContactAnniversary: '',
  },
];



export default function CarouselList(props) {
  const mode = useSelector(state => state.mode);
  const controller = new AbortController()
  const signal = controller.signal

  signal.addEventListener('abort', () => {
    console.log('aborted!')
  })

  const themecolor = new MyThemeClass(mode).getThemeColor()
  const toast = useToast()
  const navigation = useNavigation();



  const [carouseldata, setCarousalData] = useState([]);
  const [carouseldata1, setCarousalData1] = useState([]);

  function Renderimage({ item, index }) {
    const bday = item.OutletContactBday.split('-');
    const bmm = bday[1];
    const bdd = bday[2];
    var anni = []
    try {
      anni = item.OutletContactAnniversary.split('-');
    } catch (e) {
      anni = []
    }
    const amm = anni[1];
    const add = anni[2];

    const d = new Date();
    const pmm = d.getMonth() + 1;
    const pdd = d.getDate();

    var arr = [];
    if (bmm == pmm && bdd == pdd && amm == pmm && add == pdd) {
      arr.push('Birthday & Anniversary Reminder');
    } else {
      if (bmm == pmm && bdd == pdd) {
        arr.push('Birthday Reminder');
      } else if (amm == pmm && add == pdd) {
        arr.push('Anniversary Reminder');
      } else {
        arr.push('No birthdays/Anniversaries Today');
      }
    }
    var bday_annni = arr[0];

    const handleGotoOutlet = async image => {
      // alert(image)
      try {
        await db.transaction(async tx => {
          await tx.executeSql(`select * from Outlets`, [], (tx, results) => {
            console.log('result Line 141--->', results.rows.length);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            if (temp.length > 0) {
              var k = false;
              console.log("Bady Outlet Id ", item.Id)
              temp.forEach(d => {
                console.log("All local Outlet Ids ", d.Id)
                if (d.Id === item.Id) {
                  k = true
                }
              })
              if (k) {
                navigation.navigate('OutletView', { item: image });
              } else {
                toast.show('Please sync your data first Or there is no mapping for this outlet', {
                  type: 'warning',
                  placement: 'bottom',
                  duration: 3000,
                  offset: 30,
                  animationType: 'slide-in',
                });

              }

            } else {
              toast.show('Please sync your data first', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                offset: 30,
                animationType: 'slide-in',
              });
            }
            // console.log(
            //   'Data returned From CarousalDataList SQLITE ine 78 ----->',
            //   temp,
            // );
          });
        });
      } catch (e) {
        console.log('Err in cathc line 82 in carousalData==', e);
      }
    };

    var imgsrc = '';
    if (bday_annni == 'Birthday Reminder') {
      imgsrc = require('../../assets/images/dashboard/birthday.png');
    } else if (bday_annni == 'Anniversary Reminder') {
      imgsrc = require('../../assets/images/dashboard/anniversary.png');
    } else {
      imgsrc = require('../../assets/images/dashboard/bdayanni.png');
    }

    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ ...StyleCss.RenderImageView, borderColor: themecolor.BOXBORDERCOLOR1 }}
          onPress={() => handleGotoOutlet(item)}>
          <View style={{ ...StyleCss.RenderImageView2, backgroundColor: themecolor.BOXTHEMECOLOR }}>
            <View style={StyleCss.Width2}>
              <View
                style={{
                  backgroundColor: '#fef2db',
                  borderRadius: 50,
                  width: 60,
                  height: 60,
                  left: 5,
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}
                  source={imgsrc}
                  resizeMode={'contain'}
                />
              </View>
            </View>
            <View style={StyleCss.Width65}>
              <Text style={{ ...StyleCss.SliderHeading, color: themecolor.TXTWHITE }}>{bday_annni}</Text>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                {item.OutletContactName == '' ? (
                  <></>
                ) : (
                  <Text style={{ ...StyleCss.SliderHeading2, color: themecolor.TXTWHITE }}>
                    <Text style={{ ...StyleCss.carotext, color: themecolor.TXTWHITE }}>
                      {item.OutletContactName}
                    </Text>{' '}
                    from{' '}
                    <Text style={{ ...StyleCss.carotext, color: themecolor.TXTWHITE }}>{item.OutletName}</Text> has{' '}

                    {bday_annni == 'Birthday Reminder' && 'Birthday'}
                    {bday_annni == 'Anniversary Reminder' && 'Anniversary'}
                    {bday_annni == 'Birthday & Anniversary Reminder' &&
                      ' Birthday and Anniversary'}{' '}
                    today. Please wish{' '}
                    {(item.OutletSalutation.toLowerCase() == 'mr.' || item.OutletSalutation.toLowerCase() == 'mr') ? 'him' : 'her'}.
                  </Text>
                )}
              </View>
            </View>
            {/* <View style={StyleCss.SLiderBorder} /> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // Carousel List Start
  const fetchBirthdays = async () => {

    const result = await gettripLocationApi('api/getBirthdayReminders');
    console.log("birthday data is :", result)
    var cdata = [];
    if (result.data.length < 1) {
      cdata = DATAS;
      props.setCarouselStatus(false);
    } else {
      cdata = result.data;
    }
    setCarousalData(cdata);
    const carouseldata1 = cdata.filter((i) => {
      return i.Id == props.outletId
    })
    setCarousalData1(carouseldata1)
    setCarousalData1([]);
  };

  useEffect(() => {
    try {
      fetchBirthdays();
    } catch (err) {
      console.log("Errrrrrrrooorrr==>>>  ", err)
    }
  }, []);

  return (
    <>
      {props.outletId != undefined ? (
        carouseldata1.map(item => {
          if (item.Id === props.outletId) {
            return (
              <View style={{ width: width * 0.94 }}>
                <Carousel
                  autoplay={true}
                  autoplayTimeout={1000}
                  loop
                  index={0}
                  showsPageIndicator={false}
                  pageSize={(width, height)}>
                  {carouseldata1.map((item, index) => <Renderimage item={item} key={index} index={index} />)}
                </Carousel>
              </View>
            );
          } else {
            <></>;
          }
        })
      ) : (
        <View
          style={{
            width: width * 0.94,
            justifyContent: 'center',
            position: 'absolute',
            marginVertical: 100,
            alignSelf: 'center',
          }}>
          <Carousel
            autoplay={false}
            autoplayTimeout={3000}
            loop
            index={0}
            pageSize={(width, height)}>
            {carouseldata.map((item, index) => <Renderimage key={index} item={item} index={index} />)}
          </Carousel>
        </View>
      )}
    </>
  )
}

// Carousel List End

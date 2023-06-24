import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import React from 'react';
import styles from '../../assets/css/stylesBeat';
import { DistributerListBeat } from '../../components/Beat_outlet/DistributerBeatComponent';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'Beatdump.db' });
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function DistributerStore(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("props in DistributorStore--->",props.route.params.primaryOutletData)
  const [outletData, setOutletData] = React.useState({});

  React.useEffect( () => {
    async function temp() {

    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT POut.*,Outyp.* FROM PrimaryOutlets as POut join OutletsTypes as Outyp on POut.OutlettypeId=Outyp.OutlettypeId where POut.Id='${props.route.params.primaryOutletData.Id}'`
          , [], (tx, results) => {
            console.log('errr', tx);
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }

            setOutletData(temp[0])
            console.log('Data returned From PrimaryOutlets  SQLITE -----> 427', temp);
          });
      });
    } catch (e) {
      alert(e);
    }
  }
  temp();
  }, [])

  return (
    <View style={{...styles.StoreFlex,backgroundColor: themecolor.THEMECOLOR}}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={styles.FlexMainView}>
        <ImageBackground
          resizeMode="cover"
          style={styles.BGBG}
          source={require('../../assets/images/addoutlet/shop3.jpg')}>
          <View
            style={styles.BGBottonText}>
            <View
              style={styles.FLexJ}>
              <View
                style={styles.FlexJ2}>
                <TouchableOpacity
                  style={{}}
                  activeOpacity={0.5}
                  onPress={() => props.navigation.goBack()}>
                  <Image
                    source={require('../../assets/images/back.png')}
                    style={styles.BackIcon1}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
                <Text
                  style={styles.HeadingText}>
                  {outletData.OutletName}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={styles.TypeText}>
            <View style={styles.DIstributerTypeBottom}>
              <View style={{}}>
                <Text
                  style={styles.T1}>
                  Type
                </Text>
                <Text style={styles.T2}>
                  {outletData.OutlettypeName}
                </Text>
              </View>

              {outletData.OutletClassification != null ?
                (
                  <View style={{}}>
                    <Text
                      style={styles.T1}>
                      Chanel Category
                    </Text>
                    {
                      outletData.OutletClassification != null ?
                        (
                          <Text style={styles.ChenelCategoryText}>
                            {outletData.OutletClassification}
                          </Text>
                        ) : (
                          <>
                          </>
                        )
                    }
                  </View>
                ) : (<></>)}
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.MT10} />
      <View
        style={{...styles.NewView, backgroundColor:themecolor.THEMECOLOR}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DistributerListBeat data={[outletData]} />
          <View style={styles.MT10} />
        </ScrollView>
      </View>
    </View>
  );
};

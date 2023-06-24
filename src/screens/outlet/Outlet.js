import { StatusBar, View, Text, TextInput, Dimensions } from 'react-native';
import React from 'react';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleCalls';
import NewOutletList from './NewOutletsList';
import { db } from '../../helper/SQLite DB/Sqlite';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { FontFamily } from '../../assets/fonts/FontFamily';

const { width, height } = Dimensions.get('screen');
export default function Outlets(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  const [Outlets, setOutlets] = React.useState([]);
  const [searchOutlets, setSearchOutlets] = React.useState([]);


  const filtering = async search => {
    console.log('searching txt', search);
    var temp = searchOutlets.filter(item => {
      return item.OutletName.toLowerCase().includes(search.toLowerCase());
    });
    setOutlets(temp);
  };

  // const fetchAllOutlets = async () => {
  //   // ------> Outlets getting from Table Outlets Start *******
  //   try {
  //     await db.transaction(async tx => {
  //       await tx.executeSql(
  //         `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId`,
  //         [],
  //         async (tx, results) => {
  //           console.log('errr', tx);
  //           console.log('result Line 141--->', results);
  //           var temp = [];
  //           for (let i = 0; i < results.rows.length; ++i) {
  //             temp.push(results.rows.item(i));
  //           }
  //           console.log(
  //             'Data returned From Outlets SQLITE In AirporteRoute Line 572----->',
  //             temp,
  //           );
  //           setOutlets(temp);
  //           setSearchOutlets(temp);
  //         },
  //       );
  //     });
  //   } catch (e) {
  //     alert('Error in AirporteRoute in Catch Line 577', e);
  //   }
  // };

  React.useEffect(() => {
    fetchAllOutlets();
  }, []);

  const fetchAllOutlets = async () => {
    // ------> Outlets getting from Table Outlets Start *******
    try {
      await db.transaction(async tx => {
        await tx.executeSql(
          `SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId`,
          [],
          async (tx, results) => {
            console.log('errr', tx);
            console.log('result Line 141--->', results);
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i) {
              temp.push(results.rows.item(i));
            }
            console.log(
              'Data returned From Outlets SQLITE In AirporteRoute Line 572----->',
              temp,
            );
            setOutlets(temp);
            setSearchOutlets(temp);
          },
        );
      });
    } catch (e) {
      alert('Error in AirporteRoute in Catch Line 577', e);
    }
  };

  React.useEffect(() => {
    fetchAllOutlets();
  }, []);

  return (
    <View style={{ ...styles.MainView, backgroundColor: themecolor.THEMECOLOR }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Header_2
          title={'Outlets'}
          // iconname="filter" Size={18}
          onPress={() => props.navigation.goBack()}
        />
      </View>
      <View style={{ marginTop: 6 }} />

      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: themecolor.BOXTHEMECOLOR,
          borderColor: themecolor.BOXBORDERCOLOR1,
          borderWidth: 0.5,
          width: width * 0.94,
          alignSelf: 'center'
        }}>
        <Text style={{ paddingHorizontal: 10 }}>
          <FIcon name="search" size={15} color={themecolor.AV2} />
        </Text>
        <TextInput
          onChangeText={text => filtering(text)}
          placeholder="Search"
          style={{
            width: width * 0.8,
            fontFamily: FontFamily.PopinsRegular,
            color: themecolor.AV2
          }}
          placeholderTextColor={themecolor.AV2}
        />
      </View>


      <NewOutletList
        props={props}
        beatOutlet={Outlets}
        navigateFrom={props.navigateFrom}
      />
    </View>
  );
}

import {
  StatusBar,
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView
} from 'react-native';
import React from 'react';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Header_2 from '../../components/shared/Header_2';
import styles from '../../assets/css/styleCalls';
import PrimaryOutletList from './PrimaryOutletList';
import { db } from '../../helper/SQLite DB/Sqlite';
const { width } = Dimensions.get('screen');

export default function PrimaryOrders(props) {
  const [Outlets, setOutlets] = React.useState([]);
  const [searchOutlets, setSearchOutlets] = React.useState([]);
  // const [OutletType, setOutletType] = React.useState('');


  const filtering = async (search) => {
    console.log("searching txt", search);
    var temp = searchOutlets.filter(item => {
      return (
        item.OutletName.toLowerCase().includes(search.toLowerCase())
      )
    })
    setOutlets(temp);
  }


  const fetchAllOutlets = async () => {
    // ------> Outlets getting from Table Outlets Start ******* 
    try {
      await db.transaction(async tx => {
        await tx.executeSql(`SELECT Out.*,Outyp.* FROM Outlets as Out join OutletsTypes as Outyp on Out.OutlettypeId=Outyp.OutlettypeId`, [], async (tx, results) => {
          console.log('errr', tx);
          console.log('result Line 141--->', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          console.log('Data returned From Outlets SQLITE In AirporteRoute Line 572----->', temp);
          setOutlets(temp);
          setSearchOutlets(temp);
        });
      });
    } catch (e) {
      alert("Error in AirporteRoute in Catch Line 577", e);
    }

  }

  React.useEffect(() => {
    fetchAllOutlets()
  }, [])

  return (
    <View style={styles.MainView}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <Header_2 title={"Outlets"}
          // iconname="filter" Size={18}
          onPress={() => props.navigation.goBack()} />
      </View>
      <View style={{marginTop:7}}>
        <View style={{ ...styles.SearchInputView, width: width * 0.95 }}>
          <Text style={styles.PH10}>
            <FIcon name="search" size={15} />
          </Text>
          <TextInput
            onChangeText={text => filtering(text)}
            placeholder="Search Outlets" style={styles.InputText} />
        </View>
      </View>
      <ScrollView style={{padding:10}}>
        <PrimaryOutletList props={props} beatOutlet={Outlets} navigateFrom={props.navigateFrom} />
      </ScrollView>
    </View>
  )
}
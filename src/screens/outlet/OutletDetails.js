import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import React from 'react';
import { Colors } from '../../assets/config/Colors';
import styles from '../../assets/css/stylesBeat';
const { width } = Dimensions.get('window');
import { FlatListActionList1 } from '../../components/shared/BeatComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getOutletById } from '../../repository/beat Planning/beatPlaningRepository';

export default function OutletDetails(props) {

  const [outletData, setOutletData] = React.useState([]);
  // const [allOutletTypes, setAllOutletTypes] = React.useState([]);
  const [outletType, setOutletType] = React.useState('');
  const [outletFirstDistributor, setOutletFirstDistributor] = React.useState('');

  React.useEffect(() => {
    fetchOutletById();
  }, [])

  const fetchOutletById = async () => {
    let res = await getOutletById(props.route.params.id);
    if (res.statusCode == 200) {
      setOutletData(res.data.Outlets[props.route.params.id]);
      res.data.Outlets[props.route.params.id].forEach(item => {
        res.data.OutletTypes.forEach(item1 => {
          if (item.OutlettypeId == item1.OutlettypeId) {
            console.log("OutlettypeName---->", item1.OutlettypeName);
            setOutletType(item1.OutlettypeName);
          }
        })//End of inner Loop  
      })//End of Outer loop

      //******* A Loop for getting Distributor ********/
      Object.values(res.data.PrimaryOutlets).map(item => {
        console.log("item -----> 49", item);
        let outletGrade = '';
        outletGrade = item[0].OutletClassification != null ? `- ${item[0].OutletClassification}` : ''
        setOutletFirstDistributor(`${item[0].OutletContactName}${outletGrade}`);
      })

    } else {

    }
  }

  return (
    <View style={styles.StoreFlex}>
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
                  {props.route.params.outletName}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.TOP3}
                onPress={() => props.navigation.navigate('VisitHistory')}>
                <Icon name="history" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={styles.TypeText}>
            <View style={styles.TYPETEXT2}>
              <Text
                style={styles.T1}>
                Type
              </Text>
              <Text style={styles.T2}>
                {outletType}
              </Text>
            </View>
            <View style={styles.TYPETEXT2}>
              <Text
                style={styles.T1}>
                Category
              </Text>
              <Text style={{ ...styles.T2, }}>
                {/* EDF or Non-EDF */}
              </Text>
            </View>
            <View style={styles.TYPETEXT2}>
              <Text
                style={styles.T1}>
                Distributer
              </Text>
              <Text style={styles.T2}>
                {outletFirstDistributor}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.MT10} />
      <View
        style={styles.NewView}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Secondary Outlet Details Start*/}
          <FlatListActionList1 props={props} outletData={outletData} />
          {/* Secondary Outlet Details End*/}


          {/* Recent Order Start */}
          {/* <View style={styles.MT10} />
               <RecentOrder /> 
             <RecentOrderData  props={props} />*/}
          {/* Recent Order End */}

          {/* Daily  MTD Sales Start */}
          {/* <View style={{marginVertical: 5}} />
              <SalesView props={props} /> */}
          {/* Daily  MTD Sales End */}


          {/*Last 3 Months Code  */}
          {/* <View style={{marginVertical: 5}} />
              <LastMonthSalesView props={props}  />
              <View style={{marginVertical: 10}} /> */}


          {/* Competitor Analaysis Start */}
          {/*              
              <View>
                <View
                  style={styles.FLexJ}>
                  <View>
                    <Text
                      style={styles.SalesText}>
                      Competitor Analysis
                    </Text>
                  </View>
                  <View
                    style={styles.AddButton}>
                    <Text style={styles.AddButtonIcon}>
                      <ANTIcon5 name="plus" />
                      Add
                    </Text>
                  </View>
                </View>
                <View
                  style={styles.CompetitorView}>
                  <View
                    style={styles.CompetitorView2}>
                    <Text style={styles.CompetitorText}>
                      Competitor
                    </Text>
                    <Text style={styles.CompetitorText}>Product</Text>
                    <Text style={styles.CompetitorText}>Qty</Text>
                    <Text style={styles.CompetitorText}>Remark</Text>
                  </View>
                  <View style={styles.BlankView}></View>
                </View>
              </View> */}

          {/* Competitor Analaysis End */}



          {/* Customer Classification Start */}
          {/* <View style={styles.MT10} />
              <View>
                <View>
                  <Text
                    style={styles.SalesText}>
                    Customer Classification
                  </Text>
                </View>
              <CustomerClassifiedGraph />
              </View> */}
          {/* Customer Classification End */}



          {/* Frequently Ordered Items Start */}
          {/* <View style={styles.MT10} />
              <View>
                   <View>
                    <Text
                      style={styles.SalesText}>
                     Frequently ordered items
                    </Text>
                  </View>
            
                 <View
                  style={styles.FrequetlyView}>
                <FrequentlyOrderItems />
                </View>
              
              
              
              </View>
              <View style={styles.MT10} /> */}
          {/* Frequently Ordered Items Start */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', width: width * 0.93, }}>
            <FullsizeButton width={width * 0.45} backgroundColor={'#54C130'} onPress={() => sumbitMobile()} title='Place order' />
            <FullsizeButton width={width * 0.45} backgroundColor={Colors.bluetheme} onPress={() => sumbitMobile()} title='Check In' />
          </View>
          <View style={{ margin: 15 }} />
        </ScrollView>
      </View>
    </View>
  );
};

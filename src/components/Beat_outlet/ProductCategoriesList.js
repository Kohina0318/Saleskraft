import React, { useEffect ,useState} from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/css/styleProducts';
import { useSelector } from 'react-redux';
import DummyImage from '../shared/DummyImage';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';

function Item({ item, navigateFrom, outletId,themecolor,serverUrl,setServerUrl }) {
  var network = useSelector(state => state.network);
  

  console.log('item #### =======', item.CategoryMedia);
  const navigation = useNavigation();
  // const [productImage, setProductImage] = React.useState('');

  // useEffect(() => {
  //   async function temp() {
  //     if (network) {
  //       try {
  //         if (item.CategoryMedia == '' || item.CategoryMedia == null) {
  //           setProductImage('');
  //         } else {
  //           setProductImage(
  //             // `${await SERVER_URL()}media?id=${item.CategoryMedia}`,
  //              `${await SERVER_URL()}media?id=${item.CategoryMedia}`,
  //           );
  //         }
  //       } catch (e) {
  //         setProductImage('');
  //       }
  //     } else {
  //       setProductImage('');
  //     }
  //   }
  //   temp();
  // }, []);

  useEffect( () => {
    async function temp(){    
    const url = await SERVER_URL()
    setServerUrl(url)
    }
    temp()
    // console.log('server_url is ' + `${url}media?id=${167}`)
  }, [])

  var isNavigateFrom = '';
  try {
    if (navigateFrom == 'action') {
      isNavigateFrom = 'action';
    }
  } catch (e) {
    isNavigateFrom = '';
  }

  return (
    <>
      <View style={{...styles.PLFL,}}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{...styles.TO,borderColor:themecolor.BOXBORDERCOLOR1}}
          onPress={() =>
            navigation.push('BeatOutletProducts', {
              CategoryName: item.CategoryName,
              categoryId: item.Id,
              isNavigateFrom: isNavigateFrom,
              outletId: outletId,
            })
          }>
          <View style={{...styles.PW,backgroundColor:themecolor.BOXTHEMECOLOR,borderColor:themecolor.BOXBORDERCOLOR1}}>
            <View style={styles.Width2}>
             
              {!network || item.CategoryMedia == null || item.CategoryMedia == '' ? (
                <DummyImage width={52} height={52} />
              ) : (
                <Image
                source={{
                  uri: `${serverUrl}media?id=${item.CategoryMedia}`,
                }}
                  style={styles.ProductImage}
                  resizeMode={'contain'}
                />
              )}

            </View>
            <View style={styles.Width7}>
              <Text style={{...styles.PNameText,color:themecolor.TXTWHITE}}>{item.CategoryName}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.MV3} />
    </>
  );
}

export default function ProductCategoriesList(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [serverUrl, setServerUrl] = useState('');
  // console.log('------->', props);
  return (
    <FlatList
      data={props.data}
      renderItem={({ item }) => (
        <Item
          outletId={props.outletId}
          item={item}
          props={props}
          navigateFrom={props.navigateFrom}
          themecolor={themecolor}
          serverUrl={serverUrl}
          setServerUrl={setServerUrl}
        />
      )}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      onEndReached={() => {
        props.getCategoriesFromDB();
      }}
      ListFooterComponent={() => {
        if (props.isLoading) {
          return <ActivityIndicator color={themecolor.TXTWHITE} style={{ margin: 10 }} />;
        } else {
          return null;
        }
      }}
    />
  );
}

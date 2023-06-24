import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import NumericInput from 'react-native-numeric-input'
import styles from '../../assets/css/styleSale';;
import { Colors } from '../../assets/config/Colors';
import DummyImage from '../../components/shared/DummyImage';
import TextTicker from 'react-native-text-ticker';
import { store } from '../../../App';
import { useSelector } from 'react-redux';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
// import { db } from '../../helper/SQLite DB/Sqlite';
const { width } = Dimensions.get('screen');

function CustomerListD({ item, themecolor }) {

  const [qty, setQty] = React.useState(0);
  const [getServerUrl, setServerUrl] = React.useState('');
  var SavesPrice = parseFloat(item.PriceBook.MaxRetailPrice) - parseFloat(item.PriceBook.SellingPrice)

  React.useEffect(() => {
    async function temp() {
      setServerUrl(await SERVER_URL())
    }
    temp()
  }, [])

  const handleAddToCart = (value, item1) => {
    setQty(value);
    if (value === 0) {
      store.dispatch({ type: 'REMOVE_SALE_CART', payload: item1.Inventory.SerailNo })
    } else {
      item1['quantity'] = value;
      item1['TotalPtr'] = item.PriceBook.SellingPrice * value;
      item1['subTotal'] = item.PriceBook.MaxRetailPrice * value;
      item1['ptrMargin'] = (item.PriceBook.MaxRetailPrice - item.PriceBook.SellingPrice) * value;

      store.dispatch({ type: 'ADD_SALE_CART', payload: [item1.Inventory.SerailNo, item1] })
    }
  }

  return (
    <>
      {item.Inventory.Available > 0 ? (
        <>
          <View style={{
            ...styles.innerviewList, backgroundColor: themecolor.BOXTHEMECOLOR,width: width * 0.93,
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: themecolor.BOXBORDERCOLOR1,
            borderWidth: 0.5,
            justifyContent:'center',
            alignSelf:'center'
          }}>

            <View style={{ ...styles.innerviewVList, }}>

              {item.ProductImages === null || item.ProductImages === "" ? (
                <View style={styles.picList} >
                  <DummyImage width={60} height={60} />
                </View>
              ) : (
                <View style={styles.picList} >
                  <Image
                    source={{ uri: `${getServerUrl}media?id=${item.ProductImages}` }}
                    style={styles.GRNFLLISTIMGList} />
                </View>
              )
              }

              <View style={{ ...styles.innerview1List, width: width * 0.5,paddingHorizontal:4 }}>
                <TextTicker
                  duration={8000}
                  loop
                  bounce
                  repeatSpacer={50}
                  marqueeDelay={1000}>
                  <Text style={{ ...styles.txtList, color: themecolor.TXTWHITE }}>
                    {item.ProductName}
                  </Text>
                </TextTicker>

                <Text style={{...styles.txt2List,color: themecolor.TXTWHITE}}>
                  <Text style={{...styles.text5,color: themecolor.TXTWHITE}}>Batch/Sr No: </Text> {item.Inventory.BatchNo}/{item.Inventory.SerailNo}
                </Text>

                <View style={{ flexDirection: 'row', overflow: 'hidden', }}>
                  <Text style={{...styles.txt2List,color: themecolor.TXTWHITE}}>
                    {item.ProductSku} {' '}</Text>
                  <Text style={{...styles.txt1List,color: themecolor.ICON}}>
                    Instock : {item.Inventory.Available}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', overflow: 'hidden', }}>
                  <Text style={{...styles.txtLineList,}} >
                    <FAIcon name='rupee' size={10} />
                    {item.PriceBook.MaxRetailPrice}
                  </Text>
                  <Text style={{...styles.txt2List,color: themecolor.AV2}}>
                    {' '}
                    <FAIcon name='rupee' size={10} />
                    {item.PriceBook.SellingPrice}
                    {' '}
                  </Text>
                  <Text style={styles.txt1SaveList}>
                    Saves : <FAIcon name='rupee' size={10} />{SavesPrice}
                  </Text>
                </View>

              </View>
            </View>

            <View style={{ ...styles.NumericInputViewList, }}>
              <NumericInput
                containerStyle={{ backgroundColor: themecolor.BOXTHEMECOLOR, borderWidth: 0.5 }}
                totalWidth={74}
                totalHeight={24}
                iconSize={14}
                minValue={0}
                value={qty}
                step={1}
                maxValue={parseInt(item.Inventory.Available)}
                rounded
                type="plus-minus"
                textColor={themecolor.ICON}
                iconStyle={{color:themecolor.ICON}}
                rightButtonBackgroundColor={ themecolor.BOXTHEMECOLOR}
                leftButtonBackgroundColor={ themecolor.BOXTHEMECOLOR}
                onChange={value => { handleAddToCart(value, item) }}
              />
            </View>
          </View>
          <View style={{marginVertical:3}} />
        </>
      ) : (<></>)
      }
    </>
  );
}

function SalesDataList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    // <ScrollView>
      <FlatList
        data={props.inventoryViewData}
        renderItem={({ item }) => <CustomerListD item={item} themecolor={themecolor} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        ListFooterComponent={<View style={{ height: 90 }}>
        </View>}
      />
    // </ScrollView>
  );
}

const InventorySortData = [
  {
    name: 'Alphabetically A to Z',
    id: '1',
  },
  {
    name: 'Alphabetically Z to A',
    id: '2',
  },
  {
    name: 'Recently Added',
    id: '3',
  },

];

function InventroySortBy({ item, props, setIsDoneVisible,themecolor }) {

  const SaleFilterRedux = useSelector(state => state.SaleFilter);
  const SaleFilterReduxValue = Object.values(SaleFilterRedux);
  const SaleFilterReduxTemp = useSelector(state => state.SaleFilterTemporary);
  const SaleFilterReduxValueTemp = Object.values(SaleFilterReduxTemp);

  var merged = [...SaleFilterReduxValueTemp];

  if (merged.length == 0) {
    merged = [...SaleFilterReduxValue]
  }

  React.useEffect(() => {
    if (merged.length == 0) {
      setIsDoneVisible(false);
    }
  }, [])

  const handleRadioBox = (id, name) => {
    store.dispatch({ type: 'ADD_SALE_FILTER_TEMPORARY', payload: [item.id, item.id] })
    setIsDoneVisible(true);
  }

  return (
    <TouchableOpacity
      onPress={() => handleRadioBox()}
      activeOpacity={1}
      style={{
        backgroundColor: merged.includes(item.id) ? themecolor.RB2 : themecolor.RB2,
      }}>
      <View
        style={styles.RadioView}>
        <RadioButton
          color={themecolor.HEADERTHEMECOLOR}
          uncheckedColor={Colors.lightgrey}
          status={merged.includes(item.id) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioBox()}
        />
        <Text style={{...styles.RadioText,color:themecolor.TXTWHITE}}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function InventroySortByFlatList(props) {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <FlatList
      data={InventorySortData}
      renderItem={({ item }) => (
        <InventroySortBy
          item={item}
          props={props}
          themecolor={themecolor}
          setIsDoneVisible={props.setIsDoneVisible}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}


export { SalesDataList, InventroySortByFlatList };

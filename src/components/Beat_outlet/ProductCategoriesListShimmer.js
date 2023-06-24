import { View, FlatList, Dimensions } from 'react-native'
import React from 'react'
import styles from '../../assets/css/styleProducts';
import styles1 from '../../assets/css/styleStockIn';
import stylesBorder from '../../assets/css/stylesBeat';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Colors } from '../../assets/config/Colors';
const { width } = Dimensions.get('window')
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { justifyContent } from 'styled-system';

function ItemShimmer({ item, themecolor }) {
  return (
    <>
      <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.92, margin: 2, borderRadius: 10, overflow: 'hidden', padding: 10 }}>
        <SkeletonPlaceholder >
          <View style={{ flexDirection: 'row', }}>
            <View style={{ left: 5, width: 50, height: 50, borderRadius: 10 }} />
            <View>
              <View style={{ left: 15, width: width * 0.70, height: 15, top: 8, borderRadius: 8 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ left: 15, width: width * 0.34, height: 12, top: 14, borderRadius: 8 }} />
                <View style={{ left: 15, width: width * 0.34, height: 12, top: 14, borderRadius: 8 }} />
              </View>
            </View>
          </View>

        </SkeletonPlaceholder>
      </View>
      <View style={styles.MV3} />
    </>
  );
}

function ProductCategoriesListShimmer() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View style={{ marginTop: 2 }}>
      <FlatList
        data={['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1']}
        renderItem={({ item }) => <ItemShimmer item={item} themecolor={themecolor} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  );
}

function StockInInvoiceShimmer() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <FlatList
      data={['1']}
      renderItem={({ item }) =>
        <View style={{ ...styles.PLFL, backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.92, margin: 2, borderRadius: 10, overflow: 'hidden', padding: 10, }}>
          <SkeletonPlaceholder>
            <View style={styles1.NumberInputView}>
              <View
                style={{
                  ...styles1.Width85,
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <View
                  style={{ ...styles1.FLEXDIREC1, justifyContent: 'space-between', }}>
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                </View>
                <View
                  style={{ ...styles1.FLEXDIREC1, justifyContent: 'space-between', top: 5 }}>
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                </View>
                <View
                  style={{ ...styles1.FLEXDIREC1, justifyContent: 'space-between', top: 10 }}>
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                </View>
                <View
                  style={{ ...styles1.FLEXDIREC1, justifyContent: 'space-between', top: 15 }}>
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                  <View style={{ width: width * 0.42, height: 12, borderRadius: 8 }} />
                </View>
                <View style={{ marginBottom: 10 }} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      }
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
    />
  )
}

function StockInReturnLineItemShimmer() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={['1', '1', '1', '1', '1', '1', '1', '1', '1', '1']}
        renderItem={({ item }) =>
          <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.92, margin: 4, borderRadius: 10, padding: 10 }}>
            <SkeletonPlaceholder>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: 45, height: 45, }} />
                <View>
                  <View style={{ left: 15, width: width * 0.68, height: 12, borderRadius: 10 }} />
                  <View style={{ left: 15, width: width * 0.34, height: 10, top: 5, borderRadius: 10 }} />
                  <View style={{ left: 15, width: width * 0.34, height: 10, top: 10, borderRadius: 10 }} />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  )
}

function SalesCartItemShimmer(props) {

  var cartL = new Array(props.cartLength)
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={cartL}
        renderItem={({ item }) =>
          <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.RB2, width: width * 0.92, margin: 2, borderRadius: 10, padding: 10 }}>
            <SkeletonPlaceholder>
              <View style={{ flexDirection: 'row', }}>
                <View style={{ width: 60, height: 60, }} />
                <View>
                  <View style={{ left: 15, width: width * 0.66, height: 14, borderRadius: 8 }} />
                  <View style={{ left: 15, width: width * 0.35, height: 11, top: 4, borderRadius: 8 }} />
                  <View style={{ left: 15, width: width * 0.35, height: 11, top: 8, borderRadius: 8 }} />
                  <View style={{ left: 15, width: width * 0.35, height: 11, top: 12, borderRadius: 8 }} />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  )
}

function VisitHistoryListShimmer() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={['1', '1', '1', '1', '1', '1', '1', '1',]}
        renderItem={({ item }) =>
          <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.RB2, width: width * 0.92, margin: 4, borderRadius: 10, padding: 10, }}>
            <SkeletonPlaceholder>
              <View style={{ height: 75 }}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ width: 40, height: 40, borderRadius: 10 }} />
                  <View>
                    <View style={{ left: 12, width: width * 0.68, height: 13, borderRadius: 10 }} />
                    <View style={{ left: 12, width: width * 0.34, height: 11, top: 10, borderRadius: 10 }} />
                  </View>
                </View>

                <View style={{ ...stylesBorder.borderLine, top: 5 }} />
                <View style={{ display: 'flex', flexDirection: 'row', }}>
                  <View style={{ width: width * 0.4, height: 12, top: 13, borderRadius: 10 }} />
                  <View style={{ left: 20, width: width * 0.4, height: 12, top: 13, borderRadius: 10 }} />
                </View>
                <View style={{ ...stylesBorder.borderLine, top: 20, }} />
              </View>
            </SkeletonPlaceholder>
          </View>
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  )
}

function OfferListShimmer() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={['1', '1', '1', '1', '1',]}
        keyExtractor={(_, indx) => indx}
        renderItem={({ item }) =>
          <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.RB2, width: width * 0.92, margin: 4, borderRadius: 10, padding: 10, }}>
            <SkeletonPlaceholder>
              <View style={{ height: 150 }}>
                <View style={{ height: 100, borderRadius: 10 }} />
                <View style={{ height: 13, borderRadius: 10, top: 5 }} />
                <View style={{ height: 11, top: 10, borderRadius: 10 }} />
                <View style={{ height: 11, top: 15, borderRadius: 10 }} />
              </View>
            </SkeletonPlaceholder>
          </View>
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  )
}
function OtherProductShimmer() {
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  return (
    <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.RB2, width: width * 0.45, margin: 4, borderRadius: 10, padding: 10, height: 240, }}>
      <SkeletonPlaceholder>
        <View style={{ height: 240, justifyContent: 'center', alignSelf: 'center',flex: 1,}}>
          <View style={{  width: width * 0.4, height:150,borderRadius:5}} />
            <View style={{ width: width * 0.4, height: 13, top: 10, borderRadius: 10 }} />
            <View style={{ width: width * 0.3, height: 11, top: 15, borderRadius: 10 }} />
            </View>
      </SkeletonPlaceholder>
    </View>
  )
}


export { ProductCategoriesListShimmer, StockInReturnLineItemShimmer, StockInInvoiceShimmer, SalesCartItemShimmer, VisitHistoryListShimmer, OfferListShimmer, OtherProductShimmer };
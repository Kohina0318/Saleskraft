import React, { useEffect } from 'react';
import {
    Dimensions,
    View,
    FlatList,
    Text,
    Image,
    ScrollView,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/css/styleStockIn';
import { SERVER_URL } from '../../repository/commonRepository';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
const { width, height } = Dimensions.get('screen');

function SuggestiveOrderView({ item }) {

    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()

    const [imageTemp, setImageTemp] = React.useState(null);
    useEffect(() => {
        async function temp() {
            try {
                setImageTemp(`${await SERVER_URL()}media?id=${item.ProductImages}`)
            } catch (e) {
                setImageTemp('')
            }
        }
        temp()
    }, [])

    return (
        <>
            {/* <View style={{...styles.mainview,backgroundColor:themecolor.BOXTHEMECOLOR}}> */}
            {/* <TouchableOpacity
                    activeOpacity={0.5}
                    style={{...styles.touchview,justifyContent:'center',alignSelf:'center',borderColor:themecolor.BOXBORDERCOLOR1,backgroundColor:themecolor.BOXTHEMECOLOR}}> */}
            <View
                style={{
                    ...styles.innerview, backgroundColor: themecolor.BOXTHEMECOLOR, width: width * 0.92,
                    margin: 2,
                    top: 4,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderColor: themecolor.BOXBORDERCOLOR1,
                    borderWidth: 0.5,
                    alignSelf: 'center'
                }}>

                <View style={styles.pic}>
                    <Image source={{ uri: imageTemp }} style={styles.ImagesPic} resizeMode={'contain'} />
                </View>
                <View style={{ ...styles.innerview1, marginLeft: 8 }}>
                    <Text
                        style={{ ...styles.txt, color: themecolor.TXTWHITE }}>
                        {item.ProductName}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{ ...styles.txt2, color: themecolor.TXTWHITE }}>
                            {item.ProductSku}
                        </Text>
                        <Text
                            style={styles.txt1}>
                            &nbsp;  Instock : {item.ProductQty}
                        </Text>
                    </View>
                    <Text style={{ ...styles.txt2, color: themecolor.TXTWHITE }}><FAIcon name='rupee' size={10} /> {item.ProductSellingPrice}</Text>

                </View>
            </View>
            {/* </TouchableOpacity> */}
            {/* </View> */}
            <View style={{ ...styles.marVer }} />
        </>
    );
}
export function SuggestiveOrderDataList(props) {
    return (
        // <ScrollView>
        <FlatList
            data={props.suggestiveOrderData}
            renderItem={({ item }) => <SuggestiveOrderView item={item} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            ListFooterComponent={
                <View style={{ marginVertical: 75 }} />}
            keyExtractor={(item, index) => index}
            onEndReached={() => {
                // alert(props.isOffset)
                props.setIsOffset(props.isOffset + 10)
            }}
            onEndReachedThreshold={0.5}
        />
        // </ScrollView>
    );
}

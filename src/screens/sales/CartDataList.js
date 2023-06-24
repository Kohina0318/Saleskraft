import React from 'react';
import {
    View,
    FlatList,
    Text,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import styles from '../../assets/css/styleSale';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from '../../repository/commonRepository';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window')

function CartListD({ item, themecolor }) {
    const [getServerUrl, setServerUrl] = React.useState('')

    React.useEffect(() => {
        async function temp() {
            setServerUrl(await SERVER_URL())
        }
        temp()
    }, [])

    var SavesPrice = parseFloat(item.PriceBook.MaxRetailPrice) - parseFloat(item.PriceBook.SellingPrice)

    return (
        <>
            {/* <View style={{...styles.MainView,backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR}}> */}
            <View style={{
                ...styles.InnerView, justifyContent: 'center',
                alignSelf: 'center',
                flex: 1,
                width: width * 0.93,
                marginTop: 10,
                borderRadius: 10,
                overflow: 'hidden',
                borderColor: themecolor.BOXBORDERCOLOR1,
                borderWidth: 0.5,
                backgroundColor: themecolor.BOXTHEMECOLOR
            }}>

                <View style={{ ...styles.imageview, width: width * 0.24 }}>
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
                </View>

                <View style={styles.Width}>

                    <Text style={{ ...styles.text, color: themecolor.TXTWHITE }}>
                        {item.ProductName}
                    </Text>

                    <Text style={{ ...styles.txt2List, color: themecolor.TXTWHITE }}>
                        <Text style={{ ...styles.text5, color: themecolor.TXTWHITE }}>Batch/Sr No: </Text> {item.Inventory.BatchNo}/{item.Inventory.SerailNo}
                    </Text>


                    <View style={styles.view}>

                        <View style={styles.Fd}>
                            <View>
                                <View style={{ flexDirection: 'row', overflow: 'hidden', }}>
                                    <Text style={styles.txtLineList} >
                                        <FAIcon name='rupee' size={10} />
                                        {item.PriceBook.MaxRetailPrice}
                                    </Text>
                                    <Text style={{ ...styles.txt2List, color: themecolor.AV2 }}>
                                        {' '}
                                        <FAIcon name='rupee' size={10} />
                                        {item.PriceBook.SellingPrice}
                                        {' '}
                                    </Text>
                                    <Text style={styles.txt1SaveList}>
                                        Saves : <FAIcon name='rupee' size={10} />{SavesPrice}
                                    </Text>

                                </View>

                                <View style={{ flexDirection: 'row', overflow: 'hidden', }}>
                                    <Text style={{ ...styles.text2, color: themecolor.AV2, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                                        QTY: {item.quantity}
                                    </Text>

                                    <Text style={{ ...styles.text4, color: themecolor.BLUEWHITETEXT }}>
                                        {' '} <Text style={{ ...styles.text5, color: themecolor.TXTWHITE }}>Total: </Text>
                                        <FAIcon name='rupee' size={10} />{item.TotalPtr}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View>

                        </View>
                    </View>

                </View>
            </View>
            {/* </View> */}
        </>
    );
}

function CartDataList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    return (
        // <ScrollView>
            <FlatList
                data={props.data}
                renderItem={({ item }) => <CartListD item={item} themecolor={themecolor} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
            />
        // </ScrollView>
    );
}

export { CartDataList }



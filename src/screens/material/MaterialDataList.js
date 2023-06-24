import React, { useEffect, useState } from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
    Text,
    Image, Dimensions,
} from 'react-native';
import styles from '../../assets/css/styleMaterial';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialModal from '../../components/Modals/MaterialModal';
import { useToast } from "react-native-toast-notifications";
import DummyImage from '../../components/shared/DummyImage';
import { SERVER_URL } from '../../repository/commonRepository';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import VerifyModel from '../../components/shared/VerifyModel';

const { width } = Dimensions.get('screen');

function MaterialDataView({ item, themecolor }) {

    const toast = useToast();
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [imageTemp, setImageTemp] = React.useState(null);

    let imgUrl = item.Url;

    const handleImageDownload = async () => {
        if (imgUrl === "") {
            toast.show("No Material found", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
                offset: 30,
                animationType: "slide-in",
            });

        } else {
            let newImgUri = imgUrl.lastIndexOf('/');
            let imageName = imgUrl.substring(newImgUri);

            let dirs = RNFetchBlob.fs.dirs;
            let path = Platform.OS === 'ios' ? dirs['MainBundleDir'] + imageName : dirs.PictureDir + imageName;

            RNFetchBlob.config({
                fileCache: true,
                appendExt: 'png',
                indicator: true,
                IOSBackgroundTask: true,
                path: path,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: path,
                    description: 'Download complete',
                    //showNotification: true,
                },
            }).fetch("GET", imgUrl).then(res => {
                console.log(res, '---------------->end downloaded')

            });
            setModalVisible(true)
        }
    }

    const fs = RNFetchBlob.fs;

    const handleImageShare = (file_url) => {
        console.log("iuytrewaASDF", file_url)
        if (file_url === "") {
            toast.show("No Material found", {
                type: "warning",
                placement: "bottom",
                duration: 3000,
                offset: 30,
                animationType: "slide-in",
            });

        } else {
            let imagePath = null;
            RNFetchBlob.config({
                fileCache: true,
            })
                .fetch('GET', file_url)
                // the image is now dowloaded to device's storage
                .then((resp) => {
                    imagePath = resp.path();
                    return resp.readFile('base64');
                })
                .then((base64Data) => {
                    var imageUrl = 'data:image/png;base64,' + base64Data;
                    let shareImage = {
                        url: file_url,
                    };
                    Share.open(shareImage)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            err && console.log(err);
                        });
                    return fs.unlink(imagePath);
                });

        }
    }


    useEffect(() => {
        async function temp() {
            try {
                setImageTemp(`${await SERVER_URL()}media?id=${item.MediaId}`)
            } catch (e) {
                setImageTemp('')
            }
        }
        temp()
    }, [])

    return (
        <>
            <View style={{ ...styles.flatContainer, backgroundColor: themecolor.BOXTHEMECOLOR, borderColor: themecolor.BOXBORDERCOLOR1 }}>
                {item.MediaId === null || item.MediaId === "" ? (
                    <View style={{ ...styles.padding, borderRadius: 50, }} >
                        <DummyImage width={50} height={50} />
                    </View>
                ) : (
                    <View style={{ ...styles.padding, }} >
                        <Image source={{ uri: imageTemp }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                    </View>
                )
                }
                <View style={{ ...styles.margleft10, width: width * 0.58, }}>
                    <Text style={{ ...styles.txt11, color: themecolor.TXTWHITE }}>
                        {item.Name}
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{ ...styles.iconview, borderRadius: 50, padding: 2 }}
                        onPress={() => handleImageShare(item.Url)}>
                        <Ionicons name={'share-social-sharp'} size={17} color={Colors.bluetheme} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleImageDownload()}
                        style={{ ...styles.iconview, borderRadius: 50, padding: 2 }}>
                        <MaterialCommunityIcons name={'download'} size={18} color={Colors.bluetheme} />
                    </TouchableOpacity>
                </View>

                {modalVisible && 
                <MaterialModal setModalVisible={setModalVisible}  />
                // <VerifyModel  title="Your material has been download successfully."  />
                }
            </View>

        </>
    );
}

export function MaterialFlatList(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    return (

        <FlatList
            data={props.allData}
            renderItem={({ item }) => <MaterialDataView item={item} themecolor={themecolor} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
        />
    );
}     
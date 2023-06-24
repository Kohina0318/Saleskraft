import React, { useState } from 'react';
import { Modal, View, Text, Dimensions, TextInput } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
const { width } = Dimensions.get('window');
import FullsizeButton from '../shared/FullsizeButton';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default RejectModal = (props) => {
   const mode = useSelector(state => state.mode);
   const themecolor = new MyThemeClass(mode).getThemeColor()
   // const navigation = useNavigation()
   const [modalVisible2, setModalVisible2] = useState(true);
   const [note, setNote] = useState('');

   return (
      <Modal
         animationType="slide"
         transparent={true}
         visible={modalVisible2}>
         <View style={StyleCss.centeredView}>
            <View style={{ ...StyleCss.modalView, backgroundColor: themecolor.RB2 }}>
               <View style={StyleCss.ModalViewWidth}>
                  <Text style={{ fontFamily: FontFamily.PopinsMedium, color: themecolor.TXTWHITE }}>
                     Mention rejection reason
                  </Text>
                  <View style={{ borderWidth: 0.5, borderRadius: 8, height: 100, overflow: 'hidden', borderColor: themecolor.BORDER }}>
                     <TextInput value={note} onChange={(t) => setNote(t)} />
                  </View>
                  <View style={{ marginVertical: 10 }} />
                  <View style={{ flexDirection: 'row', }}>
                     <FullsizeButton title={'Submit'} width={width * 0.20}
                        BRadius={30} backgroundColor={themecolor.HEADERTHEMECOLOR}
                        height={25} fontsize={12} onPress={props.OnsPress} />
                     <View style={{ marginHorizontal: 5 }} />
                     <FullsizeButton title={'Cancel'} width={width * 0.20}
                        BRadius={30} fontsize={12} backgroundColor={'transparent'} titlecolor={'grey'}
                        height={25} onPress={props.OncPress} />

                  </View>

               </View>
            </View>
         </View>
      </Modal>
   )
}
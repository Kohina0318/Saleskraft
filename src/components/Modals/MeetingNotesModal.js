import React, { useState } from 'react';
import { Modal, View, Text, Dimensions, TextInput, } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import { Colors } from '../../assets/config/Colors';
import { Picker } from '@react-native-picker/picker';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');

export default MeetingNotesModal = (props) => {
  //    const navigation = useNavigation()
  const [modalVisible2, setModalVisible2] = useState();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible2}
      onRequestClose={() => {
        setModalVisible2(!modalVisible2);
      }}
    >
      <View style={StyleCss.centeredView}>
        <View style={StyleCss.modalView}>
          <View style={StyleCss.ModalViewWidth}>
            <View
              style={StyleCss.ModelVideoCenter}>
              <View style={StyleCss.view3}>
                <View>
                  <Text style={StyleCss.title}>
                    Enter meeting notes
                  </Text>
                </View>
                <View style={StyleCss.textContainer}>
                  <Picker
                    mode="dropdown"
                    style={StyleCss.widths}
                    itemStyle={StyleCss.heights1}>
                    <Picker.Item
                      label="No retailing"
                      style={StyleCss.picker}
                      value=""
                    />
                    <Picker.Item
                      label="Distributor visit"
                      style={StyleCss.picker1}
                      value="Distributor visit"
                    />
                    <Picker.Item
                      label="Weekly off"
                      style={StyleCss.picker1}
                      value="Weekly off"
                    />
                    <Picker.Item
                      label="Holiday leave"
                      style={StyleCss.picker1}
                      value="Holiday leave"
                    />
                    <Picker.Item
                      label="Meeting"
                      style={StyleCss.picker1}
                      value="Meeting"
                    />
                    <Picker.Item
                      label="Training"
                      style={StyleCss.picker1}
                      value="Training"
                    />
                    <Picker.Item
                      label="Personal leave"
                      style={StyleCss.picker1}
                      value="Personal leave"
                    />

                  </Picker>
                </View>

              </View>
              <View style={StyleCss.MV5} />
              <View style={StyleCss.view3}>
                {/* <View>
                <Text style={StyleCss.title}>
                 Remark
                </Text>
              </View> */}
                <View style={StyleCss.textContainerRemark}>
                  <TextInput
                    placeholder="Remark"
                    keyboardType="name-phone-pad"
                    multiline={true}
                    style={StyleCss.textStyleText}
                  />
                </View>
              </View>

            </View>

            {/* </View> */}

            <View style={StyleCss.FLexLeft}>
              <View style={StyleCss.CameraView}>
                <FAIcon size={30} style={StyleCss.ImageView} name='camera' />
              </View>
            </View>
            <View style={StyleCss.MV5} />
            <View style={StyleCss.MV5} />
            <View style={StyleCss.FLexLeft}>
              <FullsizeButton width={width * 0.32} BRadius={30} height={35} backgroundColor={Colors.bluetheme} onPress={() => handleClickOnDone()} title='Submit' />
              <FullsizeButton width={width * 0.25} BRadius={30} height={35} backgroundColor={'transparent'} titlecolor={Colors.grey} onPress={() => handleClickOnDone()} title='Cancel' />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

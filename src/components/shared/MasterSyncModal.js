import React from 'react';
import * as Progress from 'react-native-progress';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import StyleCss from '../../assets/css/styleOutlet';
import {
  outletBeatDump,
  TruncateAllTables,
  insertOutcomeData,
  insertMappingData,
  insertStockDataIfNotInserted,
} from '../../screens/SharedScreens/InsertData';
import { useToast } from 'react-native-toast-notifications';
import { useSelector } from 'react-redux';
import { Colors } from '../../assets/config/Colors';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';



export default MasterSyncModal = props => {
  const toast = useToast();
  const network = useSelector(state => state.network);
  const mode = useSelector(state => state.mode);
const themecolor = new MyThemeClass(mode).getThemeColor()

  const [modalVisible1, setModalVisible1] = React.useState(true);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [closeButton, setCloseButton] = React.useState(false);
  const [syncing, setSyncing] = React.useState('Syncing...');

  React.useEffect(() => {
    async function temp() {
      try {
        await TruncateAllTables();
        animate();
        setTimeout(async()=>{
          await outletBeatDump();
          setSyncing('Syncing...');
          await insertMappingData();
          setSyncing('Syncing...');
        },2000)
      
        // await insertStockData();
        await insertOutcomeData();
        setTimeout(async () => {
          await insertStockDataIfNotInserted();
        }, 2000)
        setTimeout(() => {
          setSyncing('Data Synced Successfully');

          setCloseButton(true);
        }, 3000);
      } catch (e) {
        toast.show('Something went wrong!, please try again later.', {
          type: 'danger',
          placement: 'bottom',
          duration: 3000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
    }

    if (network) {
      temp();
    } else {
      toast.show(`${res.message}`, {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }, []);

  const animate = async () => {
    let progress = 0;
    setProgress(progress);
    setTimeout(() => {
      setIndeterminate(false);
      setInterval(() => {
        progress += Math.random();
        if (progress > 1) {
          progress = 1;
        }
        setProgress(progress);
      }, 100);
    }, 800);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible1}
      onRequestClose={() => {
        setModalVisible1(!modalVisible1);
        props.setRefresh(!props.refresh);
      }}>
      <View style={{...StyleCss.centeredView,}}>
        <View style={{...StyleCss.modalView,backgroundColor:themecolor.RB2,}}>
          <View style={StyleCss.ModalViewWidth}>
            <View style={StyleCss.ModelVideoCenter}>
              <View style={{ marginTop: 30 }} />
              <Progress.Circle
                indeterminate={indeterminate}
                showsText={true}
                color={Colors.green1}
                borderRadius={30}
                progress={progress}
                animated={true}
                size={120}
                thickness={5}
                //  width={300}
                //  height={20}
                indeterminateAnimationDuration={2000}
              />
            </View>
            <View style={StyleCss.MV5} />
            <Text style={{...StyleCss.ModelTextSub,color:themecolor.TXTWHITE}}>{syncing}</Text>
            <View style={StyleCss.MV5} />
            <View
              style={{
                ...StyleCss.FLexCenter,
                position: 'absolute',
                right: 0,
                top: -20,
                alignItems: 'flex-start',
              }}>
              {closeButton ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      props.setRefresh(!props.refresh);
                      props.setModalVisible1(!props.modalVisible1);
                    }}
                    activeOpacity={1}>
                    <View style={{...StyleCss.CLOSEBUTTON,borderColor:themecolor.TXTWHITE}}>
                      <MCIcon name="close" color={themecolor.TXTWHITE} size={20} />
                    </View>
                  </TouchableOpacity>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

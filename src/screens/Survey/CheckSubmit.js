import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Image,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CheckSubmit(){
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image
                         source={require('../../assets/images/expesne/areusure.png')}
                         resizeMode="center"
                         style={{
                           height: 134,
                           width: 134,
                           position: 'absolute',
                           right: 60,
                           top:30,
                         }}
                       />
            <Text style={styles.modalText}>Are You sure you wants to Submit this servey?</Text>
          
            <Pressable
              style={[styles. buttonSave, styles.buttonClose]}
              //onPress={() => setModalVisible(!modalVisible)}
            > 
                       
             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
             <TouchableOpacity onPress={() => navigation.navigate('Checkfrint')}>
              <Text style={styles.text}>Yes</Text>
              </TouchableOpacity>
              <Text style={styles.textuse}>No</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Submit</Text>
      </Pressable>

      <Pressable
        style={[styles. butt, styles.buttonOp]}
        //onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Cancel</Text>
      </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.8)',
   
  },
  modalView: {
    width:250,
    height:300,
    margin: 20,
    backgroundColor: "#FFF",
    borderRadius:20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
     
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    width:150,
    height:45,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom:20,
    right:18
    
  },

  buttonSave: {
    width:45,
    height:35,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    bottom:20,
    right:18
    
  },

  butt: {
    width:150,
    height:45,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    bottom:20,
    left:12
    
  },
  buttonOpen: {
    backgroundColor: "#54c130",
  },

  buttonOp: {
    backgroundColor: "#3862f8",
  },
  buttonClose: {
    backgroundColor: "blue",
    top:160,
    right:40
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    bottom:2,

  },

  textuse: {
    color: "#bbb",
    fontWeight: "bold",
    textAlign: "center",
    bottom:2,
    left:35

  },


  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:"#000",
    top:140,
  }
});

 
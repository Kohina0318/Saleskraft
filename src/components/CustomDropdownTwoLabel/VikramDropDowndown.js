import React from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import { Colors } from '../../assets/config/Colors';
import DropDownItem from "react-native-drop-down-item";
// import { xorBy } from 'lodash'
const { width } = Dimensions.get('window');

state = {
  contents: [
    {
      title: "Assign to",
      body: "Team Alpha"
    },
  ]
};

const styles = StyleSheet.create({
  row: { backgroundColor: 'red', },
  txt: { fontSize: FontSize.labelText, color: Colors.black, fontFamily: FontFamily.PopinsMedium, },
});

function App() {
  // const [selectedTeams, setSelectedTeams] = useState([])
  return (

    <View style={styles.container}>
      <ScrollView style={{ alignSelf: 'stretch', top: 10 }}>
        {
          this.state.contents
            ? this.state.contents.map((param, i) => {
              return (
                <DropDownItem
                  key={i}
                  style={{ width: width * 0.9, alignSelf: 'center', }}
                  contentVisible={false}
                  // invisibleImage={IC_ARR_DOWN}
                  // visibleImage={IC_ARR_UP}
                  header={
                    <View style={{ justifyContent: 'space-between', alignSelf: 'center', width: width * 0.9, borderRadius: 10, borderWidth: 1, padding: 10, flexDirection: 'row' }}>
                      {/* <View> */}
                      <Text style={{
                        fontSize: FontSize.labelText2,
                        color: Colors.black,
                        fontFamily: FontFamily.PopinsMedium
                      }}>{param.title}</Text>
                      {/* </View> */}
                      {/* <FAIcon name='chevron-down' /> */}
                    </View>
                  }
                >

                  <View style={{ left: 15, top: 5 }}>
                    <View style={{ left: 15, top: 5 }}>
                      <Text style={{ fontSize: FontSize.labelText, color: Colors.black, fontFamily: FontFamily.Popinssemibold, right: 15 }}>
                        {param.body}
                      </Text>
                      <Text style={[
                        styles.txt,
                      ]}>
                        Rajat Gupta
                      </Text>
                      <Text style={[
                        styles.txt,
                      ]}>
                        Vikram Diwakar
                      </Text>
                    </View>
                  </View>
                  {/* Two */}
                  <View style={{ left: 15, top: 5 }}>
                    <View style={{ left: 15, top: 5 }}>
                      <Text style={{ fontSize: FontSize.labelText, color: Colors.black, fontFamily: FontFamily.Popinssemibold, right: 15 }}>
                        {param.body}
                      </Text>
                      <Text style={[
                        styles.txt,
                      ]}>
                        Rajat Gupta
                      </Text>
                      <Text style={[
                        styles.txt,
                      ]}>
                        Vikram Diwakar
                      </Text>
                    </View>
                  </View>
                </DropDownItem>
              );
            })
            : null
        }
        <View style={{ height: 96 }} />
      </ScrollView>
    </View>
  )

  // function onMultiChange() {
  //   return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id',))
  // }

  // function onChange() {
  //   return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id',))
  // }
}

export default App
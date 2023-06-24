import React from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
} from 'react-native';
import styles from '../../assets/css/styleEvent';

// const Eventdata = [
//   {
//     name: 'Distributor visit',
//     mobile: '12 Feb 2022',
//     tag: (
//       <View style={{ width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#ff7c17', justifyContent: 'center', }}>
//         <Text style={{ fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold }}>
//           Pending
//         </Text>
//       </View>),
//   },
//   {
//     name: 'Weekly off',
//     mobile: '14 Jan 2022',
//     tag: (<View style={{ width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#1ecc91', justifyContent: 'center', }}>
//       <Text style={{ fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold }}>Approved</Text></View>),
//   },
//   {
//     name: 'Training',
//     mobile: '26 Jan 2022',
//     tag: (<View style={{ width: 70, height: 18, padding: 2, borderRadius: 30, backgroundColor: '#ff1717', justifyContent: 'center', }}><Text style={{ fontSize: 9, justifyContent: 'center', alignSelf: 'center', color: '#FFF', fontFamily: FontFamily.Popinssemibold }}>Rejected</Text></View>),
//   },


// ];
function EventList({ item }) {
  return (
    <>
      <TouchableOpacity activeOpacity={1} >
        <View
          style={styles.view}>
          <View
            style={styles.view1}>
            <View style={styles.widths}>
              <Text style={styles.newstyle}>{item.EventTypes.EventTypeName}</Text>
              <Text style={styles.newstyle1}>{item.EventDate}</Text>
            </View>
            <View style={styles.view2}>
              <View style={styles.align}>
                {item.EventStatus === 1 ? (
                  <View style={styles.alignPending}>
                    <Text style={styles.alignText}>Pending</Text>
                  </View>
                ) : (
                  item.EventStatus === 2 ? (
                    <View style={styles.alignApproved}>
                      <Text style={styles.alignText}>Approved</Text>
                    </View>
                  ) : (
                    item.EventStatus === 3 ? (
                      <View style={styles.alignRejected}>
                        <Text style={styles.alignText}>Rejected</Text>
                      </View>

                    ) : (
                      <></>
                    )
                  )
                )}
              </View>
            </View>
          </View>

        </View>
        <View style={styles.marg3} />
      </TouchableOpacity>
    </>
  );
}
export function Event(props) {

  return (
    <FlatList
      data={props.allEventData}
      renderItem={({ item }) => <EventList item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      ListFooterComponent={<View style={{ height: 200 }} ></View>}
    />
  );
}  

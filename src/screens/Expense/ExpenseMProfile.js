import {View, Dimensions} from 'react-native';
import React from 'react';
import ProfileViewHeader from '../../components/shared/ProfileViewHeader';
// import NoData from '../../components/shared/NoData';
// import { MyTripDetailsList } from '../../components/ExpenseData/TripdetailsData';
const {width, height} = Dimensions.get('window');

const EmpProfile = props => {
  const empId = props.route.params.empId
  
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ProfileViewHeader title="Trips" empId={empId} />
      </View>
      <View style={{flex: 2}}>
        {/* <View style={{}}>
          {tripkeys.length >= 1 ? (
            tripkeys.map(i => {
              return (
                <MyTripDetailsList
                  tripStatus={tripStatus}
                  Month={i}
                  DATA={triplist[i]}
                />
              );
            })
          ) : (
            <NoData message="Trip Not Found" />
          )}
        </View> */}
      </View>
    </View>
  );
};

export default EmpProfile;

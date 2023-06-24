import React, { useRef, useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import CustomSelect from '../../screens/Dropdown/CustomSelect';
import styles from '../../screens/Dropdown/styleDrodown';

const Cartdata = [
  {
    name: 'Avantika'
  }
];

function List({ item, props }) {
  const [open,setOpen] =useState('none')
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);

  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 1,
      toValue: 50,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 500,
      toValue: 500,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
      setOpen('none')
    } else {
      expandView();
      setOpen('flex')
    }
  }, [collapsed]);

  return (
    <TouchableOpacity
      onPress={toggleCollapsed}
      style={styles.MainVIew2}>
      <View style={styles.itemV}>
        <Animated.View style={{ maxHeight: animationHeight }}>
            <View
              style={styles.MainView}>
                <Text
                  style={{
                    ...styles.List,
                    top: 15
                  }}>
                  Select
                </Text>
                <FAIcon name='caret-down' size={20} style={styles.IconRight} />
            </View>
            <TouchableOpacity
              style={{...styles.TC,display:open}}>
              <Text
                style={styles.List}>
              {item.name}
              </Text>
            </TouchableOpacity>
         
          <CustomSelect />
        </Animated.View>
      </View>
    </TouchableOpacity>

  );
}

export default function CustomDropdown(props) {
  return (
    // <ScrollView>
      <FlatList
        data={Cartdata}
        renderItem={({ item }) => <List item={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    // </ScrollView>
  );
}


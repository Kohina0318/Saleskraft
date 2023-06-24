import { View, BackHandler } from 'react-native';
import React from 'react';
import styles from '../../assets/css/styleGrievance';
import OpenCase from './OpenCase';
import CloseCase from './CloseCase';
import CreateButton from '../../components/shared/CreateButton';
import SwitchButtons from '../../components/shared/SwitchButtons';
import Header_2 from '../../components/shared/Header_2';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default CaseList = props => {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  // console.log("🚀 ~ file: CaseList.js:16 ~ themecolor", themecolor)
 
  function handleBackButtonClick() {

    try{
      if(props.route.params.navigateFrom == 'CreateCase'){
        props.navigation.reset({
          index: 0,
          routes: [
            {
              name: 'NewDashboard',
        
            },
          ],
        });
      }else{
        props.navigation.goBack();
      }
    }catch(e){
      props.navigation.goBack();
    }
    return true;
  }

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  return (
    <View style={{flex: 1,backgroundColor: themecolor.THEMECOLOR}}>
      <Header_2
        title={'Case/Grievance'}
        onPress={() => handleBackButtonClick()}
      />
      <View style={styles.body}>
        <View style={{ height: 10 }} />
        <SwitchButtons component1={<OpenCase />} component2={<CloseCase />} />
        <View style={{ position:'absolute',bottom:'5%',right:10}}>
        <CreateButton onPress={() => props.navigation.push('CreateCase',{navigateFrom:'CreateCase'})} />
        </View>
      </View>
    </View>
  );
};

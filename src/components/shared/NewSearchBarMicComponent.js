import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import styles from '../../assets/css/stylesSearching';
import Icon from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-community/voice';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

export default function SearchBar(props) {

  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor()
  const [result, setResult] = useState('')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }
  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    props.setSearchValue(text);
    console.log("speech result handler", e)
  }
  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  return (
    <View style={{...styles.SearchBarComponent,backgroundColor: themecolor.BOXTHEMECOLOR,borderColor: themecolor.BOXBORDERCOLOR1}}>
      <View style={styles.SearchIcon}>
        <Icon name={props.LeftIcon} size={14} color={themecolor.AV2} />
      </View>
      <TextInput value={result} placeholderTextColor={themecolor.AV2} onChangeText={text =>{ props.setSearchValue(text) 
        setResult(text)
        }
        } style={{ ...styles.SearchTextInput, height: props.height,}} placeholder={props.placeholder}   />
      {isLoading ? <ActivityIndicator size="small" color="#3862f8" />

        :
        <View style={styles.MicIcon}>
          <TouchableOpacity onPress={startRecording}><Icon name={props.RightMicIcon} size={16} color={themecolor.AV2} /></TouchableOpacity>
        </View>
      }
      <View style={styles.Close}>
        <TouchableOpacity onPress={() => {
          props.setSearchValue('')
          setResult('')}} ><Icon name={props.RightCloseIcon} size={20} color={themecolor.AV2} /></TouchableOpacity>
      </View>


    </View>
  )
}
SearchBar.defaultProps = {
  height: 45,
  placeholder: 'Search',
  titlecolor: '#FFF',
  BRadius: 10,
}
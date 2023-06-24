import { Appearance } from "react-native";
import { Colors } from "../../assets/config/Colors";
const isDarkMode = (Appearance.getColorScheme() === 'dark')

const Color = {
  WHITE: '#FFFFFF',
  TRANSPARENT: 'transparent',
  THEMECOLOR: isDarkMode ? '#181818' : '#f5f5f5',
  BOXTHEMECOLOR: isDarkMode ? '#3c3e44' : '#FFF',
  BOXBORDERCOLOR: isDarkMode ? 'rgba(60, 62, 68, .5)' : '#f5f6f7',
  THEMEBLACK: isDarkMode ? '#121B24' : '#252525',
  THEMEDARKGREEN: isDarkMode ? '#2F3F4D' : '#407F2C',
  THEMEWHITE: isDarkMode ? '#121B24' : '#FFFFFF',
  TXTGREETING: isDarkMode ? '#898989' : 'rgba(0, 0, 0, .5)',
  TXTWHITE: isDarkMode ? '#FFF' : '#000',
  TXTTHEME: isDarkMode ? '#676C69' : '#25A31D',
  TXTGREY: isDarkMode ? '#676C69' : '#9E9E9E',
  TXTDARKGREY: isDarkMode ? '#505050' : '#9E9E9E',
  TXTBLACK: isDarkMode ? '#676c69' : '#252525',
  TXTBlue: isDarkMode ? '#6495ED' : '#000',
  BLUEWHITE: isDarkMode ? '#6495ED' : Colors.bluetheme,
  BLUEWHITETEXT: isDarkMode ? '#6495ED' : Colors.bluetheme,
  LOGINTHEMECOLOR: isDarkMode ? '#181818' : '#FFF',
  HEADERTHEMECOLOR: isDarkMode ? '#0f3479' : Colors.bluetheme,
  INPUTTXT: isDarkMode ? '#0f3479' : Colors.black,
  TOUREDITICON: isDarkMode ? '#fff' : Colors.bluetheme,

}


class MyThemeClass {

  constructor(mode) {
    this.mode = mode;
  }

  getThemeColor = () => {
    return {
      WHITE: '#FFFFFF',
      TRANSPARENT: 'transparent',
      THEMECOLOR: this.mode === 'dark' ? '#181818' : '#f5f5f5',
      THEMECOLOR1: this.mode === 'dark' ? '#181818' : '#FFF',
      BOXTHEMECOLOR: this.mode === 'dark' ? '#3c3e44' : '#FFF',
      BOXBORDERCOLOR: this.mode === 'dark' ? 'rgba(60, 62, 68, .5)' : '#f5f6f7',
      BOXBORDERCOLOR1: this.mode === 'dark' ? 'rgba(60, 62, 68, .5)' : '#E9E9E9',
      BOXBORDERCOLORR: this.mode === 'dark' ? '#FFF' : '#E9E9E9',
      THEMEBLACK: this.mode === 'dark' ? '#121B24' : '#252525',
      THEMEDARKGREEN: this.mode === 'dark' ? '#2F3F4D' : '#407F2C',
      THEMEWHITE: this.mode === 'dark' ? '#121B24' : '#FFFFFF',
      TXTGREETING: this.mode === 'dark' ? '#898989' : 'rgba(0, 0, 0, .5)',
      TXTWHITE: this.mode === 'dark' ? '#FFF' : '#000',
      TXTTHEME: this.mode === 'dark' ? '#676C69' : '#25A31D',
      TXTGREY: this.mode === 'dark' ? '#676C69' : '#9E9E9E',
      TXTGREYS: this.mode === 'dark' ? '#dcdde1' : '#84817a',
      TXTDARKGREY: this.mode === 'dark' ? '#505050' : '#9E9E9E',
      TXTBLACK: this.mode === 'dark' ? '#676c69' : '#252525',
      TXTBlue: this.mode === 'dark' ? '#6495ED' : '#000',
      BLUEWHITE: this.mode === 'dark' ? '#6495ED' : Colors.bluetheme,
      BLUEWHITETEXT: this.mode === 'dark' ? '#6495ED' : Colors.bluetheme,
      LOGINTHEMECOLOR: this.mode === 'dark' ? '#181818' : '#FFF',
      HEADERTHEMECOLOR: this.mode === 'dark' ? '#0f3479' : Colors.bluetheme,
      PLACEORDERTHEMECOLOR: this.mode === 'dark' ? '#009432' : "#54C130",
      CHECKOUTTHEMECOLOR: this.mode === 'dark' ? '#c23616' : "#eb2f06",
      SEARCHSCREEN: this.mode == 'dark' ? "#353535" : "#e9e9e9",
      INPUTTXT: this.mode === 'dark' ? '#0f3479' : Colors.black,
      LIGHTGREY: this.mode === 'dark' ? '#484848' : "#f5f5f5",
      // FOOTER: this.mode === 'dark' ? '#0f3479' : '#f5f5f5',
      FOOTER: this.mode === 'dark' ? '#3c3e44' : '#f5f5f5',
      BORDER: this.mode === 'dark' ? '#000' : '#e2e2e2',
      TRIP: this.mode === 'dark' ? '#0f3479' : '#FFF',
      TRIP1: this.mode === 'dark' ? '#6495ED' : '#FFF',
      TRIP2: this.mode === 'dark' ? '#f5f5f5' : "#000",
      RB: this.mode === 'dark' ? '#ecf0f1' : '#FFF',
      DRAWER: this.mode === 'dark' ? '#f5f6fa' : '#FFF',
      ICON: this.mode === 'dark' ? '#FFF' : Colors.bluetheme,
      CARD: this.mode === 'dark' ? '#e2e2e2' : '#ecf0f1',
      RB2: this.mode === 'dark' ? '#484848' : 'white',
      MODAL: this.mode === 'dark' ? '#9E9E9E' : '#a3bad357',
      MODAL2: this.mode === 'dark' ? '#9E9E9E' : '#FFF',
      TABLE: this.mode === 'dark' ? '#0f3479' : '#f1f8ff',
      TABLE1: this.mode === 'dark' ? '#6495ED' : '#c8e1ff',
      CHECK: this.mode === 'dark' ? '#0f3479' : Colors.bluetheme1,
      AV: this.mode === 'dark' ? '#FFF' : '#9E9E9E',
      AV2: this.mode === 'dark' ? '#FFF' : '#252525',
      LOADER: this.mode === 'dark' ? 'rgba(60, 62, 62, .8)' : 'rgba(245, 245, 245, 0.9)',
      MODAL1: this.mode === 'dark' ? 'rgba(60, 62, 62, .8)' : 'rgba(0,0,0,0.2)',
      // TOUREDITICON: this.mode === 'dark' ? '#fff' : Colors.bluetheme,
      OTPBOXCOLOR: this.mode === 'dark' ? '#3c3e44' : Colors.Textinputbg,
    }

  }

}

export default { Color };
export { MyThemeClass }

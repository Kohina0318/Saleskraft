import { View } from 'react-native'
import React from 'react'
import styles from '../../assets/css/stylesSearching';
import SearchInput from '../../components/shared/SearchBarComponent';
import { MyThemeClass } from '../../components/Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';

const SearchHeader = (props) => {
    // props.setSearchValue("temp")
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
   
    console.log("search Value In SearchHeader.js---->", props.searchValue)
    return (
        <View style={{...styles.SearcMainView,  backgroundColor: themecolor.HEADERTHEMECOLOR,}}>
            <View
                style={styles.SearchSecondView}>
                <SearchInput RightMicIcon="mic" RightCloseIcon="close" placeholder="Search"
                    setSearchValue={props.setSearchValue} searchValue={props.searchValue}
                />
            </View>
        </View>
    )
}
export default SearchHeader;


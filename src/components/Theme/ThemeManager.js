import React, { useEffect, useState } from 'react';
import { StatusBar,Appearance } from "react-native";
import { ThemeContext, ThemeProvider } from "styled-components/native";
import darkTheme from './Dark';
import lightTheme from './Light';
// import {  AppearanceProvider } from "react-native-appearance";
 
const ManageThemeProvider = ({ children }) => {
    const [themeState, setThemeState] = useState(defaultMode)
    const setMode = mode => {
      setThemeState(mode)
    }
    useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setThemeState(colorScheme)
      })
      return () => subscription.remove()
    }, [])
    return (
      <ThemeContext.Provider value={{ mode: themeState, setMode }}>
        <ThemeProvider
          theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
          <>
            <StatusBar
              barStyle={themeState === 'dark' ? 'dark-content' : 'light-content'}
            />
            {children}
          </>
        </ThemeProvider>
      </ThemeContext.Provider>
    )
  }
 
export const useTheme = () => React.useContext(ThemeContext)
 
const defaultMode = Appearance.getColorScheme() || 'light'
 
export default ThemeManager = ({ children }) => 
{
    return (
        <>
        {/* <AppearanceProvider> */}
        <ManageThemeProvider>{children}</ManageThemeProvider>
      {/* </AppearanceProvider> */}
      </>
    )
   
    }
  
// export default ThemeManager;
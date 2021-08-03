import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFonts,
  Inter_400Regular,
  Inter_300Light,
  Inter_500Medium,
} from '@expo-google-fonts/inter'
import AppLoading from 'expo-app-loading'

import { ThemeProvider } from './src/context/ThemeContext'

import Main from './src/navigation/Main'

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </ThemeProvider>
  )
}

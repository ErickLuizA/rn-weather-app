import React, { createContext, ReactChild, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { lightTheme, darkTheme, Theme } from '../utils/theme'

interface ThemeContextProps {
  toggle: () => void
  theme: Theme
}

interface ThemeProviderProps {
  children: ReactChild
}

const ThemeContext = createContext({} as ThemeContextProps)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(darkTheme)

  useEffect(() => {
    getStoragedTheme()
  }, [])

  async function getStoragedTheme() {
    const storagedTheme = await AsyncStorage.getItem('@RNTheme')

    setTheme(storagedTheme === 'light' ? lightTheme : darkTheme)
  }

  async function toggle() {
    if (theme === darkTheme) {
      setTheme(lightTheme)
      await AsyncStorage.setItem('@RNTheme', 'light')
    } else {
      setTheme(darkTheme)
      await AsyncStorage.setItem('@RNTheme', 'dark')
    }
  }

  return (
    <ThemeContext.Provider value={{ toggle, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }

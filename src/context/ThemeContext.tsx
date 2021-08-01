import React, { createContext, ReactChild, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { lightTheme, darkTheme } from '../components/theme'

interface ThemeProviderProps {
  children: ReactChild
}

interface ThemeContextProps {
  toggle: () => void
  theme: Theme
}

interface Theme {
  dark: boolean
  primary: string
  text: string
  buttonText: string
}

const ThemeContext = createContext({} as ThemeContextProps)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(lightTheme)

  useEffect(() => {
    (async () => {
      const storagedTheme = await AsyncStorage.getItem('@RNTheme')

      if (storagedTheme === 'dark') {
        setTheme(darkTheme)
      } else {
        setTheme(lightTheme)
      }
    })()
  }, [theme])

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

import React, { ReactChild, useContext } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeContext } from '../context/ThemeContext'

interface ContainerProps {
  children: ReactChild
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function Container({ children }: ContainerProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <SafeAreaView
      style={[{ backgroundColor: theme.primary }, styles.container]}>
      <StatusBar backgroundColor={theme.primary} />
      {children}
    </SafeAreaView>
  )
}

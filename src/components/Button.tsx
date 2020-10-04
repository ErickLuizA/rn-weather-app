import React, { useContext } from 'react'
import { Text, StyleSheet, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { ThemeContext } from '../context/ThemeContext'

interface ButtonProps {
  label: string
  onPress?: () => void
  color: string
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: width / 1.3,
    padding: 15,
    borderRadius: width / 4,
    marginVertical: 10,
    top: 50,
  },

  label: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Inter_300Light',
  },
})

export default function Button({ label, onPress, color }: ButtonProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <RectButton
      {...{ onPress }}
      style={[styles.container, { backgroundColor: color }]}>
      <Text style={[styles.label, { color: theme.buttonText }]}> {label} </Text>
    </RectButton>
  )
}

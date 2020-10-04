import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import { ThemeContext } from '../../context/ThemeContext'
import { RectButton } from 'react-native-gesture-handler'

interface SettingCardProps {
  label: string
  description: string
  icon: string
  onPress: () => void
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
  },

  icon: {
    marginRight: 20,
  },

  content: {
    flexGrow: 0.9,
  },

  label: {
    fontSize: 22,
    fontFamily: 'Inter_500Medium',
  },

  description: {
    fontSize: 16,
    fontFamily: 'Inter_300Light',
  },
})

export default function SettingCard({
  label,
  description,
  icon,
  onPress,
}: SettingCardProps) {
  const { theme } = useContext(ThemeContext)
  return (
    <RectButton style={styles.container} {...{ onPress }}>
      <MaterialIcons name={icon} size={30} color="white" style={styles.icon} />
      <View style={styles.content}>
        <Text style={[{ color: theme.text }, styles.label]}> {label} </Text>
        <Text style={[{ color: theme.text }, styles.description]}>
          {' '}
          {description}{' '}
        </Text>
      </View>
      <AntDesign name="right" size={26} color="white" />
    </RectButton>
  )
}

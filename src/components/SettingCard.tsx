import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

import useTheme from '../hooks/useTheme'

interface SettingCardProps {
  label: string
  description: string
  icon: any
  onPress: () => void
}

export default function SettingCard({
  label,
  description,
  icon,
  onPress,
}: SettingCardProps) {
  const { theme } = useTheme()

  return (
    <RectButton
      style={[styles.container, { backgroundColor: theme.surface }]}
      {...{ onPress }}>
      <MaterialIcons name={icon} size={30} color="white" style={styles.icon} />
      <View style={styles.content}>
        <Text style={[{ color: theme.onBackground }, styles.label]}>
          {label}
        </Text>
        <Text style={[{ color: theme.onBackground }, styles.description]}>
          {description}
        </Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 10,
    borderRadius: 8,
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

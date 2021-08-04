import React from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import useCurrentWeather, { Status } from '../../hooks/useCurrentWeather'
import useTheme from '../../hooks/useTheme'

import WeatherDisplay from '../../components/WeatherDisplay'

import styles from './styles'

export default function Home() {
  const { theme } = useTheme()
  const { currentWeather, retryGetCurrentWeather } = useCurrentWeather()

  if (currentWeather.status === Status.loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.onBackground} />
      </View>
    )
  }

  if (currentWeather.status === Status.error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.onBackground }]}>
          {currentWeather.error}
        </Text>
        <RectButton style={styles.button} onPress={retryGetCurrentWeather}>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            Try again
          </Text>
        </RectButton>
      </View>
    )
  }

  if (currentWeather.status === Status.permissionError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.onBackground }]}>
          {currentWeather.error}
        </Text>
        <RectButton style={styles.button} onPress={retryGetCurrentWeather}>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            Try again
          </Text>
        </RectButton>
      </View>
    )
  }

  return (
    <ScrollView
      style={[styles.successContainer, { backgroundColor: theme.background }]}>
      <WeatherDisplay currentWeather={currentWeather} />
    </ScrollView>
  )
}

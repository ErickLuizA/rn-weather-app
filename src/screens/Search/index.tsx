import React from 'react'
import { ActivityIndicator, ScrollView, View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import SearchBox from '../../components/SearchBox'
import WeatherDisplay from '../../components/WeatherDisplay'
import useSearchWeather, { Status } from '../../hooks/useSearchWeather'
import useTheme from '../../hooks/useTheme'

import styles from './styles'

export default function Search() {
  const { searchedWeather, searchWeather, retrySearchWeather } =
    useSearchWeather()
  const { theme } = useTheme()

  if (searchedWeather.status === Status.loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <SearchBox handleSubmit={searchWeather} />
        <ActivityIndicator
          style={styles.containerData}
          size="large"
          color={theme.onBackground}
        />
      </View>
    )
  }

  if (searchedWeather.status === Status.error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <SearchBox handleSubmit={searchWeather} />

        <View style={styles.containerData}>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            {searchedWeather.error}
          </Text>
          <RectButton style={styles.button} onPress={retrySearchWeather}>
            <Text style={[styles.text, { color: theme.onBackground }]}>
              Try again
            </Text>
          </RectButton>
        </View>
      </View>
    )
  }

  if (searchedWeather.status === Status.permissionError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <SearchBox handleSubmit={searchWeather} />
        <View style={styles.containerData}>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            {searchedWeather.error}
          </Text>
          <RectButton style={styles.button} onPress={retrySearchWeather}>
            <Text style={[styles.text, { color: theme.onBackground }]}>
              Try again
            </Text>
          </RectButton>
        </View>
      </View>
    )
  }

  if (searchedWeather.status === Status.idle) {
    return (
      <View
        style={[
          styles.successContainer,
          { backgroundColor: theme.background },
        ]}>
        <SearchBox handleSubmit={searchWeather} />
      </View>
    )
  }

  return (
    <View
      style={[styles.successContainer, { backgroundColor: theme.background }]}>
      <SearchBox handleSubmit={searchWeather} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <WeatherDisplay currentWeather={searchedWeather.data!} />
      </ScrollView>
    </View>
  )
}

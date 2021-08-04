import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import useForecastWeather, { Status } from '../../hooks/useForecastWeather'
import useTheme from '../../hooks/useTheme'

import ForecastWeatherList from '../../components/ForecastWeatherList'

import styles from './styles'

type ParamList = {
  coords: {
    cityName: string
    latitude: number
    longitude: number
  }
}

type ForecastScreenRouteProp = RouteProp<ParamList, 'coords'>

export default function Forecast() {
  const {
    params: { cityName, latitude, longitude },
  } = useRoute<ForecastScreenRouteProp>()

  const { setOptions } = useNavigation()

  const { theme } = useTheme()

  const { forecastWeather, retryGetForecastWeather } = useForecastWeather(
    latitude,
    longitude,
  )

  useEffect(() => {
    setOptions({
      title: cityName,
    })
  }, [cityName, setOptions])

  if (forecastWeather.status === Status.loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.onBackground} />
      </View>
    )
  }

  if (forecastWeather.status === Status.error) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.onBackground }]}>
          {forecastWeather.error}
        </Text>
        <RectButton style={styles.button} onPress={retryGetForecastWeather}>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            Try again
          </Text>
        </RectButton>
      </View>
    )
  }

  if (forecastWeather.status === Status.permissionError) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.text, { color: theme.onBackground }]}>
          {forecastWeather.error}
        </Text>
        <RectButton style={styles.button} onPress={retryGetForecastWeather}>
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
      <Text style={[styles.headerText, { color: theme.onBackground }]}>
        Next {forecastWeather.data!.daily.length - 1} days{' '}
      </Text>
      {forecastWeather.data?.daily.map((weather) => (
        <ForecastWeatherList key={weather.dew_point} weather={weather} />
      ))}
    </ScrollView>
  )
}

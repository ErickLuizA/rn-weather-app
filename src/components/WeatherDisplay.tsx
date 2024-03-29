import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import { AntDesign } from '@expo/vector-icons'

import { WeatherData } from '../models/Weather'
import useTheme from '../hooks/useTheme'

import { getFormatedDate } from '../utils/formatDate'
import kelvinToCelsius from '../utils/kelvinToCelsius'

import TemperatureIcon from './TemperatureIcon'

interface WeatherDisplayProps {
  currentWeather: WeatherData
}

export default function WeatherDisplay({
  currentWeather,
}: WeatherDisplayProps) {
  const { theme } = useTheme()
  const { navigate } = useNavigation()

  return (
    <>
      <View style={styles.row}>
        <View>
          <Text style={[styles.weatherText, { color: theme.onBackground }]}>
            {currentWeather.weather[0].main}
          </Text>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            {getFormatedDate(currentWeather.dt)}
          </Text>
          <Text style={[styles.text, { color: theme.onBackground }]}>
            {`${currentWeather.name}, ${currentWeather.sys.country}`}
          </Text>
        </View>
        <Text style={[styles.tempText, { color: theme.onBackground }]}>
          {kelvinToCelsius(currentWeather.main.temp)}°C
        </Text>
      </View>
      <TemperatureIcon weather={currentWeather.weather[0].main} />

      <Text style={[styles.weatherText, { color: theme.onBackground }]}>
        {currentWeather.weather[0].description}
      </Text>
      <Text style={[styles.text, { color: theme.onBackground }]}>
        Wind: {currentWeather.wind.speed} m/h
      </Text>
      <Text style={[styles.text, { color: theme.onBackground }]}>
        Humidity: {currentWeather.main.humidity}%
      </Text>
      <Text style={[styles.text, { color: theme.onBackground }]}>
        Feels like: {kelvinToCelsius(currentWeather.main.feels_like)}
        °C
      </Text>
      <RectButton
        onPress={() =>
          navigate('Forecast', {
            cityName: currentWeather.name,
            latitude: currentWeather.coord.lat,
            longitude: currentWeather.coord.lon,
          })
        }
        style={[styles.button, { backgroundColor: theme.primary }]}>
        <View style={styles.row}>
          <Text style={[styles.text, { color: theme.onPrimary }]}>
            Weather Forecast
          </Text>
          <AntDesign name="arrowright" size={30} color={theme.onPrimary} />
        </View>
      </RectButton>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  weatherText: {
    fontSize: 22,
    fontFamily: 'Inter_500Medium',
  },

  text: {
    fontSize: 18,
    fontFamily: 'Inter_300Light',
  },

  tempText: {
    fontSize: 22,
    fontFamily: 'Inter_500Medium',
  },

  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
    borderRadius: 8,
  },
})

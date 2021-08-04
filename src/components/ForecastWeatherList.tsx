import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import useTheme from '../hooks/useTheme'
import { Daily } from '../models/ForecastWeather'
import { getFormatedWeekDay } from '../utils/formatDate'
import kelvinToCelsius, {
  kelvinToCelsiusFromArray,
} from '../utils/kelvinToCelsius'
import TemperatureIcon from './TemperatureIcon'

interface IForecastWeatherListProps {
  weather: Daily
}

export default function ForecastWeatherList({
  weather,
}: IForecastWeatherListProps) {
  const { theme } = useTheme()

  return (
    <View
      key={weather.dew_point}
      style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.row}>
        <TemperatureIcon
          customWidth={60}
          customHeight={60}
          weather={weather.weather[0].main}
        />
        <View style={styles.padding}>
          <Text style={[styles.weekDay, { color: theme.onBackground }]}>
            {getFormatedWeekDay(weather.dt)}
          </Text>
          <View style={styles.row}>
            <Text style={[styles.tempText, { color: theme.onBackground }]}>
              {kelvinToCelsius(weather.temp.min)}°C
            </Text>
            <Text style={[styles.dash, { color: theme.onBackground }]}>-</Text>
            <Text style={[styles.tempText, { color: theme.onBackground }]}>
              {kelvinToCelsius(weather.temp.max)}°C
            </Text>
          </View>
        </View>
        <View>
          <Text style={[styles.tempText, { color: theme.onBackground }]}>
            Feels
          </Text>
          <Text style={[styles.tempText, { color: theme.onBackground }]}>
            {kelvinToCelsiusFromArray([
              weather.feels_like.day,
              weather.feels_like.eve,
              weather.feels_like.morn,
              weather.feels_like.night,
            ])}
            °C
          </Text>
        </View>
        <View style={styles.space} />
        <View>
          <Text style={[styles.tempText, { color: theme.onBackground }]}>
            Humidity
          </Text>
          <Text style={[styles.tempText, { color: theme.onBackground }]}>
            {weather.humidity}%
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },

  padding: {
    paddingHorizontal: 14,
  },

  weekDay: {
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },

  tempText: {
    fontSize: 16,
    fontFamily: 'Inter_300Light',
  },

  dash: {
    paddingHorizontal: 10,
  },

  space: {
    width: 10,
  },

  row: {
    flexDirection: 'row',
  },
})

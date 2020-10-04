import React, { useContext } from 'react'
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import { ThemeContext } from '../context/ThemeContext'
import Sunlight from '../../assets/sunlight.svg'
import Raining from '../../assets/raining.svg'
import Cloud from '../../assets/cloud.svg'
import Snow from '../../assets/snow.svg'
import { isVertical } from './isVertical'

interface WeatherDIsplayProps {
  name: string
  country: string
  description: string
  temperature: number
  date: string
  main: string
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    flex: 1,
  },

  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bigText: {
    fontSize: 20,
    fontFamily: 'Inter_300Light',
  },

  smallText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },

  row: {
    flexDirection: 'row',
  },

  date: {
    fontSize: 20,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },

  img: {
    marginVertical: 20,
  },
})

export default function WeatherDIsplay({
  name,
  country,
  date,
  description,
  temperature,
  main,
}: WeatherDIsplayProps) {
  const { width, height } = useWindowDimensions()
  const { theme } = useContext(ThemeContext)

  function renderSwitch() {
    switch (main) {
      case 'Rain':
        return (
          <Raining
            width={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            height={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            style={styles.img}
          />
        )

      case 'Clouds':
        return (
          <Cloud
            width={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            height={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            style={styles.img}
          />
        )

      case 'Clear':
        return (
          <Sunlight
            width={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            height={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            style={styles.img}
          />
        )

      default:
        return (
          <Snow
            width={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            height={isVertical({ height, width }) ? width * 0.8 : width * 0.3}
            style={styles.img}
          />
        )
    }
  }

  return (
    <View
      style={
        isVertical({ height, width })
          ? styles.container
          : styles.horizontalContainer
      }>
      <View>
        <View style={styles.row}>
          <Text style={[styles.bigText, { color: theme.text }]}>{name}, </Text>
          <Text style={[styles.bigText, { color: theme.text }]}>
            {country}{' '}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.smallText, { color: theme.text }]}>
            {(temperature - 273.15).toString().slice(0, 2)}ºC -
          </Text>
          <Text style={[styles.smallText, { color: theme.text }]}>
            {' '}
            {description}{' '}
          </Text>
        </View>
      </View>
      {renderSwitch()}
      <Text style={[styles.date, { color: theme.text }]}> {date} </Text>
    </View>
  )
}

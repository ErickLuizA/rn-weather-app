import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import Raining from '../../assets/raining.svg'
import Clouds from '../../assets/cloud.svg'
import Sunlight from '../../assets/sunlight.svg'
import Snow from '../../assets/snow.svg'

interface ITemperatureIconProps {
  weather: string
  customWidth?: number
  customHeight?: number
}

const { width } = Dimensions.get('window')

export default function TemperatureIcon({
  weather,
  customHeight,
  customWidth,
}: ITemperatureIconProps) {
  const finalWidth = customWidth ?? width / 1.2
  const finalHeight = customHeight ?? width * 1.2

  switch (weather) {
    case 'Rain':
      return (
        <Raining width={finalWidth} height={finalHeight} style={styles.align} />
      )

    case 'Clouds':
      return (
        <Clouds width={finalWidth} height={finalHeight} style={styles.align} />
      )

    case 'Clear':
      return (
        <Sunlight
          width={finalWidth}
          height={finalHeight}
          style={styles.align}
        />
      )

    case 'Snow':
      return (
        <Snow width={finalWidth} height={finalHeight} style={styles.align} />
      )

    default:
      return (
        <Clouds width={finalWidth} height={finalHeight} style={styles.align} />
      )
  }
}

const styles = StyleSheet.create({
  align: {
    alignSelf: 'center',
  },
})

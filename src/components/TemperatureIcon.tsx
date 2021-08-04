import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'

import Raining from '../../assets/raining.svg'
import Clouds from '../../assets/cloud.svg'
import Sunlight from '../../assets/sunlight.svg'
import Snow from '../../assets/snow.svg'

interface ITemperatureIconProps {
  weather: string
}

const { width } = Dimensions.get('window')

export default function TemperatureIcon({ weather }: ITemperatureIconProps) {
  switch (weather) {
    case 'Rain':
      return (
        <Raining
          width={width / 1.2}
          height={width * 1.2}
          style={styles.align}
        />
      )

    case 'Clouds':
      return (
        <Clouds width={width / 1.2} height={width * 1.2} style={styles.align} />
      )

    case 'Clear':
      return (
        <Sunlight
          width={width / 1.2}
          height={width * 1.2}
          style={styles.align}
        />
      )

    case 'Snow':
      return (
        <Snow width={width / 1.2} height={width * 1.2} style={styles.align} />
      )

    default:
      return (
        <Clouds width={width / 1.2} height={width * 1.2} style={styles.align} />
      )
  }
}

const styles = StyleSheet.create({
  align: {
    alignSelf: 'center',
  },
})

import React from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Container from '../../components/Container'
import cloudGirl from '../../../assets/cloudGirl.svg'
import celebration from '../../../assets/celebration.svg'
import traveling from '../../../assets/traveling.svg'

import Slide from './Slide'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const slides = [
  { svg: cloudGirl, label: 'Welcome to SkyKow', button: false },
  {
    svg: traveling,
    label: 'Know the weather wherever you are so you can always travel safe',
    button: false,
  },
  { svg: celebration, label: '', button: true },
]

export default function Onboarding() {
  const { width } = useWindowDimensions()
  return (
    <Container>
      <View style={styles.container}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}>
          {slides.map((slide) => (
            <Slide
              key={slide.label}
              Svg={slide.svg}
              label={slide.label}
              button={slide.button}
            />
          ))}
        </ScrollView>
      </View>
    </Container>
  )
}

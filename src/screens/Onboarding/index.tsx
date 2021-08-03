import React from 'react'
import { Dimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Slide from './components/Slide'

import useTheme from '../../hooks/useTheme'

import SLIDES from './utils/slides'

import styles from './styles'

const { width } = Dimensions.get('window')

export default function Onboarding() {
  const { theme } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {SLIDES.map((slide, index) => (
          <Slide
            key={slide.label}
            Svg={slide.svg}
            label={slide.label}
            button={slide.button}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  )
}

import React, { useContext } from 'react'
import { View, StyleSheet, Text, useWindowDimensions } from 'react-native'
import { SvgProps } from 'react-native-svg'
import Button from '../../components/Button'
import { ThemeContext } from '../../context/ThemeContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { isVertical } from '../../components/isVertical'

interface SlideProps {
  Svg: React.FC<SvgProps>
  label: string
  button: boolean
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.4,
    paddingTop: 20,
  },

  label: {
    fontSize: 22,
    paddingHorizontal: 20,
    fontFamily: 'Inter_300Light',
  },
})

export default function Slide({ Svg, label, button }: SlideProps) {
  const { theme } = useContext(ThemeContext)

  const { width, height } = useWindowDimensions()

  const { navigate } = useNavigation()

  async function handleGetStarted() {
    await AsyncStorage.setItem('@RNVisited', 'yes')
    navigate('Home')
  }

  return (
    <View style={[styles.container, { width: width }]}>
      <Svg
        width={width}
        height={isVertical({ height, width }) ? width / 1.5 : height / 2.5}
      />
      <View style={styles.content}>
        {button ? (
          <Button label="Get Started" onPress={handleGetStarted} color="#fff" />
        ) : (
          <>
            <Text
              style={[
                styles.label,
                { marginVertical: isVertical({ height, width }) ? 40 : 0 },
                { color: theme.text },
              ]}>
              {' '}
              {label}{' '}
            </Text>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color="#fff"
            />
          </>
        )}
      </View>
    </View>
  )
}

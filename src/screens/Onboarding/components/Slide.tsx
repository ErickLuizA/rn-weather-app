import React from 'react'
import { View, StyleSheet, Text, Dimensions, Alert } from 'react-native'
import { StackActions, useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'

import useTheme from '../../../hooks/useTheme'

import { AS_VISITED } from '../../../utils/constants'

interface SlideProps {
  Svg: React.FC<SvgProps>
  label: string
  button: boolean
  index: number
}

const { width } = Dimensions.get('window')

export default function Slide({ Svg, label, button, index }: SlideProps) {
  const { theme } = useTheme()
  const { dispatch } = useNavigation()

  async function handleGetStarted() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert(
        'Necessary permission',
        'This app needs permission to access location to work',
      )

      return
    }

    await AsyncStorage.setItem(AS_VISITED, 'true')

    dispatch(StackActions.replace('Home'))
  }

  return (
    <View style={styles.container}>
      <Svg width={width / 1.5} height={width} />
      <View style={styles.content}>
        {button ? (
          <RectButton
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleGetStarted}>
            <Text style={[styles.text, { color: theme.onPrimary }]}>
              Get Started
            </Text>
          </RectButton>
        ) : (
          <>
            <Text style={[styles.label, { color: theme.onBackground }]}>
              {label}
            </Text>
            <View style={styles.row}>
              {Array(3)
                .fill('')
                .map((_, idx) => (
                  <MaterialCommunityIcons
                    key={idx}
                    name="circle"
                    size={12}
                    color={idx === index ? theme.primary : theme.onBackground}
                  />
                ))}
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  button: {
    borderRadius: width / 0.75,
    width: width / 1.5,
    marginVertical: 20,
  },

  text: {
    fontSize: 22,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'Inter_300Light',
  },

  label: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Inter_300Light',
    marginVertical: 40,
  },

  row: {
    flexDirection: 'row',
  },
})

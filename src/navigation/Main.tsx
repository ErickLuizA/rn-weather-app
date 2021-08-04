import React, { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useTheme from '../hooks/useTheme'

import Onboarding from '../screens/Onboarding'
import Forecast from '../screens/Forecast'
import BottomTab from './BottomTab'

import { AS_VISITED } from '../utils/constants'

const { Navigator, Screen } = createStackNavigator()

export default function Main() {
  const [visited, setVisited] = useState(false)

  const { theme } = useTheme()

  useEffect(() => {
    async function getHasVisited() {
      const hasVisited = await AsyncStorage.getItem(AS_VISITED)

      setVisited(Boolean(hasVisited))
    }

    getHasVisited()
  }, [])
  return (
    <>
      <Navigator>
        {visited ? (
          <>
            <Screen
              name="Home"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Screen
              name="Forecast"
              component={Forecast}
              options={{
                headerStyle: {
                  backgroundColor: theme.background,
                },
                headerTintColor: theme.onBackground,
              }}
            />
          </>
        ) : (
          <>
            <Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Screen
              name="Home"
              component={BottomTab}
              options={{ headerShown: false }}
            />
            <Screen
              name="Forecast"
              component={Forecast}
              options={{
                headerStyle: {
                  backgroundColor: 'red',
                },
                headerTintColor: 'red',
                headerTitleStyle: {
                  backgroundColor: 'red',
                  color: 'blue',
                },
                headerBackTitleStyle: {
                  color: theme.onBackground,
                },
              }}
            />
          </>
        )}
      </Navigator>
      <StatusBar
        backgroundColor={theme.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
    </>
  )
}

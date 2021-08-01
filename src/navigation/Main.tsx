import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTab from './BottomTab'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Onboarding from '../screens/Onboarding'

const { Navigator, Screen } = createStackNavigator()

export default function Main() {
  const [visited, setVisited] = useState(false)

  useEffect(() => {
    (async () => {
      const hasVisited = await AsyncStorage.getItem('@RNVisited')

      setVisited(Boolean(hasVisited))
    })()
  }, [])
  return (
    <Navigator>
      {visited ? (
        <Screen
          name="Home"
          component={BottomTab}
          options={{ headerShown: false }}
        />
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
        </>
      )}
    </Navigator>
  )
}

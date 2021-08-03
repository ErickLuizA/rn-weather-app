import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'

import Home from '../screens/Home'
// import Search from '../screens/Search'
// import Settings from '../screens/Settings'

const { Navigator, Screen } = createBottomTabNavigator()

export default function BottomTab() {
  return (
    <Navigator
      tabBarOptions={{
        adaptive: true,
        iconStyle: { flexGrow: 0.8 },
        showLabel: false,
        safeAreaInsets: { bottom: 10 },
      }}
      initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="home" size={size} color={color} />
          },
        }}
      />
      {/* <Screen name="Search" component={Search}
            options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="search1" size={size} color={color} />
          },
        }} /> */}
      {/* <Screen name="Settings" component={Settings}
            options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="setting" size={size} color={color} />
          },
        }}
         /> */}
    </Navigator>
  )
}

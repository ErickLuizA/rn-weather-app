import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Settings from '../screens/Settings'
import { AntDesign } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

const icons = {
  Search: {
    lib: AntDesign,
    name: 'search1',
  },
  Home: {
    lib: AntDesign,
    name: 'home',
  },
  Settings: {
    lib: AntDesign,
    name: 'setting',
  },
}

export default function BottomTab() {
  return (
    <Navigator
      lazy
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { lib: Icon, name } = icons[route.name]
          return <Icon name={name} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        adaptive: true,
        iconStyle: { flexGrow: 0.8 },
        showLabel: false,
        safeAreaInsets: { bottom: 10 },
      }}
      initialRouteName="Home">
      <Screen name="Search" component={Search} />
      <Screen name="Home" component={Home} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  )
}

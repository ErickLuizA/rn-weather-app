import React, { createContext, ReactChild, useEffect, useState } from 'react'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-community/async-storage'

interface NotificationProviderProps {
  children: ReactChild
}

interface NotificationContextProps {
  load: () => void
  setData: ({ temp, city }: { temp: number; city: string }) => void
}

const NotificationContext = createContext({} as NotificationContextProps)

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [permission, setPermission] = useState(false)
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    city: '',
  })

  function setData({ temp, city }: { temp: number; city: string }) {
    setWeatherData({
      temp,
      city,
    })
  }

  useEffect(() => {
    (async () => {
      const storagedPermission = await AsyncStorage.getItem('@RNNotification')

      if (storagedPermission === 'yes') {
        setPermission(true)
      } else {
        setPermission(false)
      }
    })()
  }, [])

  const load = () => {
    setPermission((prev) => !prev)
  }

  useEffect(() => {
    ;(async () => {
      if (permission) {
        await Notifications.scheduleNotificationAsync({
          content: {
            sound: 'default',
            title: 'SkyKow',
            body: `${weatherData.city} - ${(weatherData.temp - 273.15)
              .toString()
              .slice(0, 2)}ºC`,
          },
          trigger: {
            seconds: 15000,
            repeats: true,
          },
        })

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        })
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync()
      }
    })()
  }, [permission, weatherData.temp, weatherData.city])

  return (
    <NotificationContext.Provider value={{ load, setData }}>
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationContext, NotificationProvider }

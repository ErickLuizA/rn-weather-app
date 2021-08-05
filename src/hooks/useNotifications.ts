import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { getCurrentWeather } from '../services/api'

import kelvinToCelsius from '../utils/kelvinToCelsius'

export default function useNotifications() {
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    getIsNotificationOn()
  }, [])

  async function getIsNotificationOn() {
    const notificationOn = await AsyncStorage.getItem('@RN/Notification')

    setNotification(Boolean(notificationOn))
  }

  async function toggleNotifications() {
    if (!notification) {
      const position = await getPosition()

      if (position) {
        const response = await getCurrentWeather({
          params: {
            type: 'geo',
            latitude: position.latitude,
            longitude: position.longitude,
          },
        })

        await Notifications.scheduleNotificationAsync({
          content: {
            sound: 'default',
            title: 'SkyKow',
            body: `${response.name} - ${kelvinToCelsius(response.main.temp)}ºC`,
          },
          trigger: {
            seconds: 86400,
            // seconds: 5,
            repeats: true,
          },
        })

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: true,
          }),
        })
      }

      AsyncStorage.setItem('@RN/Notification', 'true')

      setNotification(true)
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync()

      AsyncStorage.removeItem('@RN/Notification')

      setNotification(false)
    }
  }

  async function getPermission(): Promise<boolean> {
    const { status } = await Location.getForegroundPermissionsAsync()

    let granted = true

    if (status !== 'granted') {
      const request = await Location.requestForegroundPermissionsAsync()

      granted = request.status === 'granted'
    }

    return granted
  }

  async function getPosition() {
    const isPermited = await getPermission()

    if (isPermited) {
      try {
        const { coords } = await Location.getCurrentPositionAsync()

        return coords
      } catch (error) {
        Alert.alert(
          'Location permission',
          'The location is necessary to activate notifications',
        )
      }
    } else {
      Alert.alert(
        'Location permission',
        'The location is necessary to activate notifications',
      )
    }
  }

  return { toggleNotifications, notification }
}

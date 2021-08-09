import { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import { Constants } from 'react-native-unimodules'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { removeToken, sendToken } from '../services/notificationApi'

const NOTIFICATION_TOKEN = '@RN/NotificationToken'

export default function useNotifications() {
  const [notificationToken, setNotificationToken] = useState('')

  useEffect(() => {
    getIsNotificationOn()
  }, [])

  async function getIsNotificationOn() {
    const token = await AsyncStorage.getItem(NOTIFICATION_TOKEN)

    setNotificationToken(token ?? '')
  }

  async function toggleNotifications() {
    if (notificationToken) {
      await AsyncStorage.removeItem(NOTIFICATION_TOKEN)

      await removeToken(notificationToken)

      setNotificationToken('')
    } else {
      try {
        await registerForPushNotificationsAsync()
      } catch (error) {
        setNotificationToken('')
      }
    }
  }

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()

        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!')

        return
      }

      const token = (
        await Notifications.getExpoPushTokenAsync({
          experienceId: '@erickluiza/SkyKow',
        })
      ).data

      await AsyncStorage.setItem(NOTIFICATION_TOKEN, token)

      setNotificationToken(token)

      await sendToken(token)
    } else {
      Alert.alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }
  }

  return { toggleNotifications, notificationToken }
}

import { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import { Constants } from 'react-native-unimodules'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    if (notification) {
      await AsyncStorage.removeItem('@RN/Notification')

      setNotification(false)
    } else {
      try {
        await registerForPushNotificationsAsync()
      } catch (error) {
        setNotification(false)
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

      console.log(token)
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

    await AsyncStorage.setItem('@RN/Notification', 'true')

    setNotification(true)
  }

  return { toggleNotifications, notification }
}

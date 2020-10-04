import AsyncStorage from '@react-native-community/async-storage'
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Container from '../../components/Container'
import { ThemeContext } from '../../context/ThemeContext'
import SettingCard from './SettingCard'
import * as Notifications from 'expo-notifications'
import { NotificationContext } from '../../context/NotificationContext'

export default function Settings() {
  const { toggle, theme } = useContext(ThemeContext)
  const { load } = useContext(NotificationContext)
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    ;(async () => {
      const isNotificationOn = await AsyncStorage.getItem('@RNNotification')

      if (isNotificationOn) {
        setNotification(true)
      } else {
        setNotification(false)
      }
    })()
  }, [notification])

  const handleNotifications = async () => {
    if (notification) {
      await AsyncStorage.removeItem('@RNNotification')
      setNotification(false)
    } else {
      const settings = await Notifications.getPermissionsAsync()

      if (settings.status === 'granted') {
        await AsyncStorage.setItem('@RNNotification', 'yes')
        setNotification(true)
      } else {
        const permission = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        })

        if (permission.status === 'granted') {
          await AsyncStorage.setItem('@RNNotification', 'yes')
          setNotification(true)
        } else {
          return
        }
      }
    }
    load()
  }

  const handleTheme = () => toggle()

  return (
    <Container>
      <ScrollView>
        <SettingCard
          onPress={handleNotifications}
          label="Notifications"
          description="Daily Notifications"
          icon={notification ? 'notifications-active' : 'notifications-none'}
        />
        <SettingCard
          onPress={handleTheme}
          label="Theme"
          description={theme.dark ? 'Dark Theme' : 'Light Theme'}
          icon={theme.dark ? 'brightness-3' : 'brightness-7'}
        />
      </ScrollView>
    </Container>
  )
}

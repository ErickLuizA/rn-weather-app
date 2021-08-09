import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import useTheme from '../../hooks/useTheme'

import SettingCard from '../../components/SettingCard'

import styles from './styles'
import useNotifications from '../../hooks/useNotifications'

export default function Settings() {
  const { theme, toggle } = useTheme()

  const { toggleNotifications, notificationToken } = useNotifications()

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <SettingCard
        onPress={toggle}
        label="Theme"
        description={theme.dark ? 'Dark Theme' : 'Light Theme'}
        icon={theme.dark ? 'brightness-3' : 'brightness-7'}
      />
      <SettingCard
        onPress={toggleNotifications}
        label="Notifications"
        description={notificationToken ? 'Notification On' : 'Notification Off'}
        icon={notificationToken ? 'notifications-active' : 'notifications-none'}
      />
    </ScrollView>
  )
}

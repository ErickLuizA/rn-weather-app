import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native'
import Container from '../../components/Container'
import api from '../../services/api'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import { ThemeContext } from '../../context/ThemeContext'
import { ScrollView } from 'react-native-gesture-handler'
import WeatherDIsplay from '../../components/WeatherDIsplay'
import { NotificationContext } from '../../context/NotificationContext'

export interface WeatherProps {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default function Home() {
  const [location, setLocation] = useState<LocationObject>()
  const [weather, setWeather] = useState<WeatherProps>()
  const { setData } = useContext(NotificationContext)

  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    ;(async () => {
      try {
        const { status } = await Location.requestPermissionsAsync()

        if (status === 'granted') {
          const geoLocation = await Location.getCurrentPositionAsync({})
          setLocation(geoLocation)
        }
      } catch (e) {
        Alert.alert(e)
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('', {
          params: {
            lat: location?.coords.latitude,
            lon: location?.coords.longitude,
          },
        })

        const data: WeatherProps = res.data

        setWeather(data)
        setData({
          temp: data.main.temp,
          city: data.name,
        })
      } catch (error) {
        Alert.alert(error)
      }
    })()
  }, [location?.coords.longitude, location?.coords.latitude])

  if (!weather) {
    return (
      <View style={[styles.container, { backgroundColor: theme.primary }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  console.log('Main => ', weather.weather[0].main)

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <WeatherDIsplay
          name={weather.name}
          country={weather.sys.country}
          description={weather?.weather[0].description}
          temperature={weather?.main?.temp}
          main={weather.weather[0].main}
          date={new Date().toLocaleString().slice(0, 10)}
        />
      </ScrollView>
    </Container>
  )
}

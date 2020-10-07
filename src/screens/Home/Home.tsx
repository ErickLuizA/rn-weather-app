import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native'
import Container from '../../components/Container'
import api from '../../services/api'
import * as Location from 'expo-location'
import { LocationObject } from 'expo-location'
import { ThemeContext } from '../../context/ThemeContext'
import { ScrollView } from 'react-native-gesture-handler'
import WeatherDIsplay from '../../components/WeatherDIsplay'
import { NotificationContext } from '../../context/NotificationContext'

export interface WeatherProps {
  cod: string
  message: number
  cnt: number
  list: WeatherList[]

  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
}

interface WeatherList {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: number
    },
  ]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
  }
  visibility: number
  pop: number
  rain: {
    '3h': number
  }
  sys: {
    pod: string
  }
  dt_txt: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function Home() {
  const [location, setLocation] = useState<LocationObject>()
  const [weather, setWeather] = useState<WeatherProps>()
  const { setData } = useContext(NotificationContext)

  const { width } = useWindowDimensions()

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
        const res = await api.get('forecast?', {
          params: {
            lat: location?.coords.latitude,
            lon: location?.coords.longitude,
          },
        })

        const data: WeatherProps = res.data

        const array: WeatherList[] = []

        array.push(res.data.list[0])
        array.push(res.data.list[7])
        array.push(res.data.list[17])
        array.push(res.data.list[23])
        array.push(res.data.list[31])

        const newData = {
          city: data.city,
          cnt: data.cnt,
          cod: data.cod,
          list: array,
          message: data.message,
        }

        setWeather(newData)
        setData({
          temp: data.list[0].main.temp,
          city: data.city.name,
        })
      } catch (error) {
        Alert.alert(error)
      }
    })()
  }, [location?.coords.longitude, location?.coords.latitude]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!weather) {
    return (
      <View style={[styles.container, { backgroundColor: theme.primary }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  return (
    <Container>
      <ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {weather.list.map((w) => {
          return (
            <WeatherDIsplay
              key={w.dt_txt}
              name={weather.city.name}
              country={weather.city.country}
              description={w.weather[0].description}
              temperature={w.main.temp}
              main={w.weather[0].main}
              date={w.dt_txt.slice(0, 10)}
            />
          )
        })}
      </ScrollView>
    </Container>
  )
}

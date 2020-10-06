import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native'
import Container from '../../components/Container'
import { AntDesign } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import { WeatherProps } from '../Home/Home'
import api from '../../services/api'
import WeatherDIsplay from '../../components/WeatherDIsplay'

interface SearchProps {}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },

  icon: { ...StyleSheet.absoluteFillObject, left: 5, top: 10 },

  search: {
    padding: 10,
    fontSize: 18,
  },

  error: {
    color: '#a00',
    fontFamily: 'Inter_400Regular',
    paddingLeft: 20,
    paddingTop: 5,
    fontSize: 16,
  },
})

export default function Search({}: SearchProps) {
  const [input, setInput] = useState('')
  const { width } = useWindowDimensions()
  const [error, setError] = useState('')
  const [weather, setWeather] = useState<WeatherProps>()

  async function handleSubmit() {
    setError('')
    if (input.length === 0) {
      return setError('Please enter a city name')
    }

    try {
      const res = await api.get('weather?', {
        params: {
          q: input,
        },
      })

      setWeather(res.data)
      setInput('')
    } catch (e) {
      setError(e)
    }
  }

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.row}>
          <AntDesign
            name="search1"
            size={25}
            color="#555"
            style={styles.icon}
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={handleSubmit}
            placeholder="Search for a city"
            autoFocus
            style={[
              styles.search,
              { width: width },
              { paddingLeft: width * 0.15 },
            ]}
          />
        </View>
        {Boolean(error) && <Text style={styles.error}> {error} </Text>}
        {weather && (
          <WeatherDIsplay
            name={weather.city.name}
            country={weather.city.country}
            description={weather?.list[0].weather[0].description}
            temperature={weather?.list[0].main.temp}
            main={weather.list[0].weather[0].main}
            date={new Date().toLocaleString().slice(0, 10)}
          />
        )}
      </View>
    </Container>
  )
}

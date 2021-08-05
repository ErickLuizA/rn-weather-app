import { useState } from 'react'
import * as Location from 'expo-location'

import { WeatherData } from '../models/Weather'
import { getCurrentWeather } from '../services/api'

export enum Status {
  idle,
  loading,
  error,
  permissionError,
  success,
}

export type SearchedWeatherState = {
  status: Status
  error: string
  data: WeatherData | null
}

interface IUseSearchWeather {
  searchedWeather: SearchedWeatherState
  searchWeather: (cityName: string) => Promise<void>
  retrySearchWeather: () => Promise<void>
}

export default function useSearchWeather(): IUseSearchWeather {
  const [searchedWeather, setSearchedWeather] = useState<SearchedWeatherState>({
    status: Status.idle,
    error: '',
    data: null,
  })
  const [cityInSearch, setCityInSearch] = useState('')

  const searchWeather = async (cityName: string) => {
    setCityInSearch(cityName)

    setSearchedWeather((state) => ({
      ...state,
      status: Status.loading,
    }))

    const isPermited = await getPermission()

    if (isPermited) {
      try {
        const response = await getCurrentWeather({
          params: {
            type: 'city',
            cityName,
          },
        })

        setSearchedWeather({
          data: response,
          error: '',
          status: Status.success,
        })
      } catch (e) {
        setSearchedWeather({
          data: null,
          error: 'Failure while trying to get weather data',
          status: Status.error,
        })
      }
    } else {
      setSearchedWeather({
        data: null,
        error: 'This app needs permission to access location to work',
        status: Status.permissionError,
      })
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

  async function retrySearchWeather() {
    await searchWeather(cityInSearch)
  }

  return { searchedWeather, searchWeather, retrySearchWeather }
}

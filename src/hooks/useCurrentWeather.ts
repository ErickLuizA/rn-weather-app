import { useCallback, useEffect, useState } from 'react'
import * as Location from 'expo-location'

import { WeatherData } from '../models/Weather'
import { getCurrentWeather } from '../services/api'

export enum Status {
  loading,
  error,
  permissionError,
  success,
}

export type CurrentWeatherState = {
  status: Status
  error: string
  data: WeatherData | null
}

interface IUseCurrentWeather {
  currentWeather: CurrentWeatherState
  retryGetCurrentWeather: () => Promise<void>
}

export default function useCurrentWeather(): IUseCurrentWeather {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherState>({
    status: Status.loading,
    error: '',
    data: null,
  })

  const getCurrentWeatherFun = useCallback(async () => {
    const isPermited = await getPermission()

    if (isPermited) {
      const location = await getPosition()

      if (location) {
        try {
          const response = await getCurrentWeather({
            params: {
              type: 'geo',
              latitude: location.latitude,
              longitude: location.longitude,
            },
          })

          setCurrentWeather({
            data: response,
            error: '',
            status: Status.success,
          })
        } catch (e) {
          setCurrentWeather({
            data: null,
            error: 'Failure while trying to get weather data',
            status: Status.error,
          })
        }
      }
    } else {
      setCurrentWeather({
        data: null,
        error: 'This app needs permission to access location to work',
        status: Status.permissionError,
      })
    }
  }, [])

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
    try {
      const { coords } = await Location.getCurrentPositionAsync()

      return coords
    } catch (error) {
      setCurrentWeather({
        data: null,
        error: 'This app needs permission to access location to work',
        status: Status.permissionError,
      })
    }
  }

  async function retryGetCurrentWeather() {
    setCurrentWeather((state) => ({
      ...state,
      status: Status.loading,
    }))

    await getCurrentWeatherFun()
  }

  useEffect(() => {
    getCurrentWeatherFun()
  }, [getCurrentWeatherFun])

  return { currentWeather, retryGetCurrentWeather }
}

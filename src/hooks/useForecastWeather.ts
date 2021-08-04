import { useCallback, useEffect, useState } from 'react'
import * as Location from 'expo-location'

import { ForecastWeather } from '../models/ForecastWeather'
import { getForecastWeather } from '../services/api'

export enum Status {
  loading,
  error,
  permissionError,
  success,
}

export type ForecastWeatherState = {
  status: Status
  error: string
  data: ForecastWeather | null
}

interface IUseWeather {
  forecastWeather: ForecastWeatherState
  retryGetForecastWeather: () => Promise<void>
}
export default function useForecastWeather(
  latitude: number,
  longitude: number,
) {
  const [forecastWeather, setForecastWeather] = useState<ForecastWeatherState>({
    status: Status.loading,
    error: '',
    data: null,
  })

  const getForecastWeatherFun = useCallback(async () => {
    const isPermited = await getPermission()

    if (isPermited) {
      try {
        const response = await getForecastWeather({
          latitude: latitude,
          longitude: longitude,
        })

        setForecastWeather({
          data: response,
          error: '',
          status: Status.success,
        })
      } catch (e) {
        setForecastWeather({
          data: null,
          error: 'Failure while trying to get weather data',
          status: Status.error,
        })
      }
    }
  }, [latitude, longitude])

  async function getPermission(): Promise<boolean> {
    const { status } = await Location.getForegroundPermissionsAsync()

    let granted = true

    if (status !== 'granted') {
      const request = await Location.requestForegroundPermissionsAsync()

      granted = request.status === 'granted'
    }

    return granted
  }

  async function retryGetForecastWeather() {
    setForecastWeather((state) => ({
      ...state,
      status: Status.loading,
    }))

    await getForecastWeatherFun()
  }

  useEffect(() => {
    getForecastWeatherFun()
  }, [getForecastWeatherFun])

  return { forecastWeather, retryGetForecastWeather }
}

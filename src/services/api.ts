import axios from 'axios'
import { WeatherData } from '../models/Weather'

const BASE_URL = 'http://api.openweathermap.org/data/2.5'

type ByCity = {
  type: 'city'
  cityName: string
}

type ByGeo = {
  type: 'geo'
  latitude: number
  longitude: number
}

type IGetCurrentWeatherParams = {
  params: ByCity | ByGeo
}

export async function getCurrentWeather({ params }: IGetCurrentWeatherParams) {
  const locationParams =
    params.type === 'city'
      ? {
          q: params.cityName,
        }
      : {
          lat: params.latitude,
          lon: params.longitude,
        }

  const response = await axios.get<WeatherData>(`${BASE_URL}/weather`, {
    params: {
      ...locationParams,
      appid: process.env.API_KEY,
    },
  })

  return response.data
}

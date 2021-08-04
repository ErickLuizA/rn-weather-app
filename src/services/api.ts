import axios from 'axios'
import { ForecastWeather } from '../models/ForecastWeather'
import { WeatherData } from '../models/Weather'

const BASE_URL = 'http://api.openweathermap.org/data/2.5'

axios.defaults.baseURL = BASE_URL

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

type IGetForecastWeatherParams = {
  latitude: number
  longitude: number
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

  const response = await axios.get<WeatherData>('/weather', {
    params: {
      ...locationParams,
      appid: process.env.API_KEY,
    },
  })

  return response.data
}

export async function getForecastWeather({
  latitude,
  longitude,
}: IGetForecastWeatherParams) {
  const response = await axios.get<ForecastWeather>('/onecall', {
    params: {
      lat: latitude,
      lon: longitude,
      appid: process.env.API_KEY,
    },
  })

  return response.data
}

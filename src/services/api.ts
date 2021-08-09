import axios from 'axios'
import { ForecastWeather } from '../models/ForecastWeather'
import { WeatherData } from '../models/Weather'

const weatherApi = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5',
  params: {
    appid: process.env.API_KEY,
  },
})

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

  const response = await weatherApi.get<WeatherData>('/weather', {
    params: {
      ...locationParams,
    },
  })

  return response.data
}

export async function getForecastWeather({
  latitude,
  longitude,
}: IGetForecastWeatherParams) {
  const response = await weatherApi.get<ForecastWeather>('/onecall', {
    params: {
      lat: latitude,
      lon: longitude,
      appid: process.env.API_KEY,
    },
  })

  return response.data
}

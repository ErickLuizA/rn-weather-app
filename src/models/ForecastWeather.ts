export interface ForecastWeather {
  lat: number
  lon: number
  timezone: string
  timezone_offset: string
  current: Current
  minutely: Minutely[]
  hourly: Hourly[]
  daily: Daily[]
  alerts: Alert[]
}

export interface Current {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  weather: Weather[]
  rain: Rain
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Rain {
  '1h': number
}

export interface Minutely {
  dt: number
  precipitation: number
}

export interface Hourly {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: Weather2[]
  pop: number
}

export interface Weather2 {
  id: number
  main: string
  description: string
  icon: string
}

export interface Daily {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  weather: Weather3[]
  clouds: number
  pop: number
  rain: number
  uvi: number
}

export interface Temp {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export interface FeelsLike {
  day: number
  night: number
  eve: number
  morn: number
}

export interface Weather3 {
  id: number
  main: string
  description: string
  icon: string
}

export interface Alert {
  sender_name: string
  event: string
  start: number
  end: number
  description: string
  tags: string[]
}

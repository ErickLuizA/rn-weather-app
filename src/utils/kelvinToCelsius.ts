export default function kelvinToCelsius(temp: number) {
  return (temp - 273.15).toString().slice(0, 2)
}

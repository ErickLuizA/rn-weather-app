export default function kelvinToCelsius(temp: number) {
  return Math.round(temp - 273.15).toString()
}

export function kelvinToCelsiusFromArray(temps: number[]) {
  const temp = temps.reduce((prev, curr) => prev + curr)

  return Math.round(temp / 4 - 273.15).toString()
}

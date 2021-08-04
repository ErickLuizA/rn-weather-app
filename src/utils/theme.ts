export interface Theme {
  dark: boolean
  background: string
  onBackground: string
  primary: string
  onPrimary: string
  surface: string
}

const darkTheme: Theme = {
  dark: true,
  background: '#202124',
  onBackground: '#eee',
  primary: '#7184F8',
  onPrimary: '#eee',
  surface: '#272828',
}

const lightTheme: Theme = {
  dark: false,
  background: '#eee',
  onBackground: '#616163',
  primary: '#7184F8',
  onPrimary: '#eee',
  surface: '#ddd',
}

export { darkTheme, lightTheme }

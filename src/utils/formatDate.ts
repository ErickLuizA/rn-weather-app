export function getFormatedDate(timestamp: number) {
  const date = new Date(timestamp * 1000)

  const day = date.getDay()
  const dayOfMonth = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${getWeekDay(day)}, ${dayOfMonth} ${getMonthName(month)} ${year}`
}

export function getFormatedWeekDay(timestamp: number) {
  const date = new Date(timestamp * 1000)

  const day = date.getDay()

  return `${getFullWeekDay(day)}`
}

function getWeekDay(weekDay: number) {
  const week: {
    [key: number]: string
  } = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }

  return week[weekDay]
}
function getFullWeekDay(weekDay: number) {
  const week: {
    [key: number]: string
  } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  }

  return week[weekDay]
}

function getMonthName(monthNumber: number) {
  const month: {
    [key: number]: string
  } = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  }

  return month[monthNumber]
}

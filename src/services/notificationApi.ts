import axios from 'axios'

const notificationApi = axios.create({
  baseURL: 'http://localhost:3333',
})

export async function sendToken(token: string) {
  await notificationApi.post('/token', {
    params: {
      token,
    },
  })
}

export async function removeToken(token: string) {
  await notificationApi.delete('/token', {
    params: {
      token,
    },
  })
}

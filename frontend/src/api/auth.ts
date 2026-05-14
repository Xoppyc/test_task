import client from './client'

export const signup = (data: { name: string; email: string; password: string }) =>
  client.post('/signup', data)

export const loginRequest = (data: { email: string; password: string }) =>
  client.post('/login', data)
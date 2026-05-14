import client from './client'

export const signup = (data: { name: string; email: string; password: string }) =>
  client.post('auth/signup', data)

export const loginRequest = (data: { email: string; password: string }) =>
  client.post('auth/login', data)
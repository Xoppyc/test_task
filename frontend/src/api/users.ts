import type { User } from '../types/User'
import client from './client'

export const getUsers = () => {
  console.log('getUsers called')
  return client.get<User[]>('/users').then(res => {
    console.log('getUsers response:', res.data)
    return res
  })
}

export const getUser = (id: string) => {
  console.log('getUser called, id:', id)
  return client.get<User>(`/users/${id}`).then(res => {
    console.log('getUser response:', res.data)
    return res
  })
}

export const createUsers = (data: Omit<User, '_id'>) => {
  console.log('createUser called, data:', data)
  return client.post<User>('/users', data).then(res => {
    console.log('createUser response:', res.data)
    return res
  })
}

export const updateUsers = (id: string, data: Partial<User>) => {
  console.log('updateUser called, id:', id, 'data:', data)
  return client.put<User>(`/users/${id}`, data).then(res => {
    console.log('updateUser response:', res.data)
    return res
  })
}

export const deleteUsers = (id: string) => {
  console.log('deleteUser called, id:', id)
  return client.delete(`/users/${id}`).then(res => {
    console.log('deleteUser response:', res.data)
    return res
  })
}
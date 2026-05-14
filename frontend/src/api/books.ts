import type { Book } from '../types'
import client from './client'

export const getBooks = () => client.get<Book[]>('/books')
export const getBook = (id: string) => client.get<Book>(`/books/${id}`)
export const createBook = (data: Omit<Book, '_id'>) => client.post<Book>('/books', data)
export const updateBook = (id: string, data: Partial<Book>) => client.put<Book>(`/books/${id}`, data)
export const deleteBook = (id: string) => client.delete(`/books/${id}`)
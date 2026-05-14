import client from './client'

export interface Book {
  _id: string
  name: string
  author: string
  pageCount: number
}

export const getBooks = () => client.get<Book[]>('/books')
export const getBook = (id: string) => client.get<Book>(`/books/${id}`)
export const createBook = (data: Omit<Book, '_id'>) => client.post<Book>('/books', data)
export const updateBook = (id: string, data: Partial<Book>) => client.put<Book>(`/books/${id}`, data)
export const deleteBook = (id: string) => client.delete(`/books/${id}`)
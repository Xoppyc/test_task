import { useState, useEffect } from 'react'
import { getBooks } from '../../api/books'
import type { Book } from '../../types'

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    getBooks().then(res => setBooks(res.data))
  }, [])

  return (
    <section>
      {books.map(b => (
        <div key={b._id}>
          <p>{b.name}</p>
          <p>{b.author}</p>
          <p>{b.pageCount}</p>
        </div>
      ))}
    </section>
  )
}
export default BooksPage;
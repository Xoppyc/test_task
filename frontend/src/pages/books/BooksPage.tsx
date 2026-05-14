import { useState, useEffect } from 'react'
import { getBooks } from '../../api/books'
import type { Book } from '../../types'
import styles from "./BooksPage.module.scss"
import { useNavigate } from 'react-router'

function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    getBooks().then(res => setBooks(res.data))
  }, [])

  return (
    <section>
      <div className={styles.booksGrid}>
        {books.map(b => (
          <div key={b._id} className={styles.book} onClick={() => navigate(`/books/${b._id}`)}>
            <p className={styles.bookTitle}>{b.name}</p>
            <p className={styles.bookAuthor}>{b.author}</p>
            <p className={styles.bookPages}>{b.pageCount}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
export default BooksPage;
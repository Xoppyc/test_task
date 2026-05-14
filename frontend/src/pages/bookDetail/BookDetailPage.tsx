import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { deleteBook, getBook } from "../../api/books";
import type { Book } from "../../types";
import styles from './BookDetailPage.module.scss'
import { useAuth } from "../../context/authContext";

function BookDetailPage() {
  const [book, setBook] = useState<Book | null>(null)
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!id) return
    getBook(id).then(res => setBook(res.data))
  }, [id])

  const handleDelete = () => {
    if (!id) return
    deleteBook(id)
    navigate('/books')
  }
  if (!book) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.fullscreenWrapper}>
      <div className={styles.contentContainer}>
        <button className={styles.backButton} onClick={() => navigate('/books')}>
          ← Back to books
        </button>

        <div className={styles.wireframeGrid}>
          <div className={styles.imagePlaceholder}>
            {/* Book Image Stub */}
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.bookTitle}>{book.name}</h1>
            <p className={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sunt in culpa qui officia.
            </p>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>AUTHOR</span>
                <span className={styles.metaValue}>{book.author}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>PAGES</span>
                <span className={styles.metaValue}>{book.pageCount}</span>
              </div>
            </div>

            {isAdmin && (
              <div className={styles.adminActions}>
                <button className={styles.editBtn} onClick={() => []}>edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete()}>delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
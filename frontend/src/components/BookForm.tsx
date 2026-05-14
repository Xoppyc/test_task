import { useState } from 'react'
import { createBook, updateBook } from '../api/books'
import type { Book } from '../types'

interface Props {
  initial?: Book
  onSuccess: (book: Book) => void
  onCancel: () => void
}

export default function BookForm({ initial, onSuccess, onCancel }: Props) {
  const isEdit = !!initial

  const [name, setName] = useState(initial?.name ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [pageCount, setPageCount] = useState(String(initial?.pageCount ?? ''))
  const [errors, setErrors] = useState<{ name?: string; author?: string; pageCount?: string }>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const clearErr = (key: string) => setErrors(p => ({ ...p, [key]: undefined }))

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim()) e.name = 'Title is required'
    if (!author.trim()) e.author = 'Author is required'
    const p = parseInt(pageCount)
    if (isNaN(p) || p < 1) e.pageCount = 'Must be a positive number'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const payload = { name, author, pageCount: parseInt(pageCount) }
      const res = isEdit
        ? await updateBook(initial!._id, payload)
        : await createBook(payload)
      onSuccess(res.data)
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>{isEdit ? 'Edit Book' : 'Add New Book'}</h2>

      {apiError && <p className="error-banner">{apiError}</p>}

      <div className="field">
        <label htmlFor="book-name">Title</label>
        <input
          id="book-name"
          value={name}
          onChange={e => { setName(e.target.value); clearErr('name') }}
          placeholder="Book title"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="book-author">Author</label>
        <input
          id="book-author"
          value={author}
          onChange={e => { setAuthor(e.target.value); clearErr('author') }}
          placeholder="Author name"
        />
        {errors.author && <span className="field-error">{errors.author}</span>}
      </div>

      <div className="field">
        <label htmlFor="book-pages">Page Count</label>
        <input
          id="book-pages"
          type="number"
          min={1}
          value={pageCount}
          onChange={e => { setPageCount(e.target.value); clearErr('pageCount') }}
          placeholder="e.g. 320"
        />
        {errors.pageCount && <span className="field-error">{errors.pageCount}</span>}
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Book'}
        </button>
      </div>
    </form>
  )
}

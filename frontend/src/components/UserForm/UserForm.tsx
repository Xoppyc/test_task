import { useState } from 'react'
import type { User } from '../../types'
import { updateUsers, createUsers } from '../../api/users'
import styles from './UserForm.module.scss'

interface Props {
  initial?: User
  onSuccess: (user: User) => void
  onCancel: () => void
}

export default function UserForm({ initial, onSuccess, onCancel }: Props) {
  const isEdit = !!initial
  const id = initial?._id
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'user' | 'admin'>(initial?.role ?? 'user')
  const [errors, setErrors] = useState<{
    name?: string; email?: string; password?: string
  }>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const clearErr = (key: string) => setErrors(p => ({ ...p, [key]: undefined }))

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!isEdit && password.length < 6) e.password = 'Minimum 6 characters'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const payload = {
        name,
        email,
        role,
        ...(password ? { password } : {}),
      }
      const res = isEdit
        ? await updateUsers(initial!._id, payload)
        : await createUsers(payload)
      onSuccess(res.data)
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <button type="button" className={styles.backLink} onClick={onCancel}>
        ← Back to users
      </button>

      <div className={styles.id}>{id ? id : ''}</div>

      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {apiError && <p className={styles.errorBanner}>{apiError}</p>}

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="user-name">NAME</label>
            <input
              id="user-name"
              className={errors.name ? styles.inputError : styles.input}
              value={name}
              onChange={e => { setName(e.target.value); clearErr('name') }}
            />
            {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="user-email">EMAIL</label>
            <input
              id="user-email"
              type="email"
              className={errors.email ? styles.inputError : styles.input}
              value={email}
              onChange={e => { setEmail(e.target.value); clearErr('email') }}
            />
            {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="user-password">PASSWORD</label>
            <input
              id="user-password"
              type="password"
              className={errors.password ? styles.inputError : styles.input}
              value={password}
              onChange={e => { setPassword(e.target.value); clearErr('password') }}
              placeholder={isEdit ? "Leave blank to keep" : ""}
            />
            {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="user-role">ROLE</label>
            <div className={styles.selectWrapper}>
              <select
                id="user-role"
                className={styles.input}
                value={role}
                onChange={e => setRole(e.target.value as 'user' | 'admin')}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
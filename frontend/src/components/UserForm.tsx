import { useState } from 'react'
import type { User } from '../types'
import { updateUsers, createUsers } from '../api/users'


interface Props {
  initial?: User           // pass when editing; omit when creating
  onSuccess: (user: User) => void
  onCancel: () => void
}

export default function UserForm({ initial, onSuccess, onCancel }: Props) {
  const isEdit = !!initial

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
    <form onSubmit={handleSubmit} noValidate>
      <h2>{isEdit ? 'Edit User' : 'Create User'}</h2>

      {apiError && <p className="error-banner">{apiError}</p>}

      <div className="field">
        <label htmlFor="user-name">Full Name</label>
        <input
          id="user-name"
          value={name}
          onChange={e => { setName(e.target.value); clearErr('name') }}
          placeholder="Jane Doe"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); clearErr('email') }}
          placeholder="jane@example.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="user-password">
          {isEdit ? 'New Password (leave blank to keep)' : 'Password'}
        </label>
        <input
          id="user-password"
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); clearErr('password') }}
          placeholder={isEdit ? 'Leave blank to keep current' : 'Min. 6 characters'}
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <div className="field">
        <label htmlFor="user-role">Role</label>
        <select
          id="user-role"
          value={role}
          onChange={e => setRole(e.target.value as 'user' | 'admin')}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create User'}
        </button>
      </div>
    </form>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../../api/auth'
import { useAuth } from '../../context/authContext'

export default function SignupPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{
    name?: string; email?: string; password?: string; confirm?: string
  }>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const clearErr = (key: string) => setErrors(p => ({ ...p, [key]: undefined }))

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim()) e.name = 'Name is required'
    if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (password.length < 6) e.password = 'Minimum 6 characters'
    if (password !== confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const res = await signup({ name, email, password })
      login(res.data.user, res.data.token)
      navigate('/books')
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Sign up</h1>

      {apiError && <p className="error-banner">{apiError}</p>}

      <div className="field">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          value={name}
          onChange={e => { setName(e.target.value); clearErr('name') }}
          placeholder="Jane Doe"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); clearErr('email') }}
          placeholder="jane@example.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); clearErr('password') }}
          placeholder="Min. 6 characters"
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <div className="field">
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={e => { setConfirm(e.target.value); clearErr('confirm') }}
          placeholder="Repeat password"
        />
        {errors.confirm && <span className="field-error">{errors.confirm}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account…' : 'Sign Up'}
      </button>

      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </form>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginRequest } from '../../api/auth'
import { useAuth } from '../../context/authContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const res = await loginRequest({ email, password })
      console.log(res);
      login(res.data.user, res.data.token)
      console.log('success');
      navigate('/books')
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Log in</h1>

      {apiError && <p className="error-banner">{apiError}</p>}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
          placeholder="you@example.com"
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
          placeholder="••••••••"
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Logging in…' : 'Log In'}
      </button>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  )
}

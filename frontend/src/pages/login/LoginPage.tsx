import { useState } from 'react'
import { useNavigate } from 'react-router'
import { loginRequest } from '../../api/auth'
import { useAuth } from '../../context/authContext'
import styles from './LoginPage.module.scss'

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      const res = await loginRequest({ email, password })
      login(res.data.user, res.data.token)
      navigate('/books')
    } catch (err: any) {
      setApiError(err.response?.data?.message ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <h1 className={styles.title}>Log in</h1>

        {apiError && <p className={styles.errorBanner}>{apiError}</p>}

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={errors.email ? styles.inputError : styles.input}
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
            placeholder="you@example.com"
          />
          {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={errors.password ? styles.inputError : styles.input}
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
            placeholder="••••••••"
          />
          {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in…' : 'Log In'}
        </button>

        <p className={styles.footerText}>
          Don't have an account? <a href="/signup" className={styles.link}>Sign up</a>
        </p>
      </form>
    </div>
  )
}
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../../api/auth'
import { useAuth } from '../../context/authContext'
import styles from './SignupPage.module.scss'

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
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <h1 className={styles.title}>Sign up</h1>

        {apiError && <p className={styles.errorBanner}>{apiError}</p>}

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            id="name"
            className={errors.name ? styles.inputError : styles.input}
            value={name}
            onChange={e => { setName(e.target.value); clearErr('name') }}
            placeholder="Jane Doe"
          />
          {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={errors.email ? styles.inputError : styles.input}
            value={email}
            onChange={e => { setEmail(e.target.value); clearErr('email') }}
            placeholder="jane@example.com"
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
            onChange={e => { setPassword(e.target.value); clearErr('password') }}
            placeholder="Min. 6 characters"
          />
          {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
        </div>

        <div className={styles.field}>
          <label htmlFor="confirm" className={styles.label}>Confirm Password</label>
          <input
            id="confirm"
            type="password"
            className={errors.confirm ? styles.inputError : styles.input}
            value={confirm}
            onChange={e => { setConfirm(e.target.value); clearErr('confirm') }}
            placeholder="Repeat password"
          />
          {errors.confirm && <span className={styles.fieldError}>{errors.confirm}</span>}
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Creating account…' : 'Sign Up'}
        </button>

        <p className={styles.footerText}>
          Already have an account? <a href="/login" className={styles.link}>Log in</a>
        </p>
      </form>
    </div>
  )
}
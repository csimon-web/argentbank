/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../containers/Navbar'
import { setUser } from '../../store/userSlice'
import API from '../../services/api'
import '../../styles/SignIn.css'

function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await login(email, password, dispatch)
      setLoading(false)
      navigate('/user')
    } catch (err) {
      setError(true)
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   if (isConnected) {
  //     navigate('/user')
  //   }
  // }, [isConnected, navigate])

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon" />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && (
            <div className="input-wrapper">
              <p style={{ color: 'red' }}>Information entered is not correct</p>
            </div>
          )}
          <button type="submit" className="sign-in-button" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignIn

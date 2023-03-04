import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback } from 'react'

const Login = dynamic(() => import('@components/Custom/Auth/Login'), {
  ssr: false,
})
const Signup = dynamic(() => import('@components/Custom/Auth/Signup'), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  const [showSignup, setShowSignup] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const showLoginHideSignup = useCallback(() => {
    setShowSignup(false)
    setShowLogin(true)
  }, [])

  const ShowSignupHideLogin = useCallback(() => {
    setShowSignup(true)
    setShowLogin(false)
  }, [])

  const hideSignupAndLogin = useCallback(() => {
    setShowLogin(false)
    setShowSignup(false)
  }, [])

  useEffect(() => {
    let tokenInLs = window.localStorage.getItem('token')
    if (tokenInLs !== null) {
      setToken(tokenInLs)
      setShowLogin(false)
      setShowSignup(false)
    }
  }, [])

  return (
    <div>
      <Component
        {...pageProps}
        token={token}
        showLogin={showLoginHideSignup}
        showSignup={ShowSignupHideLogin}
      />
      <Signup
        show={showSignup}
        hide={hideSignupAndLogin}
        switchToLogin={showLoginHideSignup}
      />
      <Login
        show={showLogin}
        hide={hideSignupAndLogin}
        switchToLogin={ShowSignupHideLogin}
      />
    </div>
  )
}

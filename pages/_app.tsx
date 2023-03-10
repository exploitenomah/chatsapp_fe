import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import store from '@store/index'
import { Provider } from 'react-redux'

const variablesToDeleteFromLocalStorage = [
  'firstName',
  'lastName',
  'email',
  'password',
  'nickName',
  'confirmPassword',
  'nickNameOrEmail',
]

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.addEventListener('beforeunload', (ev) => {
      variablesToDeleteFromLocalStorage.forEach((el) =>
        localStorage.removeItem(el),
      )
    })
    return () => {
      window.removeEventListener('beforeunload', (ev) => {})
    }
  }, [])
  return (
    <Provider store={store}>
      <div>
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

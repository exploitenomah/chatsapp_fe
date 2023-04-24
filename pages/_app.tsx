import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import store from '@store/index'
import { Provider } from 'react-redux'
import { removeLocalStorageFormValues } from '@utils/auth'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      removeLocalStorageFormValues()
    })
    return () => {
      window.removeEventListener('beforeunload', () => {})
    }
  }, [])
  return (
    <Provider store={store}>
      <div>
        <Component {...pageProps} />
      </div>
      <div id='image-preview-container'></div>
    </Provider>
  )
}

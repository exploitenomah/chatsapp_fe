import { goOffline, goOnline } from '@store/auth/slice'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function useOffline() {
  const dispatch = useDispatch()

  const setAppOffline = useCallback(() => dispatch(goOffline()), [dispatch])
  const setAppOnLine = useCallback(() => dispatch(goOnline()), [dispatch])

  useEffect(() => {
    window.addEventListener('offline', () => {
      setAppOffline()
    })
    window.addEventListener('online', () => {
      setAppOnLine()
    })
    if (navigator.onLine) {
      setAppOnLine()
    } else {
      setAppOffline()
    }
    return () => {
      window.removeEventListener('offline', () => {})
      window.removeEventListener('online', () => {})
    }
  }, [dispatch, setAppOffline, setAppOnLine])
}

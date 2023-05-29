import { Auth } from '@store/auth/initialState'
import { authenticate, goOffline, goOnline } from '@store/auth/slice'
import { Store } from '@store/index'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { getMe } from '@store/user/slice'
import { removeLocalStorageFormValues } from '@utils/auth'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'

export default function useRoot() {
  const [isConnected, setIsConnected] = useState(false)
  const { isOffline } = useSelector<Store, Auth>((store) => store.auth)
  const rootSocket = useMemo(
    () => io(`${process.env.NEXT_PUBLIC_SERVER_URL}`),
    [],
  )

  const dispatch = useDispatch()

  const handleAuth = useCallback(
    (data: User & { token: string }) => {
      removeLocalStorageFormValues()
      localStorage.setItem('chatsapp_token', data.token)
      dispatch(authenticate(data.token))
      dispatch(updateLoading(false))
      dispatch(getMe(data))
    },
    [dispatch],
  )

  const handleConnect = useCallback(() => {
    if (!isConnected) {
      setIsConnected(true)
      isOffline && dispatch(goOnline())
    }
  }, [isConnected, isOffline, dispatch])

  useEffect(() => {
    const tokenInLs = localStorage.getItem('chatsapp_token')
    if (tokenInLs !== null) {
      dispatch(authenticate(tokenInLs))
    }

    rootSocket.onAny((event) => {
      dispatch(updateLoading(false))
    })

    rootSocket.on('signup', (data: User & { token: string }) => {
      handleAuth(data)
    })

    rootSocket.on('login', (data: User & { token: string }) => {
      handleAuth(data)
    })

    rootSocket.io.on('reconnect', (_attempt) => {
      handleConnect()
    })

    rootSocket.io.on('reconnect_attempt', (_attempt) => {
      isConnected && setIsConnected(false)
    })

    rootSocket.io.on('reconnect_error', (_error) => {
      isConnected && setIsConnected(false)
    })

    rootSocket.io.on('reconnect_failed', () => {
      isConnected && setIsConnected(false)
    })

    rootSocket.io.on('error', (err) => {
      isConnected && setIsConnected(false)
    })

    rootSocket.on('connect', () => {
      handleConnect()
    })

    rootSocket.on('disconnect', (reason) => {
      if (
        reason === 'transport close' ||
        reason === 'transport error' ||
        reason === 'ping timeout'
      )
        !isOffline && dispatch(goOffline())
    })
    rootSocket.on('error', (msg) => {
      dispatch(
        addAppAlert({
          message: msg,
          id: Math.random(),
          variant: 'error',
        }),
      )
      dispatch(updateLoading(false))
    })

    return () => {
      rootSocket.off('signup', () => {})
      rootSocket.off('login', () => {})
      rootSocket.off('connect', () => {})
      rootSocket.off('disconnect', () => {})
      rootSocket.io.off('error', () => {})
      rootSocket.io.off('reconnect', () => {})
      rootSocket.io.off('reconnect_attempt', () => {})
      rootSocket.io.off('reconnect_failed', () => {})
      rootSocket.io.off('reconnect_error', () => {})
    }
  }, [dispatch, handleAuth, handleConnect, isConnected, isOffline, rootSocket])

  return rootSocket
}

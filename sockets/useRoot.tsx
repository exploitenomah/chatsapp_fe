import useHandleConnection from '@hooks/useHandleConnection'
import { Auth } from '@store/auth/initialState'
import { authenticate, goOffline } from '@store/auth/slice'
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
  const { handleConnect, handleDisconnect } = useHandleConnection()
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

  useEffect(() => {
    const tokenInLs = localStorage.getItem('chatsapp_token')
    if (tokenInLs !== null) {
      dispatch(authenticate(tokenInLs))
    }

    rootSocket.onAny((_event) => {
      dispatch(updateLoading(false))
    })

    rootSocket.on('signup', (data: User & { token: string }) => {
      handleAuth(data)
    })

    rootSocket.on('login', (data: User & { token: string }) => {
      handleAuth(data)
    })

    rootSocket.on('connect', () => handleConnect())

    rootSocket.io.on('reconnect', (_attempt) => handleConnect())

    rootSocket.io.on('reconnect_attempt', (_attempt) => handleDisconnect())

    rootSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    rootSocket.io.on('reconnect_failed', () => handleDisconnect())

    rootSocket.io.on('error', (_err) => handleDisconnect())

    rootSocket.on('disconnect', handleDisconnect)
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
  }, [
    dispatch,
    handleAuth,
    handleConnect,
    handleDisconnect,
    isOffline,
    rootSocket,
  ])

  return rootSocket
}

import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useHandlers from '@hooks/useHandlers'
import { userEvents } from '@store/user/initialState'
import { userActions } from '@store/user/slice'
import { updateUser } from '@store/friends/slice'
import useHandleConnection from '@hooks/useHandleConnection'

export default function useUser() {
  const { handleConnect, handleDisconnect } = useHandleConnection()
  const { token } = useSelector<Store, Auth>((store) => store.auth)

  const userSocket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        auth: {
          token,
        },
      }),
    [token],
  )

  const dispatch = useDispatch()

  useHandlers(userSocket, userEvents, userActions as {})

  useEffect(() => {
    userSocket.onAny((event, data) => {
      if (event === 'getMe') {
        dispatch(updateUser(data))
      }
    })

    userSocket.on('connect', () => handleConnect())

    userSocket.io.on('reconnect', (_attempt) => handleConnect())

    userSocket.io.on('reconnect_attempt', (_attempt) => handleDisconnect())

    userSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    userSocket.io.on('reconnect_failed', () => handleDisconnect())

    userSocket.io.on('error', (_err) => handleDisconnect())

    userSocket.on('disconnect', handleDisconnect)

    userSocket.on('connect_error', (_err) => {
      dispatch(
        addAppAlert({
          message: 'Something went wrong!',
          variant: 'error',
          id: Math.random(),
        }),
      )
      userSocket.connect()
    })

    userSocket.on('error', (msg) => {
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
      userSocket.off('signup', () => {})
      userSocket.off('login', () => {})
      userSocket.off('connect', () => {})
      userSocket.off('disconnect', () => {})
      userSocket.io.off('error', () => {})
      userSocket.io.off('reconnect', () => {})
      userSocket.io.off('reconnect_attempt', () => {})
      userSocket.io.off('reconnect_failed', () => {})
      userSocket.io.off('reconnect_error', () => {})
    }
  }, [dispatch, handleConnect, handleDisconnect, userSocket])

  return userSocket
}

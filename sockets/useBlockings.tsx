import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useHandlers from '@hooks/useHandlers'
import { blockingsEvents } from '@store/blockings/initialState'
import { blockingsActions } from '@store/blockings/slice'
import useHandleConnection from '@hooks/useHandleConnection'

export default function useBlockings() {
  const { handleConnect, handleDisconnect } = useHandleConnection()
  const { token } = useSelector<Store, Auth>((store) => store.auth)

  const blockingsSocket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_SERVER_URL}/blockings`, {
        auth: {
          token,
        },
      }),
    [token],
  )

  const dispatch = useDispatch()

  useHandlers(blockingsSocket, blockingsEvents, blockingsActions as {})

  useEffect(() => {
    blockingsSocket.on('connect', () => handleConnect())

    blockingsSocket.io.on('reconnect', (_attempt) => handleConnect())

    blockingsSocket.io.on('reconnect_attempt', (_attempt) => handleDisconnect())

    blockingsSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    blockingsSocket.io.on('reconnect_failed', () => handleDisconnect())

    blockingsSocket.io.on('error', (_err) => handleDisconnect())

    blockingsSocket.on('disconnect', handleDisconnect)

    blockingsSocket.on('connect_error', (_err) => {
      dispatch(
        addAppAlert({
          message: 'Something went wrong!',
          variant: 'error',
          id: Math.random(),
        }),
      )
      blockingsSocket.connect()
    })

    blockingsSocket.on('error', (msg) => {
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
      blockingsSocket.off('block', () => {})
      blockingsSocket.off('unblock', () => {})
      blockingsSocket.off('getOne', () => {})
      blockingsSocket.off('connect', () => {})
      blockingsSocket.off('disconnect', () => {})
      blockingsSocket.io.off('error', () => {})
      blockingsSocket.io.off('reconnect', () => {})
      blockingsSocket.io.off('reconnect_attempt', () => {})
      blockingsSocket.io.off('reconnect_failed', () => {})
      blockingsSocket.io.off('reconnect_error', () => {})
    }
  }, [dispatch, handleConnect, handleDisconnect, blockingsSocket])

  return blockingsSocket
}

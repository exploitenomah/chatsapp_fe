import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { authenticate } from '@store/auth/slice'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useHandlers from '@hooks/useHandlers'
import { conversationsEvents } from '@store/conversations/initialState'
import { conversationsActions } from '@store/conversations/slice'
import useHandleConnection from '@hooks/useHandleConnection'

export default function useConversations() {
  const { handleConnect, handleDisconnect } = useHandleConnection()
  const { token } = useSelector<Store, Auth>((store) => store.auth)

  const conversationsSocket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_SERVER_URL}/conversations`, {
        auth: {
          token,
        },
      }),
    [token],
  )

  const dispatch = useDispatch()

  useHandlers(
    conversationsSocket,
    conversationsEvents,
    conversationsActions as {},
  )

  useEffect(() => {
    conversationsSocket.on('connect', () => handleConnect())

    conversationsSocket.io.on('reconnect', () => handleConnect())

    conversationsSocket.io.on('reconnect_attempt', (_attempt) =>
      handleDisconnect(),
    )

    conversationsSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    conversationsSocket.io.on('reconnect_failed', () => handleDisconnect())

    conversationsSocket.io.on('error', (_error) => handleDisconnect())

    conversationsSocket.on('disconnect', handleDisconnect)
    conversationsSocket.on('error', (msg) => {
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
      conversationsSocket.off('signup', () => {})
      conversationsSocket.off('login', () => {})
      conversationsSocket.off('connect', () => {})
      conversationsSocket.off('disconnect', () => {})
      conversationsSocket.io.off('error', () => {})
      conversationsSocket.io.off('reconnect', () => {})
      conversationsSocket.io.off('reconnect_attempt', () => {})
      conversationsSocket.io.off('reconnect_failed', () => {})
      conversationsSocket.io.off('reconnect_error', () => {})
    }
  }, [dispatch, conversationsSocket, handleDisconnect, handleConnect])

  return conversationsSocket
}

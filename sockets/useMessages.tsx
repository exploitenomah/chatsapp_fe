import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useOnNewMessage from '@hooks/messages/useOnNewMessage'
import useOnGetManyMessages from '@hooks/messages/useOnGetManyMessages'
import useOnUpdateMessagesSeen from '@hooks/messages/useOnMessagesSeen'
import useOnUpdateMessagesDelivered from '@hooks/messages/useOnMessagesDelivered'
import useHandleConnection from '@hooks/useHandleConnection'

export default function useMessages() {
  const { handleConnect, handleDisconnect } = useHandleConnection()
  const { token } = useSelector<Store, Auth>((store) => store.auth)

  const messagesSocket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_SERVER_URL}/messages`, {
        auth: {
          token,
        },
      }),
    [token],
  )

  const dispatch = useDispatch()

  const handleNewMessage = useOnNewMessage()
  const handleGetManyMessages = useOnGetManyMessages()
  const handleUpdateMessagesSeen = useOnUpdateMessagesSeen()
  const handleUpdateMessagesDelivered = useOnUpdateMessagesDelivered()

  useEffect(() => {
    messagesSocket.onAny((event) => {
      console.log(event, 'done')
    })

    messagesSocket.on('new', handleNewMessage)
    messagesSocket.on('getMany', handleGetManyMessages)
    messagesSocket.on('messagesSeen', handleUpdateMessagesSeen)
    messagesSocket.on('messagesDelivered', handleUpdateMessagesDelivered)

    messagesSocket.on('connect', () => handleConnect())

    messagesSocket.io.on('reconnect', () => handleConnect())

    messagesSocket.io.on('reconnect_attempt', (_attempt) => handleDisconnect())

    messagesSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    messagesSocket.io.on('reconnect_failed', () => handleDisconnect())

    messagesSocket.io.on('error', (_error) => handleDisconnect())

    messagesSocket.on('disconnect', handleDisconnect)

    messagesSocket.on('error', (msg) => {
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
      messagesSocket.off('new', handleNewMessage)
      messagesSocket.off('getMany', handleGetManyMessages)
      messagesSocket.off('messagesSeen', handleUpdateMessagesSeen)
      messagesSocket.off('messagesDelivered', handleUpdateMessagesDelivered)
      messagesSocket.off('connect', () => {})
      messagesSocket.off('disconnect', () => {})
      messagesSocket.io.off('error', () => {})
      messagesSocket.io.off('reconnect', () => {})
      messagesSocket.io.off('reconnect_attempt', () => {})
      messagesSocket.io.off('reconnect_failed', () => {})
      messagesSocket.io.off('reconnect_error', (data) => {})
    }
  }, [
    dispatch,
    handleConnect,
    handleDisconnect,
    handleGetManyMessages,
    handleNewMessage,
    handleUpdateMessagesDelivered,
    handleUpdateMessagesSeen,
    messagesSocket,
  ])

  return messagesSocket
}

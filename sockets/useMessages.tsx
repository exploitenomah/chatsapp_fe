import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useOnNewMessage from '@hooks/messages/useOnNewMessage'
import useOnGetManyMessages from '@hooks/messages/useOnGetManyMessages'

export default function useMessages() {
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

  useEffect(() => {
    messagesSocket.onAny((event) => {
      console.log(event, 'done')
    })

    messagesSocket.on('new', handleNewMessage)
    messagesSocket.on('getMany', handleGetManyMessages)

    messagesSocket.io.on('reconnect', (attempt) => {
      console.error(`${attempt} ==> at root socket`)
      // if (onError) onError(attempt)
    })

    messagesSocket.io.on('reconnect_attempt', (attempt) => {
      // ...
      console.log(attempt)
    })

    messagesSocket.io.on('reconnect_error', (error) => {
      // ...
      console.log(error)
    })

    messagesSocket.io.on('reconnect_failed', () => {
      // ...
      console.log('reconnect failed')
    })

    messagesSocket.io.on('error', (err) => {
      console.log(err)
    })

    messagesSocket.on('connect', () => {
      console.log('root socket connected')
    })

    messagesSocket.on('disconnect', (reason) => {
      console.log('root socket disconnected', reason)
    })
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
      messagesSocket.on('getMany', handleGetManyMessages)
      messagesSocket.off('connect', () => console.log(`connect off`))
      messagesSocket.off('disconnect', (reason) => console.log(`${reason} off`))
      messagesSocket.io.off('error', (msg) => console.log(`${msg} off`))
      messagesSocket.io.off('reconnect', (data) => console.log(`${data} off`))
      messagesSocket.io.off('reconnect_attempt', (data) =>
        console.log(`${data} off`),
      )
      messagesSocket.io.off('reconnect_failed', () => console.log(`$ off`))
      messagesSocket.io.off('reconnect_error', (data) =>
        console.log(`${data} off`),
      )
    }
  }, [dispatch, handleGetManyMessages, handleNewMessage, messagesSocket])

  return messagesSocket
}

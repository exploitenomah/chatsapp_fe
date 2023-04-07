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

export default function useConversations() {
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
    conversationsSocket.onAny((event) => {
      console.log('event', event)
    })

    conversationsSocket.io.on('reconnect', (attempt) => {
      console.error(`${attempt} ==> at root socket`)
      // if (onError) onError(attempt)
    })

    conversationsSocket.io.on('reconnect_attempt', (attempt) => {
      // ...
      console.log(attempt)
    })

    conversationsSocket.io.on('reconnect_error', (error) => {
      // ...
      console.log(error)
    })

    conversationsSocket.io.on('reconnect_failed', () => {
      // ...
      console.log('reconnect failed')
    })

    conversationsSocket.io.on('error', (err) => {
      console.log(err)
    })

    conversationsSocket.on('connect', () => {
      console.log('root socket connected')
    })

    conversationsSocket.on('disconnect', (reason) => {
      console.log('root socket disconnected', reason)
    })
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
      conversationsSocket.off('signup', (data) => console.log(`${data} off`))
      conversationsSocket.off('login', (data) => console.log(`${data} off`))
      conversationsSocket.off('connect', () => console.log(`connect off`))
      conversationsSocket.off('disconnect', (reason) =>
        console.log(`${reason} off`),
      )
      conversationsSocket.io.off('error', (msg) => console.log(`${msg} off`))
      conversationsSocket.io.off('reconnect', (data) =>
        console.log(`${data} off`),
      )
      conversationsSocket.io.off('reconnect_attempt', (data) =>
        console.log(`${data} off`),
      )
      conversationsSocket.io.off('reconnect_failed', () => console.log(`$ off`))
      conversationsSocket.io.off('reconnect_error', (data) =>
        console.log(`${data} off`),
      )
    }
  }, [dispatch, conversationsSocket])

  return conversationsSocket
}

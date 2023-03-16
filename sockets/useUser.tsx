import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { authenticate } from '@store/auth/slice'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useHandlers from '@hooks/useHandlers'
import { userEvents } from '@store/user/initialState'
import { userActions } from '@store/user/slice'

export default function useUser() {
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
    userSocket.onAny((event) => {
      console.log('event', event)
    })

    userSocket.io.on('reconnect', (attempt) => {
      console.error(`${attempt} ==> at root socket`)
      // if (onError) onError(attempt)
    })

    userSocket.io.on('reconnect_attempt', (attempt) => {
      // ...
      console.log(attempt)
    })

    userSocket.io.on('reconnect_error', (error) => {
      // ...
      console.log(error)
    })

    userSocket.io.on('reconnect_failed', () => {
      // ...
      console.log('reconnect failed')
    })

    userSocket.io.on('error', (err) => {
      console.log(err)
    })

    userSocket.on('connect', () => {
      console.log('user socket connected')
    })

    userSocket.on('disconnect', (reason) => {
      console.log('root socket disconnected', reason)
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
      userSocket.off('signup', (data) => console.log(`${data} off`))
      userSocket.off('login', (data) => console.log(`${data} off`))
      userSocket.off('connect', () => console.log(`connect off`))
      userSocket.off('disconnect', (reason) => console.log(`${reason} off`))
      userSocket.io.off('error', (msg) => console.log(`${msg} off`))
      userSocket.io.off('reconnect', (data) => console.log(`${data} off`))
      userSocket.io.off('reconnect_attempt', (data) =>
        console.log(`${data} off`),
      )
      userSocket.io.off('reconnect_failed', () => console.log(`$ off`))
      userSocket.io.off('reconnect_error', (data) => console.log(`${data} off`))
    }
  }, [dispatch, userSocket])

  return userSocket
}

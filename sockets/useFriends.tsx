import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useHandlers from '@hooks/useHandlers'
import { friendsEvents } from '@store/friends/initialState'
import { friendsActions } from '@store/friends/slice'

export default function useFriends() {
  const { token } = useSelector<Store, Auth>((store) => store.auth)

  const friendsSocket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_SERVER_URL}/friends`, {
        auth: {
          token,
        },
      }),
    [token],
  )

  const dispatch = useDispatch()

  useHandlers(friendsSocket, friendsEvents, friendsActions as {})

  useEffect(() => {
    friendsSocket.onAny((event, xyz) => {
      console.log('event', event, xyz, 'done')
    })

    friendsSocket.io.on('reconnect', (attempt) => {
      console.error(`${attempt} ==> at root socket`)
      // if (onError) onError(attempt)
    })

    friendsSocket.io.on('reconnect_attempt', (attempt) => {
      // ...
      console.log(attempt)
    })

    friendsSocket.io.on('reconnect_error', (error) => {
      // ...
      console.log(error)
    })

    friendsSocket.io.on('reconnect_failed', () => {
      // ...
      console.log('reconnect failed')
    })

    friendsSocket.io.on('error', (err) => {
      console.log(err)
    })

    friendsSocket.on('connect', () => {
      console.log('root socket connected')
    })

    friendsSocket.on('disconnect', (reason) => {
      console.log('root socket disconnected', reason)
    })
    friendsSocket.on('error', (msg) => {
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
      friendsSocket.off('signup', (data) => console.log(`${data} off`))
      friendsSocket.off('login', (data) => console.log(`${data} off`))
      friendsSocket.off('connect', () => console.log(`connect off`))
      friendsSocket.off('disconnect', (reason) => console.log(`${reason} off`))
      friendsSocket.io.off('error', (msg) => console.log(`${msg} off`))
      friendsSocket.io.off('reconnect', (data) => console.log(`${data} off`))
      friendsSocket.io.off('reconnect_attempt', (data) =>
        console.log(`${data} off`),
      )
      friendsSocket.io.off('reconnect_failed', () => console.log(`$ off`))
      friendsSocket.io.off('reconnect_error', (data) =>
        console.log(`${data} off`),
      )
    }
  }, [dispatch, friendsSocket])

  return friendsSocket
}

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
import useHandleConnection from '@hooks/useHandleConnection'

export default function useFriends() {
  const { handleConnect, handleDisconnect } = useHandleConnection()
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
    friendsSocket.on('connect', () => handleConnect())

    friendsSocket.io.on('reconnect', () => handleConnect())

    friendsSocket.io.on('reconnect_attempt', (_attempt) => handleDisconnect())

    friendsSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    friendsSocket.io.on('reconnect_failed', () => handleDisconnect())

    friendsSocket.io.on('error', (_error) => handleDisconnect())

    friendsSocket.on('disconnect', handleDisconnect)

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
  }, [dispatch, friendsSocket, handleConnect, handleDisconnect])

  return friendsSocket
}

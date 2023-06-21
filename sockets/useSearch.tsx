import { Store } from '@store/index'
import { Auth } from '@store/auth/initialState'
import { addAppAlert } from '@store/notifications/slice'
import { updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import useHandleConnection from '@hooks/useHandleConnection'
import { toggleLoading, updateSearchedUsersResults } from '@store/search/slice'
import { updateSearchedMessages } from '@store/conversations/slice'

export default function useSearch() {
  const { handleConnect, handleDisconnect } = useHandleConnection()
  const { token } = useSelector<Store, Auth>((store) => store.auth)

  const searchSocket = useMemo(
    () =>
      io(`${process.env.NEXT_PUBLIC_SERVER_URL}/search`, {
        auth: {
          token,
        },
      }),
    [token],
  )

  const dispatch = useDispatch()

  useEffect(() => {
    searchSocket.on('searchMessages', (data) => {
      console.log(data)
      dispatch(updateSearchedMessages(data))
      dispatch(toggleLoading(false))
    })
    searchSocket.on('searchUsers', (data) => {
      dispatch(updateSearchedUsersResults(data))
      dispatch(toggleLoading(false))
    })
    searchSocket.on('connect', () => handleConnect())

    searchSocket.io.on('reconnect', (_attempt) => handleConnect())

    searchSocket.io.on('reconnect_attempt', (_attempt) => handleDisconnect())

    searchSocket.io.on('reconnect_error', (_error) => handleDisconnect())

    searchSocket.io.on('reconnect_failed', () => handleDisconnect())

    searchSocket.io.on('error', (_err) => handleDisconnect())

    searchSocket.on('disconnect', handleDisconnect)

    searchSocket.on('connect_error', (_err) => {
      dispatch(
        addAppAlert({
          message: 'Something went wrong!',
          variant: 'error',
          id: Math.random(),
        }),
      )
      searchSocket.connect()
    })

    searchSocket.on('error', (msg) => {
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
      searchSocket.off('searchUsers', () => {})
      searchSocket.off('searchMessages', () => {})
      searchSocket.off('block', () => {})
      searchSocket.off('unblock', () => {})
      searchSocket.off('getOne', () => {})
      searchSocket.off('connect', () => {})
      searchSocket.off('disconnect', () => {})
      searchSocket.io.off('error', () => {})
      searchSocket.io.off('reconnect', () => {})
      searchSocket.io.off('reconnect_attempt', () => {})
      searchSocket.io.off('reconnect_failed', () => {})
      searchSocket.io.off('reconnect_error', () => {})
    }
  }, [dispatch, handleConnect, handleDisconnect, searchSocket])

  return searchSocket
}

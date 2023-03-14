import { authenticate } from '@store/auth/slice'
import { addAppAlert } from '@store/notifications/slice'
import { toggleAppLoading, updateLoading } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { getMe } from '@store/user/slice'
import { removeLocalStorageFormValues } from '@utils/auth'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { io, Socket } from 'socket.io-client'

export default function useRoot() {
  const rootSocket = useMemo(
    () => io(`${process.env.NEXT_PUBLIC_SERVER_URL}`),
    [],
  )

  const dispatch = useDispatch()

  const handleAuth = useCallback(
    (data: User & { token: string }) => {
      removeLocalStorageFormValues()
      localStorage.setItem('chatsapp_token', data.token)
      dispatch(authenticate(data.token))
      dispatch(updateLoading(false))
      dispatch(getMe(data))
    },
    [dispatch],
  )

  useEffect(() => {
    const tokenInLs = localStorage.getItem('chatsapp_token')
    if (tokenInLs !== null) {
      dispatch(authenticate(tokenInLs))
      dispatch(toggleAppLoading(false))
    }

    rootSocket.onAny((event) => {
      console.log('event', event)
      dispatch(updateLoading(false))
    })

    rootSocket.on('signup', (data: User & { token: string }) => {
      handleAuth(data)
    })

    rootSocket.on('login', (data: User & { token: string }) => {
      handleAuth(data)
    })

    rootSocket.io.on('reconnect', (attempt) => {
      console.error(`${attempt} ==> at root socket`)
      // ...
    })

    rootSocket.io.on('reconnect_attempt', (attempt) => {
      // ...
      console.log(attempt)
    })

    rootSocket.io.on('reconnect_error', (error) => {
      // ...
      console.log(error)
    })

    rootSocket.io.on('reconnect_failed', () => {
      // ...
      console.log('reconnect failed')
    })

    rootSocket.io.on('error', (err) => {
      console.log(err)
    })

    rootSocket.on('connect', () => {
      console.log('root socket connected')
    })

    rootSocket.on('disconnect', (reason) => {
      console.log('root socket disconnected', reason)
    })
    rootSocket.on('error', (msg) => {
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
      rootSocket.off('signup', (data) => console.log(`${data} off`))
      rootSocket.off('login', (data) => console.log(`${data} off`))
      rootSocket.off('connect', () => console.log(`connect off`))
      rootSocket.off('disconnect', (reason) => console.log(`${reason} off`))
      rootSocket.io.off('error', (msg) => console.log(`${msg} off`))
      rootSocket.io.off('reconnect', (data) => console.log(`${data} off`))
      rootSocket.io.off('reconnect_attempt', (data) =>
        console.log(`${data} off`),
      )
      rootSocket.io.off('reconnect_failed', () => console.log(`$ off`))
      rootSocket.io.off('reconnect_error', (data) => console.log(`${data} off`))
    }
  }, [dispatch, handleAuth, rootSocket])

  return rootSocket
}

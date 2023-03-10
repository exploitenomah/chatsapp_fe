import { authenticate } from '@store/auth/slice'
import { addAppAlert } from '@store/notifications/slice'
import { toggleAppLoading, updateLoading } from '@store/ui/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { io, Socket } from 'socket.io-client'

export default function useRoot({
  onConnect,
  onDisconnect,
  onError,
}: {
  onConnect?: (socket: Socket) => void
  onDisconnect?: () => void
  onError?: (msg: string) => void
}) {
  const rootSocket = useMemo(
    () => io(`${process.env.NEXT_PUBLIC_SERVER_URL}`),
    [],
  )

  const dispatch = useDispatch()

  useEffect(() => {
    const tokenInLs = localStorage.getItem('chatsapp_token')
    if (tokenInLs !== null) {
      dispatch(authenticate(tokenInLs))
      dispatch(toggleAppLoading(false))
    }

    rootSocket.onAny((x) => {
      console.log('x', x)
      dispatch(updateLoading(false))
    })

    rootSocket.on('signup', (data) => {
      localStorage.clear()
      localStorage.setItem('chatsapp_token', data.token)
      dispatch(authenticate(data.token))
      dispatch(updateLoading(false))
      //store user
    })

    rootSocket.on('login', (data) => {
      localStorage.clear()
      localStorage.setItem('chatsapp_token', data.token)
      dispatch(authenticate(data.token))
      dispatch(updateLoading(false))
      //store user
    })

    rootSocket.io.on('reconnect', (attempt) => {
      console.error(`${attempt} ==> at root socket`)
      // if (onError) onError(attempt)
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
      if (onError) onError(err.message)
    })

    rootSocket.on('connect', () => {
      console.log('root socket connected')
      if (onConnect) onConnect(rootSocket)
    })

    rootSocket.on('disconnect', (reason) => {
      console.log('root socket disconnected', reason)
      if (onDisconnect) onDisconnect()
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
      if (onError) onError(msg)
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
  }, [dispatch, onConnect, onDisconnect, onError, rootSocket])

  return rootSocket
}

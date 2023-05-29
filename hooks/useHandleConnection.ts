import { Auth } from '@store/auth/initialState'
import { goOffline, goOnline } from '@store/auth/slice'
import { Store } from '@store/index'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useHandleConnection() {
  const [isConnected, setIsConnected] = useState(false)
  const { isOffline } = useSelector<Store, Auth>((store) => store.auth)
  const dispatch = useDispatch()
  const handleConnect = useCallback(() => {
    if (!isConnected) {
      setIsConnected(true)
      isOffline && dispatch(goOnline())
    }
  }, [isConnected, isOffline, dispatch])

  const handleDisconnect = useCallback(
    (reason?: string) => {
      if (
        reason === undefined ||
        reason === 'transport close' ||
        reason === 'transport error' ||
        reason === 'ping timeout'
      ) {
        if (!isConnected) {
          setIsConnected(false)
          !isOffline && dispatch(goOffline())
        }
      }
    },
    [isConnected, isOffline, dispatch],
  )

  return { isConnected, handleConnect, handleDisconnect }
}

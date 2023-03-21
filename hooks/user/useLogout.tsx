import { updateUser } from '@store/friends/slice'
import { logout } from '@store/auth/slice'
import { clearUser } from '@store/user/slice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export default function useLogout() {
  const dispatch = useDispatch()
  const logUserOut = useCallback(() => {
    // dispatch(updateUser(null))
    // dispatch(logout())
    // dispatch(clearUser())
    // localStorage.removeItem('chatsapp_token')
    // }, [dispatch])
  }, [])

  return logUserOut
}

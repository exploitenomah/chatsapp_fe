import { logout } from '@store/auth/slice'
import { resetConversations } from '@store/conversations/slice'
import { resetFriends } from '@store/friends/slice'
import { resetMessages } from '@store/messages/slice'
import { resetNotifications } from '@store/notifications/slice'
import { resetUI } from '@store/ui/slice'
import { clearUser } from '@store/user/slice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export default function useLogout() {
  const dispatch = useDispatch()
  const logUserOut = useCallback(() => {
    dispatch(resetConversations())
    dispatch(resetFriends())
    dispatch(resetMessages())
    dispatch(resetNotifications())
    dispatch(resetUI())
    dispatch(logout())
    dispatch(clearUser())
    localStorage.removeItem('chatsapp_token')
  }, [dispatch])

  return logUserOut
}

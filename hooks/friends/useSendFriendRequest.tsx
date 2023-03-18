import { Store } from '@store/index'
import useFriends from '@sockets/useFriends'
import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useEmitter from '../useEmitters'
import { User } from '@store/user/initialState'
import { friendsEvents } from '@store/friends/initialState'

export default function useSendFriendRequest() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const user = useSelector<Store, User>((store) => store.user)

  const handleSendFriendRequest = useCallback(
    (recipient: string) => {
      friendsSocketEmitters.request({ recipient, requester: user._id })
    },
    [friendsSocketEmitters, user._id],
  )
  return handleSendFriendRequest
}

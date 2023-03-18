import useEmitter from '@hooks/useEmitters'
import useFriends from '@sockets/useFriends'
import { friendsEvents } from '@store/friends/initialState'
import { useCallback } from 'react'

export default function useGetOneFriendship() {
  const friendsSocket = useFriends()
  const friendsSocketEmitters = useEmitter(friendsSocket, friendsEvents)
  const getOneFriendship = useCallback(
    (userOneId: string, userTwoId: string) => {
      const query = {
        $or: [{ requester: userOneId, recipient: userTwoId}],
      }
    },
    [],
  )
  return getOneFriendship
}

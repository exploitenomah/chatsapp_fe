import { FriendsState } from '@store/friends/initialState'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@store/index'
import {
  updateFriendRequestsNotificationCount,
  updateTotalNotificationsCount,
} from '@store/friends/slice'

export default function useUpdateFriendsNotifications() {
  const { friendRequests, pendingFriends, user } = useSelector<
    Store,
    FriendsState
  >((store) => store.friends)
  const dispatch = useDispatch()

  useEffect(() => {
    const friendRequestsNotificationCount = friendRequests.filter(
      (friendReq) =>
        friendReq.seen === false && friendReq.requester._id !== user?._id,
    ).length
    dispatch(
      updateFriendRequestsNotificationCount(friendRequestsNotificationCount),
    )
    dispatch(updateTotalNotificationsCount(friendRequestsNotificationCount))
  }, [dispatch, friendRequests, pendingFriends, user?._id])
}

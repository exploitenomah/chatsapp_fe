import RightChevron from '@assets/RightChevron'
import Button from '@components/HTML/Button'
import { FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import Badge from '../Badge'

export const FriendRequestsCountBadge = () => {
  const { friendRequestsNotificationCount } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )

  if (friendRequestsNotificationCount <= 0) return null

  return (
    <>
      <Badge>{friendRequestsNotificationCount}</Badge>
    </>
  )
}

import { Friend, FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { User } from '@store/user/initialState'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'

const FriendItem = ({ friendItem }: { friendItem: Friend }) => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const friend = useMemo(() => {
    if (friendItem.requester._id === authenticatedUser._id)
      return friendItem.recipient
    else return friendItem.requester
  }, [friendItem.requester, friendItem.recipient, authenticatedUser._id])

  if (authenticatedUser._id === friend._id) return null

  return (
    <div
      className={`w-full h-[72px] flex items-center ${
        userInPreview?._id === friend._id
          ? 'bg-secondary-darkest'
          : 'bg-primary-default hover:bg-secondary-default '
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar width={49} height={49} />
        </div>
        <div className='h-[72px] basis-auto flex grow flex-col justify-center items-start border-t border-t-contrast-secondary/20'>
          <div className='text-contrast-strong text-base'>{`${friend.nickName}`}</div>
          <div className='text-contrast-secondary text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]'>
            {`${friend.firstName} ${friend.lastName}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FriendsList() {
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)
  if (friends.length <= 0) return null
  return (
    <>
      <>
        {friends.map((friend) => (
          <FriendItem friendItem={friend} key={friend._id} />
        ))}
      </>
    </>
  )
}

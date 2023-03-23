import useHandleMessageButtonClick from '@hooks/conversations/useHandleMessageButtonClick'
import { Friend, FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { removeUserInPreview, updateUserInPreview } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { MessageButton } from '../User/Profile'

const FriendItem = ({ friendItem }: { friendItem: Friend }) => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)

  const dispatch = useDispatch()

  const friend = useMemo(() => {
    if (friendItem.requester._id === authenticatedUser._id)
      return friendItem.recipient
    else return friendItem.requester
  }, [friendItem.requester, friendItem.recipient, authenticatedUser._id])

  const handleMessageButtonClick = useHandleMessageButtonClick([
    authenticatedUser._id,
    friend._id,
  ])

  if (authenticatedUser._id === friend._id) return null

  return (
    <div
      onClick={() => {
        if (userInPreview?._id === friend._id) return
        dispatch(removeUserInPreview())
        setTimeout(() => {
          dispatch(updateUserInPreview(friend))
        }, 150)
      }}
      className={`w-full flex items-center ${
        userInPreview?._id === friend._id
          ? 'bg-secondary-darkest/50'
          : 'bg-primary-default'
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar width={49} height={49} />
        </div>
        <div className='basis-auto flex grow justify-between items-center py-3 border-t border-t-contrast-secondary/20'>
          <div>
            <div className='text-contrast-strong text-base'>{`${friend.nickName}`}</div>
            <div className='text-contrast-secondary text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]'>
              {`${friend.firstName} ${friend.lastName}`}
            </div>
          </div>
          <MessageButton
            onClick={(e) => {
              e.stopPropagation()
              handleMessageButtonClick()
            }}
          />
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

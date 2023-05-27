import useHandleMessageButtonClick from '@hooks/conversations/useHandleMessageButtonClick'
import { Friend, FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  removeUserInPreview,
  toggleShowFriendsDrawer,
  updateUserInPreview,
} from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { MessageButton } from '../User/Profile'
import { SearchState } from '@store/search/initialState'
import SearchableContent from '../Search/SearchableContent'

export const FriendItem = ({ friendItem }: { friendItem: User }) => {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const dispatch = useDispatch()
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { searchText } = useSelector<Store, SearchState>(
    (store) => store.search,
  )
  const handleMessageButtonClick = useHandleMessageButtonClick([
    authenticatedUser._id,
    friendItem._id,
  ])

  return (
    <div
      onClick={() => {
        if (userInPreview?._id === friendItem._id) return
        dispatch(removeUserInPreview())
        setTimeout(() => {
          dispatch(updateUserInPreview(friendItem))
        }, 150)
      }}
      className={`w-full flex items-center ${
        userInPreview?._id === friendItem._id
          ? 'bg-secondary-darkest/50'
          : 'bg-primary-default'
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar
            width={49}
            height={49}
            src={friendItem.profileImage?.path}
            alt={''}
          />
        </div>
        <div className='basis-auto flex grow justify-between items-center py-3 border-t border-t-contrast-secondary/20'>
          <div>
            <div className='text-contrast-strong text-base'>
              <SearchableContent
                text={friendItem.nickName}
                search={searchText}
              />
            </div>
            <div className='text-contrast-secondary text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]'>
              <SearchableContent
                text={`${friendItem.firstName} ${friendItem.lastName}`}
                search={searchText}
              />
            </div>
          </div>
          <MessageButton
            onClick={(e) => {
              e.stopPropagation()
              handleMessageButtonClick()
              dispatch(removeUserInPreview())
              dispatch(toggleShowFriendsDrawer())
            }}
          />
        </div>
      </div>
    </div>
  )
}

const Friendship = ({ friendItem }: { friendItem: Friend }) => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  const friend = useMemo(() => {
    if (friendItem.requester._id === authenticatedUser._id)
      return friendItem.recipient
    else return friendItem.requester
  }, [friendItem.requester, friendItem.recipient, authenticatedUser._id])

  if (authenticatedUser._id === friend._id) return null
  return <FriendItem friendItem={friend} />
}
export default function FriendsList() {
  const { friends } = useSelector<Store, FriendsState>((store) => store.friends)
  if (friends.length <= 0) return null
  return (
    <>
      <>
        {friends.map((friend) => (
          <Friendship friendItem={friend} key={friend._id} />
        ))}
      </>
    </>
  )
}

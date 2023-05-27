import { FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { removeUserInPreview, updateUserInPreview } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../Avatar'
import { AddFriendButton } from '../User/Profile'

export const SuggestionItem = ({ user }: { user: User }) => {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)

  const dispatch = useDispatch()
  const isActive = useMemo(
    () => userInPreview?._id === user._id,
    [user._id, userInPreview?._id],
  )
  const handleSuggestionClick = useCallback(() => {
    if (userInPreview && userInPreview._id === user._id) return
    dispatch(removeUserInPreview())
    setTimeout(() => {
      dispatch(updateUserInPreview({ ...user }))
    }, 320)
  }, [dispatch, user, userInPreview])

  if (authenticatedUser._id === user._id) return null

  return (
    <div
      onClick={() => handleSuggestionClick()}
      className={`w-full h-[72px] flex items-center ${
        isActive
          ? 'bg-secondary-darkest'
          : 'bg-primary-default hover:bg-secondary-default '
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full border-t border-t-contrast-secondary/20'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar
            width={49}
            height={49}
            src={user.profileImage?.path}
            alt={''}
          />
        </div>
        <div className='h-[72px] basis-auto flex grow flex-col justify-center items-start'>
          <div className='text-contrast-strong text-base'>{`${user.nickName}`}</div>
          <div
            className={`${
              isActive ? 'text-contrast-strong' : 'text-contrast-secondary'
            } text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]`}
          >
            {`${user.firstName} ${user.lastName}`}
          </div>
        </div>
        <AddFriendButton show={true} recipient={user._id} />
      </div>
    </div>
  )
}

export default function SuggestionsList() {
  const { suggestions } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )

  return (
    <>
      <div>
        {suggestions.map((suggestion) => (
          <SuggestionItem user={suggestion} key={suggestion._id} />
        ))}
      </div>
    </>
  )
}

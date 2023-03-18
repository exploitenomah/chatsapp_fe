import CloseIcon from '@assets/CloseIcon'
import Button from '@components/HTML/Button'
import { FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { removeUserInPreview, updateUserInPreview } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerClasses } from '../App/AppHeader'
import SecondaryPanel from '../App/RightPanel/SecondaryPanel'
import Profile from './Profile'

export default function UserPreview() {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const { pendingFriends, friendRequests, friends } = useSelector<
    Store,
    FriendsState
  >((store) => store.friends)

  const friendship = useMemo(
    () =>
      [...pendingFriends, ...friendRequests, ...friends].find(
        (item) =>
          item.requester === userInPreview?._id ||
          item.recipient === userInPreview?._id,
      ),
    [friendRequests, friends, pendingFriends, userInPreview?._id],
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      userInPreview &&
      friendship &&
      !friendship.isValid &&
      friendship.requester === userInPreview._id &&
      !userInPreview.hasSentRequest
    ) {
      dispatch(
        updateUserInPreview({
          ...userInPreview,
          hasSentRequest: true,
          isPending: false,
        }),
      )
    }
  }, [dispatch, friendship, userInPreview])

  useEffect(() => {
    if (
      userInPreview &&
      friendship &&
      !friendship.isValid &&
      friendship.recipient === userInPreview._id &&
      !userInPreview.isPending
    ) {
      dispatch(
        updateUserInPreview({
          ...userInPreview,
          isPending: true,
          hasSentRequest: false,
        }),
      )
    }
  }, [dispatch, friendship, userInPreview])

  if (userInPreview?._id === authenticatedUser._id) return null
  return (
    <SecondaryPanel show={Boolean(userInPreview)}>
      <div className='border-l-contrast-secondary/20 border-l h-full'>
        <div className={`${headerClasses} px-5 h-[59px] flex items-center`}>
          <header className='flex justify-between items-center grow'>
            <p>User Info</p>
            <Button
              className='p-0'
              onClick={() => dispatch(removeUserInPreview())}
            >
              <CloseIcon />
            </Button>
          </header>
        </div>
        {userInPreview && (
          <Profile friendship={friendship} user={userInPreview} />
        )}
      </div>
    </SecondaryPanel>
  )
}

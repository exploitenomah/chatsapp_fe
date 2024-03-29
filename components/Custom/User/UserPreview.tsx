import CloseIcon from '@assets/CloseIcon'
import Button from '@components/HTML/Button'
import { Friend, FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { removeUserInPreview, updateUserInPreview } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerClasses } from '../App/AppHeader'
import Profile from './Profile'
import useFetchBlocking from "@hooks/blockings/useFetchBlocking"

const useUpdateUserInPreviewEffect = (friendship?: Friend) => {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)

  const dispatch = useDispatch()
useFetchBlocking()
  useEffect(() => {
    if (
      userInPreview &&
      friendship &&
      !friendship.isValid &&
      friendship.requester._id === userInPreview._id &&
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
      friendship.isValid &&
      (userInPreview.hasSentRequest || userInPreview.isPending)
    ) {
      dispatch(
        updateUserInPreview({
          ...userInPreview,
          hasSentRequest: false,
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
      friendship.recipient._id === userInPreview._id &&
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

  useEffect(() => {
    if (
      userInPreview &&
      !friendship &&
      (userInPreview.hasSentRequest || userInPreview.isPending)
    ) {
      dispatch(
        updateUserInPreview({
          ...userInPreview,
          hasSentRequest: false,
          isPending: false,
        }),
      )
    }
  }, [dispatch, friendship, userInPreview])
}

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
          item.requester._id === userInPreview?._id ||
          item.recipient._id === userInPreview?._id,
      ),
    [friendRequests, friends, pendingFriends, userInPreview?._id],
  )

  const dispatch = useDispatch()
  useUpdateUserInPreviewEffect(friendship)

  if (userInPreview?._id === authenticatedUser._id) return null
  return (
    <>
      <div className='h-full'>
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
    </>
  )
}

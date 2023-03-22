import { Store } from '@store/index'
import { Friend, FriendsState } from '@store/friends/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { UI } from '@store/ui/initialState'
import { useCallback, useMemo } from 'react'
import Avatar from '../Avatar'
import Button from '@components/HTML/Button'
import { updateUserInPreview, removeUserInPreview } from '@store/ui/slice'
import useRemoveFriend from '@hooks/friends/useRemoveFriend'

const PendingFriendItem = ({ pendingFriend }: { pendingFriend: Friend }) => {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const active = useMemo(
    () => userInPreview?._id === pendingFriend.recipient._id,
    [userInPreview?._id, pendingFriend.recipient],
  )
  const cancelRequest = useRemoveFriend()
  const dispatch = useDispatch()

  const handleOpenInPreview = useCallback(() => {
    dispatch(removeUserInPreview())
    setTimeout(() => {
      dispatch(updateUserInPreview(pendingFriend.recipient))
    }, 150)
  }, [dispatch, pendingFriend.recipient])

  return (
    <>
      <div
        className={`w-full flex items-center pb-2 ${
          active ? 'bg-secondary-darkest/25' : 'bg-primary-default'
        }`}
      >
        <>
          <div className='cursor-pointer flex items-center pr-[6px] w-full'>
            <div
              onClick={handleOpenInPreview}
              className='px-[15px] flex justify-center items-center shrink-0 self-start'
            >
              <Avatar width={70} height={70} />
            </div>
            <div className='basis-auto flex grow flex-col justify-center items-start border-t border-t-contrast-secondary/20'>
              <div
                className='cursor-pointer w-full'
                onClick={handleOpenInPreview}
              >
                <div className='text-contrast-strong text-base'>{`${pendingFriend.recipient.nickName}`}</div>
                <div className='text-contrast-strong/60 text-base'>{`${pendingFriend.recipient.firstName} ${pendingFriend.recipient.lastName}`}</div>
              </div>
              <div className='flex justify-start items-center mt-3 gap-x-4'>
                <Button
                  onClick={() => cancelRequest(pendingFriend._id)}
                  className='text-accent-danger shadow-none p-0 bg-transparentpy-1.5'
                >
                  Cancel Request
                </Button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  )
}
export default function PendingFriendsList() {
  const { pendingFriends } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  if (pendingFriends.length <= 0) return null
  return (
    <>
      <>
        {pendingFriends.map((pendingFriend) => (
          <PendingFriendItem
            pendingFriend={pendingFriend}
            key={pendingFriend._id}
          />
        ))}
      </>
    </>
  )
}

import { Store } from '@store/index'
import { Friend, FriendsState } from '@store/friends/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { UI } from '@store/ui/initialState'
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import Avatar from '../Avatar'
import Button from '@components/HTML/Button'
import { removeUserInPreview, updateUserInPreview } from '@store/ui/slice'
import useAcceptFriend from '@hooks/friends/useAcceptFriend'
import useRemoveFriend from '@hooks/friends/useRemoveFriend'
import { User } from '@store/user/initialState'
import useFriendRequestSeen from '@hooks/friends/useFriendRequestSeen'
import useElementIsInView from '@hooks/useElementIsInView'

const useUpdateFriendRequestSeen = (
  elementRef: MutableRefObject<HTMLDivElement | null>,
  friendRequest: Friend,
) => {
  const { _id: userId } = useSelector<Store, User>((store) => store.user)
  const { showFriendRequestsDrawer } = useSelector<Store, UI>(
    (store) => store.ui,
  )
  const friendRequestSeen = useFriendRequestSeen()
  const elementInViewHandler = useElementIsInView()
  const handleElementInView = useCallback(
    (currentElementRef: HTMLDivElement | null) => {
      if (
        showFriendRequestsDrawer &&
        elementRef.current &&
        friendRequest.recipient._id === userId &&
        friendRequest.seen === false
      ) {
        elementInViewHandler(currentElementRef, () => {
          friendRequestSeen(friendRequest._id)
        })
      }
    },
    [
      elementRef,
      friendRequest._id,
      friendRequest.recipient._id,
      friendRequest.seen,
      friendRequestSeen,
      elementInViewHandler,
      showFriendRequestsDrawer,
      userId,
    ],
  )

  useEffect(() => {
    const currentElementRef = elementRef.current
    handleElementInView(currentElementRef)
    currentElementRef?.parentElement?.addEventListener('scroll', () => {
      handleElementInView(currentElementRef)
    })
    return () => {
      currentElementRef?.parentElement?.removeEventListener('scroll', () => {
        handleElementInView(currentElementRef)
      })
    }
  }, [elementRef, handleElementInView])
  return
}

const FriendRequestItem = ({ friendRequest }: { friendRequest: Friend }) => {
  const friendRequestRef = useRef<HTMLDivElement | null>(null)
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const active = useMemo(
    () => userInPreview?._id === friendRequest.requester._id,
    [userInPreview?._id, friendRequest.requester],
  )
  const acceptRequest = useAcceptFriend()
  const cancelRequest = useRemoveFriend()
  const dispatch = useDispatch()

  const handleOpenInPreview = useCallback(() => {
    dispatch(removeUserInPreview())
    setTimeout(() => {
      dispatch(updateUserInPreview(friendRequest.requester))
    }, 150)
  }, [dispatch, friendRequest.requester])

  useUpdateFriendRequestSeen(friendRequestRef, friendRequest)

  return (
    <>
      <div
        onClick={handleOpenInPreview}
        ref={friendRequestRef}
        className={`w-full flex items-center pb-2 ${
          active ? 'bg-secondary-darkest/25' : 'bg-primary-default'
        }`}
      >
        <>
          <div className='cursor-pointer flex items-center pr-[6px] w-full'>
            <div className='px-[15px] flex justify-center items-center shrink-0 self-start'>
              <Avatar width={70} height={70} />
            </div>
            <div className='basis-auto flex grow flex-col justify-center items-start border-t border-t-contrast-secondary/20'>
              <div
                className='cursor-pointer w-full'
                onClick={handleOpenInPreview}
              >
                <div className='text-contrast-strong text-lg'>{`${friendRequest.requester.nickName}`}</div>
                <div className='text-contrast-strong/60 text-sm'>{`${friendRequest.requester.firstName} ${friendRequest.requester.lastName}`}</div>
              </div>
              <div className='flex justify-start items-center mt-3 gap-x-4'>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    acceptRequest(friendRequest._id)
                  }}
                  className='bg-accent-light text-primary-default py-1.5'
                >
                  Confirm
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    cancelRequest(friendRequest._id)
                  }}
                  className='bg-accent-danger text-primary-dark py-1.5'
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  )
}

export default function FriendRequestsList() {
  const { friendRequests } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )
  if (friendRequests.length <= 0) return null
  return (
    <>
      <>
        {friendRequests.map((request) => (
          <FriendRequestItem friendRequest={request} key={request._id} />
        ))}
      </>
    </>
  )
}

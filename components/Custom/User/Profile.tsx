import AddFriendIcon from '@assets/AddFriendIcon'
import BlockedIcon from '@assets/BlockedIcon'
import CancelRequestIcon from '@assets/CancelRequestIcon'
import AcceptRequestIcon from '@assets/AcceptRequestIcon'
import Button from '@components/HTML/Button'
import useSendFriendRequest from '@hooks/friends/useSendFriendRequest'
import { UserInPreview } from '@store/ui/initialState'
import Avatar from '../Avatar'
import useRemoveFriend from '@hooks/friends/useRemoveFriend'
import useAcceptFriend from '@hooks/friends/useAcceptFriend'
import { Friend } from '@store/friends/initialState'
import CloseIcon from '@assets/CloseIcon'
import {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Store } from '@store/index'
import { User } from '@store/user/initialState'
import { useDispatch, useSelector } from 'react-redux'
import useHandleMessageButtonClick from '@hooks/conversations/useHandleMessageButtonClick'
import { removeUserInPreview, toggleShowFriendsDrawer } from '@store/ui/slice'

export const AddFriendButton = ({
  show,
  recipient,
}: {
  show: boolean
  recipient: string
}) => {
  const sendFriendRequest = useSendFriendRequest()
  if (!show) return null
  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          sendFriendRequest(recipient)
        }}
        className='p-0 flex gap-x-3 items-center text-accent-dark'
      >
        <AddFriendIcon />
        Add friend
      </Button>
    </>
  )
}

const RemoveFriendButton = ({
  show,
  friendshipId,
  children,
  useConfirmation,
  clickConfirmed,
  onClick,
  done,
  className,
}: {
  show: boolean
  friendshipId?: string
  children: ReactNode | ReactNode[]
  useConfirmation?: boolean
  clickConfirmed?: boolean
  onClick?: () => void
  done?: () => void
  className?: string
}) => {
  const cancelRequest = useRemoveFriend()

  useEffect(() => {
    if (
      useConfirmation === true &&
      clickConfirmed === true &&
      friendshipId !== undefined
    ) {
      cancelRequest(friendshipId)
      done && done()
    }
  }, [cancelRequest, clickConfirmed, done, friendshipId, useConfirmation])

  if (!show || !friendshipId) return null
  return (
    <>
      <Button
        onClick={() => {
          onClick && onClick()
          !useConfirmation && cancelRequest(friendshipId)
        }}
        className={`${className} p-0 text-accent-danger`}
      >
        {children}
      </Button>
    </>
  )
}

const AcceptRequestButton = ({
  show,
  friendshipId,
}: {
  show: boolean
  friendshipId?: string
}) => {
  const acceptRequest = useAcceptFriend()
  if (!show || !friendshipId) return null
  return (
    <>
      <Button
        onClick={() => acceptRequest(friendshipId)}
        className='p-0 flex gap-x-2 items-center text-accent-dark'
      >
        <AcceptRequestIcon />
        Confirm
      </Button>
    </>
  )
}

const ProfileFooter = ({
  user,
  friendship,
}: {
  user: UserInPreview
  friendship?: Friend
}) => {
  const [removeFriendConfirmed, setRemoveFriendConfirmed] = useState(false)
  const [showConfirmRemoveFriend, setShowConfirmRemoveFriend] = useState(false)
  const onRemoveFriendClick = useCallback(() => {
    setShowConfirmRemoveFriend(true)
  }, [])

  const confirmRemoveFriend = useCallback(() => {
    setShowConfirmRemoveFriend(false)
    setRemoveFriendConfirmed(true)
  }, [])

  const cancelRemoveFriend = useCallback(() => {
    setShowConfirmRemoveFriend(false)
    setRemoveFriendConfirmed(false)
  }, [])

  return (
    <>
      <div className='relative'>
        {friendship?.isValid && showConfirmRemoveFriend && (
          <div className='absolute bottom-[0%] z-10 bg-primary-dark w-5/6 px-4 py-6 rounded-lg flex flex-col justify-center items-center text-center'>
            <span>
              Are you sure you want to remove
              <span className='text-accent-dark'> {user.nickName} </span> from
              your friends?
              <br />
              <b className='text-xs text-contrast-secondary'>
                You will no longer be able to send to or recieve messages from
                them.
              </b>
            </span>
            <div className='flex gap-x-2 items-center justify-center shadow-none'>
              <Button
                className='text-accent-danger'
                onClick={() => confirmRemoveFriend()}
              >
                Remove
              </Button>
              <Button
                className='shadow-none'
                onClick={() => cancelRemoveFriend()}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        <RemoveFriendButton
          useConfirmation={true}
          clickConfirmed={removeFriendConfirmed}
          friendshipId={friendship?._id}
          show={friendship?.isValid ? true : false}
          onClick={onRemoveFriendClick}
          done={() => setRemoveFriendConfirmed(false)}
          className='shadow-none'
        >
          <span className='p-0 flex gap-x-[22px] items-center text-base'>
            <CancelRequestIcon className='w-[24px] h-[24px] ml-1 mt-1' />
            Remove Friend
          </span>
        </RemoveFriendButton>
      </div>
      <Button className='p-0 flex gap-x-6 items-center text-accent-danger text-base shadow-none'>
        <BlockedIcon /> <span>Block {user.nickName}</span>
      </Button>
    </>
  )
}

export const MessageButton = ({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        className='bg-accent-default py-2 px-3 text-contrast-strong text-center'
      >
        Message
      </Button>
    </>
  )
}

export default function Profile({
  user,
  friendship,
}: {
  user: UserInPreview
  friendship?: Friend
}) {
  const userInState = useSelector<Store, User>((store) => store.user)

  const handleMessageButtonClick = useHandleMessageButtonClick([
    user._id,
    userInState._id,
  ])
  const dispatch = useDispatch()

  const handleMsgBtnClick = useCallback(() => {
    handleMessageButtonClick()
    dispatch(removeUserInPreview())
    dispatch(toggleShowFriendsDrawer(false))
  }, [dispatch, handleMessageButtonClick])

  return (
    <>
      <div className='flex flex-col gap-y-2.5'>
        <div className='bg-primary-default text-center px-4 py-7'>
          <div className='flex justify-center items-center mb-4'>
            <Avatar
              width={200}
              height={200}
              src={user.profileImage?.path}
              alt={''}
            />
          </div>
          <div className='flex flex-col justify-start items-center'>
            <h3 className='text-2xl'>{`${user.nickName}`}</h3>
            <p className='text-base text-contrast-primary/75 mx-auto'>{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div className='flex justify-around items-center gap-x-1 mt-4 mx-auto w-4/5'>
            <AddFriendButton
              recipient={user._id}
              show={
                !friendship ||
                (!friendship?.isValid &&
                  !user.isPending &&
                  !user.hasSentRequest)
              }
            />
            <RemoveFriendButton
              friendshipId={friendship?._id}
              show={user.isPending ? true : false}
            >
              <span className='p-0 flex gap-x-3 items-center'>
                <CancelRequestIcon />
                Cancel Request
              </span>
            </RemoveFriendButton>
            <AcceptRequestButton
              friendshipId={friendship?._id}
              show={!friendship?.isValid && user.hasSentRequest ? true : false}
            />
            <RemoveFriendButton
              friendshipId={friendship?._id}
              show={!friendship?.isValid && user.hasSentRequest ? true : false}
            >
              <span className='p-0 flex gap-x-3 items-center'>
                <CloseIcon />
                Decline
              </span>
            </RemoveFriendButton>
            <div
              className={`${
                friendship?.isValid ? 'flex' : 'hidden'
              } p-0 gap-y-2 flex-col items-center justify-center`}
            >
              <span className='text-accent-bright text-base'>Friends</span>
              <MessageButton onClick={handleMsgBtnClick} />
            </div>
          </div>
        </div>
        <div className='bg-primary-default py-8 px-5'>
          <h4 className='text-contrast-primary/75 text-[15px]'>About</h4>
          <p className='text-base'>{`About user`}</p>
        </div>
        <div className='bg-primary-default py-8 px-5 flex flex-col gap-y-4'>
          <ProfileFooter user={user} friendship={friendship} />
        </div>
      </div>
    </>
  )
}

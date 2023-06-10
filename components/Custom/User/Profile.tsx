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
  useMemo,
  useState,
} from 'react'
import { Store } from '@store/index'
import { User } from '@store/user/initialState'
import { useDispatch, useSelector } from 'react-redux'
import useHandleMessageButtonClick from '@hooks/conversations/useHandleMessageButtonClick'
import { removeUserInPreview, toggleShowFriendsDrawer } from '@store/ui/slice'
import useBlockUser from '@hooks/blockings/useBlockUser'
import { Blocking, Blockings } from '@store/blockings/initialState'
import useUnBlockUser from '@hooks/blockings/useUnblockUser'
import useUnblockUser from '@hooks/blockings/useUnblockUser'

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
export const RemoveFriendButton = ({
  show,
  friendshipId,
  children,
  onClick,
}: {
  show: boolean
  friendshipId?: string
  children: ReactNode | ReactNode[]
  onClick?: () => void
}) => {
  const cancelRequest = useRemoveFriend()
  if (!show) return null
  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          onClick && onClick()
          friendshipId && cancelRequest(friendshipId)
        }}
        className='p-0 flex gap-x-3 items-center text-accent-danger'
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
const BlockUserButton = ({
  show,
  user,
  onClick,
  showIcon,
}: {
  show: boolean
  user: User
  onClick: () => void
  showIcon?: boolean
}) => {
  const blockUser = useBlockUser()
  if (!show) return null
  return (
    <>
      <Button
        onClick={() => {
          onClick && onClick()
          blockUser(user._id)
        }}
        className='p-0 flex gap-x-6 items-center text-accent-danger text-base shadow-none'
      >
        {showIcon && <BlockedIcon />}
        <span>Block {user.nickName}</span>
      </Button>
    </>
  )
}
const UnBlockUserButton = ({
  show,
  blockee,
  onClick,
  blockingId,
}: {
  show: boolean
  blockee: string
  onClick: () => void
  blockingId: string
}) => {
  const unBlockUser = useUnBlockUser()
  if (!show) return null
  return (
    <>
      <Button
        onClick={() => {
          onClick && onClick()
          unBlockUser({ blockee, blockingId })
        }}
        className='p-0 flex gap-x-6 items-center text-accent-primary text-base shadow-none'
      >
        <span>Unblock</span>
      </Button>
    </>
  )
}

const ProfileFooterUnFriendButton = ({
  user,
  friendship,
}: {
  user: UserInPreview
  friendship?: Friend
}) => {
  const [showConfirmRemoveFriend, setShowConfirmRemoveFriend] = useState(false)
  const onRemoveFriendClick = useCallback(() => {
    setShowConfirmRemoveFriend(true)
  }, [])

  const cancelRemoveFriend = useCallback(() => {
    setShowConfirmRemoveFriend(false)
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
              <RemoveFriendButton
                onClick={() => setShowConfirmRemoveFriend(false)}
                show
                friendshipId={friendship?._id}
              >
                Remove Friend
              </RemoveFriendButton>
              <Button
                className='shadow-none'
                onClick={() => cancelRemoveFriend()}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {friendship?.isValid && (
          <Button
            onClick={onRemoveFriendClick}
            className='p-0 flex gap-x-6 items-center text-accent-danger text-base shadow-none'
          >
            <span className='p-0 flex gap-x-[22px] items-center text-base'>
              <CancelRequestIcon className='w-[24px] h-[24px] ml-1 mt-1' />
              Remove Friend
            </span>
          </Button>
        )}
      </div>
    </>
  )
}

const ProfileFooterBlockButton = ({
  user,
  blocking,
}: {
  user: UserInPreview
  blocking?: Blocking
}) => {
  const [showConfirmBlockUser, setShowConfirmBlockUser] = useState(false)
  const blockUser = useBlockUser()
  const onBlockUserClick = useCallback(() => {
    setShowConfirmBlockUser(true)
    blockUser(user._id)
  }, [blockUser, user._id])

  const cancelBlockUser = useCallback(() => {
    setShowConfirmBlockUser(false)
  }, [])

  return (
    <>
      <div className='relative'>
        {!blocking && showConfirmBlockUser && (
          <div className='absolute bottom-[0%] z-10 bg-primary-dark w-5/6 px-4 py-6 rounded-lg flex flex-col justify-center items-center text-center'>
            <span>
              Are you sure you want to <b>block</b>
              <span className='text-accent-dark'> {user.nickName} </span>?
              <br />
              <b className='text-xs text-contrast-secondary'>
                You will no longer be able to send to or recieve messages from
                them.
              </b>
            </span>
            <div className='flex gap-x-2 items-center justify-center shadow-none'>
              <BlockUserButton
                onClick={() => onBlockUserClick()}
                show
                user={user}
              />
              <Button className='shadow-none' onClick={() => cancelBlockUser()}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {!blocking && (
          <Button
            onClick={() => setShowConfirmBlockUser(true)}
            className='p-0 flex gap-x-6 items-center text-accent-danger text-base shadow-none'
          >
            <BlockedIcon /> <span>Block {user.nickName}</span>
          </Button>
        )}
      </div>
    </>
  )
}

const ProfileFooterUnBlockUserButton = ({
  user,
  blocking,
}: {
  user: UserInPreview
  blocking?: Blocking
}) => {
  const [showConfirmUnBlockUser, setShowConfirmUnBlockUser] = useState(false)
  const unblockUser = useUnblockUser()
  const onUnBlockUserClick = useCallback(() => {
    setShowConfirmUnBlockUser(false)
    if (blocking?._id)
      unblockUser({ blockee: user._id, blockingId: blocking._id })
  }, [unblockUser, user._id, blocking?._id])

  const cancelUnBlockUser = useCallback(() => {
    setShowConfirmUnBlockUser(false)
  }, [])

  return (
    <>
      <div className='relative'>
        {blocking && showConfirmUnBlockUser && (
          <div className='absolute bottom-[0%] z-10 bg-primary-dark w-5/6 px-4 py-6 rounded-lg flex flex-col justify-center items-center text-center'>
            <span>
              <b>unblock</b>
              <span className='text-accent-dark'> {user.nickName} </span>?
              <br />
              <b className='text-xs text-contrast-secondary'>
                You will be able to send and recieve messages from them.
              </b>
            </span>
            <div className='flex gap-x-2 items-center justify-center shadow-none'>
              <UnBlockUserButton
                onClick={() => onUnBlockUserClick()}
                show
                blockee={user._id}
                blockingId={blocking._id}
              />
              <Button
                className='shadow-none'
                onClick={() => cancelUnBlockUser()}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        {blocking && (
          <Button
            onClick={() => setShowConfirmUnBlockUser(true)}
            className='p-0 flex gap-x-6 items-center text-accent-primary text-base shadow-none'
          >
            <span>Unblock {user.nickName}</span>
          </Button>
        )}
      </div>
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
  const { blockings } = useSelector<Store, Blockings>(
    (store) => store.blockings,
  )
  const blocking = useMemo(
    () =>
      blockings.find(
        (blocking) =>
          blocking.blocker === user._id || blocking.blockee === user._id,
      ),
    [blockings, user._id],
  )
  console.log(blockings, blocking)
  return (
    <>
      <ProfileFooterUnFriendButton friendship={friendship} user={user} />
      <ProfileFooterBlockButton blocking={blocking} user={user} />
      <ProfileFooterUnBlockUserButton blocking={blocking} user={user} />
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

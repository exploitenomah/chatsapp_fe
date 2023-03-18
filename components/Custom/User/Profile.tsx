import AddFriendIcon from '@assets/AddFriendIcon'
import BlockedIcon from '@assets/BlockedIcon'
import CancelRequestIcon from '@assets/CancelRequestIcon'
import AcceptRequestIcon from '@assets/AcceptRequestIcon'
import Button from '@components/HTML/Button'
import useSendFriendRequest from '@hooks/friends/useSendFriendRequest'
import { UserInPreview } from '@store/ui/initialState'
import Avatar from '../Avatar'
import useRemoveFriend from '@hooks/friends/useRemoveFriend'
import { Friend } from '@store/friends/initialState'

const AddFriendButton = ({
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
        onClick={() => sendFriendRequest(recipient)}
        className='p-0 flex gap-x-3 items-center text-accent-dark mt-4'
      >
        <AddFriendIcon />
        Add friend
      </Button>
    </>
  )
}

const CancelRequestButton = ({
  show,
  friendshipId,
}: {
  show: boolean
  friendshipId?: string
}) => {
  const cancelRequest = useRemoveFriend()

  if (!show || !friendshipId) return null
  return (
    <>
      <Button
        onClick={() => cancelRequest(friendshipId)}
        className='p-0 flex gap-x-3 items-center text-accent-dark mt-4'
      >
        <CancelRequestIcon />
        Cancel Request
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
  if (!show || !friendshipId) return null
  return (
    <>
      <Button className='p-0 flex gap-x-2 items-center text-accent-dark mt-4'>
        <AcceptRequestIcon />
        Confirm
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
  return (
    <>
      <div className='flex flex-col h-full gap-y-2.5'>
        <div className='bg-primary-default text-center px-4 py-7'>
          <div className='flex justify-center items-center mb-4'>
            <Avatar width={200} height={200} />
          </div>
          <div className='flex flex-col justify-start items-center'>
            <h3 className='text-2xl'>{`${user.nickName}`}</h3>
            <p className='text-base text-contrast-primary/75 mx-auto'>{`${user.firstName} ${user.lastName}`}</p>
          </div>
          <div className='flex justify-center items-center'>
            <AddFriendButton
              recipient={user._id}
              show={(!user.isPending && !user.hasSentRequest) || !friendship}
            />
            <CancelRequestButton
              friendshipId={friendship?._id}
              show={user.isPending ? true : false}
            />
            <AcceptRequestButton
              friendshipId={friendship?._id}
              show={user.hasSentRequest ? true : false}
            />
          </div>
        </div>
        <div className='bg-primary-default py-8 px-5'>
          <h4 className='text-contrast-primary/75 text-[15px]'>About</h4>
          <p className='text-base'>{`About user`}</p>
        </div>
        <div className='bg-primary-default py-8 px-5'>
          <Button className='p-0 flex gap-x-6 items-center text-accent-danger text-base'>
            <BlockedIcon /> <span>Block {user.nickName}</span>
          </Button>
        </div>
      </div>
    </>
  )
}

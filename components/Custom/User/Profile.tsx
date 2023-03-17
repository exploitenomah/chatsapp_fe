import AddFriendIcon from '@assets/AddFriendIcon'
import BlockedIcon from '@assets/BlockedIcon'
import CancelRequestIcon from '@assets/CancelRequestIcon'
import Button from '@components/HTML/Button'
import useSendFriendRequest from '@hooks/useSendFriendRequest'
import { User } from '@store/user/initialState'
import Avatar from '../Avatar'

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

const CancelRequestButton = ({ show }: { show: boolean }) => {
  if (!show) return null
  return (
    <>
      <Button className='p-0 flex gap-x-3 items-center text-accent-dark mt-4'>
        <CancelRequestIcon />
        Cancel Request
      </Button>
    </>
  )
}

export default function Profile({
  user,
}: {
  user: User & { isFriend?: boolean; isPending?: boolean }
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
          <div className='flex justify-center items-c'>
            <AddFriendButton
              recipient={user._id}
              show={!user.isPending && !user.isFriend}
            />
            <CancelRequestButton show={user.isPending ? true : false} />
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

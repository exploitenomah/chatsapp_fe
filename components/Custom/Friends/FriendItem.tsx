import { Store } from '@store/index'
import { User } from '@store/user/initialState'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar'

export default function FriendItem({
  user,
  active,
}: {
  user: User
  active: boolean
}) {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  if (authenticatedUser._id === user._id) return null

  return (
    <div
      className={`w-full h-[72px] flex items-center ${
        active
          ? 'bg-secondary-darkest'
          : 'bg-primary-default hover:bg-secondary-default '
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar width={49} height={49} />
        </div>
        <div className='h-[72px] basis-auto flex grow flex-col justify-center items-start border-t border-t-contrast-secondary/20'>
          <div className='text-contrast-strong text-base'>{`${user.nickName}`}</div>
          <div className='text-contrast-secondary text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]'>
            {`${user.firstName} ${user.lastName}`}
          </div>
        </div>
      </div>
    </div>
  )
}

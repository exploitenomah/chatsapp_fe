import CloseIcon from '@assets/CloseIcon'
import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import { Friend, FriendsState } from '@store/friends/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  removeUserInPreview,
  toggleShowAuthenticatedUserProfile,
  updateUserInPreview,
} from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { headerClasses } from '../App/AppHeader'
import Avatar from '../Avatar'
import LeftDrawer from '../LeftDrawer'

const FormTextDisplay = ({
  value,
  onSubmit,
}: {
  value: string
  onSubmit: (value: string) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedValue, setUpdatedValue] = useState(value)

  if (isEditing)
    return (
      <form onSubmit={() => onSubmit(updatedValue)}>
        <Input
          value={updatedValue}
          onChange={(e) => setUpdatedValue(e.target.value)}
        />
      </form>
    )
  return <span className='text-lg'>{`${value}`} </span>
}

export default function AuthenticatedUserPreview() {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { showAuthenticatedUserProfile } = useSelector<Store, UI>(
    (store) => store.ui,
  )
  const dispatch = useDispatch()

  return (
    <LeftDrawer zIndex='z-[400]' show={showAuthenticatedUserProfile}>
      <div>
        <div className='h-full w-full'>
          <div className={`${headerClasses} flex items-center`}>
            <header className='h-[108px] w-full flex justify-between items-center text-contrast-tertiary/80 bg-secondary-default px-6'>
              <div className='h-[59px] flex items-center'>
                <Button
                  className='p-0 w-12'
                  onClick={() =>
                    dispatch(toggleShowAuthenticatedUserProfile(false))
                  }
                >
                  <LeftArrow />
                </Button>
                <span className='text-lg font-medium'>Profile</span>
              </div>
            </header>
          </div>
          <div className='bg-primary-default px-4 py-7'>
            <div className='flex justify-center items-center mb-4'>
              <Avatar width={200} height={200} />
            </div>
            <div className='flex flex-col justify-start items-start gap-y-3'>
              <div>
                <h3 className='text-sm text-accent-darkest'>Nick name </h3>
                <FormTextDisplay
                  value={authenticatedUser.nickName}
                  onSubmit={(upd) => console.log(upd)}
                />
              </div>
              <div>
                <h3 className='text-sm text-accent-darkest'>First name </h3>
                <h3 className='text-lg'>{`${authenticatedUser.firstName}`} </h3>
              </div>
              <div>
                <h3 className='text-sm text-accent-darkest'>Last name </h3>
                <h3 className='text-lg'>{`${authenticatedUser.lastName}`} </h3>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-primary-default py-8 px-5'>
          <div>
            <h3 className='text-sm text-accent-darkest'>About </h3>
            <FormTextDisplay
              value={authenticatedUser.nickName}
              onSubmit={(upd) => console.log(upd)}
            />
          </div>
        </div>
      </div>
    </LeftDrawer>
  )
}

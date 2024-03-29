import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { toggleShowAuthenticatedUserProfile } from '@store/ui/slice'
import { User } from '@store/user/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { headerClasses } from '../App/AppHeader'
import LeftDrawer from '../LeftDrawer'
import ToggleableFormInput from './ToggleableInput'
import UserImage from './UserImage'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className={`${headerClasses} flex items-center pb-4`}>
        <header className='h-[80px] w-full flex justify-between items-end font-light text-contrast-tertiary text-xl bg-secondary-default px-3'>
          <div className='flex items-center gap-x-1'>
            <Button
              className='p-0 w-12 font-light'
              onClick={() =>
                dispatch(toggleShowAuthenticatedUserProfile(false))
              }
            >
              <LeftArrow />
            </Button>
            <span className=''>Profile</span>
          </div>
        </header>
      </div>
    </>
  )
}

const NickNameFormTextDisplay = ({
  nickName,
  dataTestId,
}: {
  nickName: string
  dataTestId?: string
}) => {
  return (
    <>
      <div className='w-full' data-test-id={dataTestId}>
        <h3 className='text-sm text-accent-darkest'>Nick name </h3>
        <ToggleableFormInput
          max={50}
          min={3}
          name={'nickName'}
          value={nickName}
        />
      </div>
    </>
  )
}

const FirstNameFormTextDisplay = ({
  firstName,
  dataTestId,
}: {
  firstName: string
  dataTestId?: string
}) => {
  return (
    <>
      <div className='w-full' data-test-id={dataTestId}>
        <h3 className='text-sm text-accent-darkest'>First name</h3>
        <ToggleableFormInput
          max={250}
          min={3}
          name={'firstName'}
          value={firstName}
        />
      </div>
    </>
  )
}

const LastNameFormTextDisplay = ({
  lastName,
  dataTestId,
}: {
  lastName: string
  dataTestId?: string
}) => {
  return (
    <>
      <div className='w-full' data-test-id={dataTestId}>
        <h3 className='text-sm text-accent-darkest'>Last name </h3>
        <ToggleableFormInput
          max={250}
          min={3}
          name={'lastName'}
          value={lastName}
        />
      </div>
    </>
  )
}

const AboutFormTextDisplay = ({
  about,
  dataTestId,
}: {
  about: string
  dataTestId?: string
}) => {
  return (
    <>
      <div className='w-full' data-test-id={dataTestId}>
        <h3 className='text-sm text-accent-darkest'>About </h3>
        <ToggleableFormInput max={250} min={10} name={'about'} value={about} />
      </div>
    </>
  )
}

export default function AuthenticatedUserPreview() {
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const { showAuthenticatedUserProfile } = useSelector<Store, UI>(
    (store) => store.ui,
  )

  return (
    <LeftDrawer
      data-test-id='authenticated-user-drawer'
      zIndex='z-[400]'
      show={showAuthenticatedUserProfile}
    >
      <div>
        <div className='h-full w-full'>
          <Header />
          {showAuthenticatedUserProfile && (
            <div className='bg-primary-default py-7'>
              <div
                className='flex justify-center items-center mb-4'
                data-test-id='authenticated-user-image'
              >
                <UserImage
                  alt={authenticatedUser.nickName}
                  profileImage={authenticatedUser.profileImage}
                />
              </div>
              <div className='flex flex-col justify-start items-start gap-y-3 w-[90%] mx-auto my-12'>
                <NickNameFormTextDisplay
                  dataTestId='authenticated-user-nickName'
                  nickName={authenticatedUser.nickName}
                />
                <FirstNameFormTextDisplay
                  dataTestId='authenticated-user-firstName'
                  firstName={authenticatedUser.firstName}
                />
                <LastNameFormTextDisplay
                  dataTestId='authenticated-user-lastName'
                  lastName={authenticatedUser.lastName}
                />
                <AboutFormTextDisplay
                  dataTestId='authenticated-user-about'
                  about={authenticatedUser.about}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </LeftDrawer>
  )
}

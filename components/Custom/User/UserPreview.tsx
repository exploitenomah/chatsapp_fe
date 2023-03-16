import CloseIcon from '@assets/CloseIcon'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { removeUserInPreview } from '@store/ui/slice'
import { useDispatch, useSelector } from 'react-redux'
import { headerClasses } from '../App/AppHeader'
import SecondaryPanel from '../App/RightPanel/SecondaryPanel'
import Profile from './Profile'

export default function UserPreview() {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const dispatch = useDispatch()

  return (
    <SecondaryPanel show={Boolean(userInPreview)}>
      <div className='border-l-contrast-secondary/20 border-l h-full'>
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
        {userInPreview && <Profile user={userInPreview} />}
      </div>
    </SecondaryPanel>
  )
}

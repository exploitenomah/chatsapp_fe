import Button from '@components/HTML/Button'
import { useDispatch } from 'react-redux'
import { toggleShowFriendsDrawer } from '@store/ui/slice'

export default function InactiveLeftPanel() {
  const dispatch = useDispatch()
  return (
    <>
      <div className='bg-primary-medium h-full flex justify-center items-center text-center border-b-4 border-b-accent-dark'>
        <div>
          <div className='mb-3'>No Conversations</div>
          <Button
            onClick={() => dispatch(toggleShowFriendsDrawer())}
            className='bg-accent-default hover:brightness-100 hover:scale-105 transition-all duration-500 ease'
          >
            Message Friends
          </Button>
        </div>
      </div>
    </>
  )
}

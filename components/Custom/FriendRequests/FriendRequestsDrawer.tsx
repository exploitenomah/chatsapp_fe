import LeftArrow from '@assets/LeftArrow'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import {
  removeUserInPreview,
  toggleShowFriendRequestsDrawer,
  toggleShowSuggestionsDrawer,
  updateUserInPreview,
} from '@store/ui/slice'
import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LeftDrawer from '../LeftDrawer'
import SearchBar from '../SearchBar'
import { FriendsState } from '@store/friends/initialState'
import FriendRequestsList from './FriendRequestsList'
import  useFetchInitialSuggestions  from '@hooks/friends/useFetchInitialSuggestions'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <>
      <header className='h-[108px] flex justify-between items-center text-contrast-tertiary/80 bg-secondary-default px-6'>
        <div className='h-[59px] flex items-center'>
          <Button
            className='p-0 w-12'
            onClick={() => {
              dispatch(toggleShowFriendRequestsDrawer())
              dispatch(removeUserInPreview())
            }}
          >
            <LeftArrow />
          </Button>
          <span className='text-lg font-medium'>Friend Requests</span>
        </div>
      </header>
    </>
  )
}

const FriendsSearchBar = () => {
  return (
    <>
      <div className='py-2 pl-2 pr-3'>
        <SearchBar inputProps={{ placeholder: 'Search Friends' }} />
      </div>
    </>
  )
}

const FriendsDrawerContainer = ({
  children,
}: {
  children: ReactNode | ReactNode[]
}) => {
  const { showFriendRequestsDrawer } = useSelector<Store, UI>(
    (store) => store.ui,
  )
  return (
    <>
      <LeftDrawer zIndex={'z-[200]'} show={showFriendRequestsDrawer}>
        <div className='relative h-full'>
          <Header />
          <FriendsSearchBar />
          {children}
        </div>
      </LeftDrawer>
    </>
  )
}

const NoFriendRequestsYetBody = () => {
  const { friendRequests } = useSelector<Store, FriendsState>(
    (store) => store.friends,
  )

  const fetchInitialSuggestions = useFetchInitialSuggestions()
  const dispatch = useDispatch()

  if (friendRequests.length > 0) return null
  return (
    <div className='absolute h-2/5 w-full flex justify-center items-center'>
      <div className='flex justify-center flex-col items-center text-contrast-primary'>
        <h2 className='prose-xl my-5'>You have no friends requests yet.</h2>
        <Button
          onClick={() => {
            fetchInitialSuggestions()
            dispatch(toggleShowSuggestionsDrawer())
            setTimeout(() => {
              dispatch(toggleShowFriendRequestsDrawer())
            }, 100)
          }}
          className='bg-accent-darkest text-contrast-strong'
        >
          See Suggestions
        </Button>
      </div>
    </div>
  )
}

export default function FriendsDrawer() {
  return (
    <>
      <FriendsDrawerContainer>
        <div className='pr-[4px] absolute bottom-0 w-full top-[160px] overflow-auto'>
          <>
            <div className='uppercase text-accent-darkest font-normal pt-7 pb-4 pl-8'>
              Friends Requests
            </div>
            <>
              <FriendRequestsList />
              <NoFriendRequestsYetBody />
            </>
          </>
        </div>
      </FriendsDrawerContainer>
    </>
  )
}
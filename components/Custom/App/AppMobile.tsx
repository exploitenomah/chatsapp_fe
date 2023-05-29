import FriendsDrawer from '../Friends/FriendsDrawer'
import FriendsSuggestionDrawer from '../FriendsSuggestions/SuggestionsDrawer'
import FriendRequestsDrawer from '../FriendRequests/FriendRequestsDrawer'
import LeftPanel from './LeftPanel/LeftPanel'
import UserPreview from '../User/UserPreview'
import PendingFriendsDrawer from '../PendingFriends/PendingFriendsDrawer'
import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import { UI } from '@store/ui/initialState'
import AuthenticatedUserPreview from '../User/AuthenticatedUserPreview'
import LeftDrawer from '../LeftDrawer'
import ConversationRoom from '../Conversations/Conversation'

export default function AppMobile() {
  const { userInPreview, activeConversation } = useSelector<Store, UI>(
    (store) => store.ui,
  )

  return (
    <div className='w-screen h-screen max-w-[650px] mx-auto md:py-[19px]'>
      <div
        className={`h-full overflow-hidden bg-primary-default transition-all duration-150 grow relative overflow-x-hidden mx-auto  md:rounded-md`}
      >
        <AuthenticatedUserPreview />
        <FriendsDrawer />
        <FriendsSuggestionDrawer />
        <FriendRequestsDrawer />
        <PendingFriendsDrawer />

        <LeftDrawer show={Boolean(userInPreview)} zIndex='z-[400]'>
          <div className='relative h-full'>
            <UserPreview />
          </div>
        </LeftDrawer>
        <LeftDrawer show={Boolean(activeConversation)} zIndex='z-[100]'>
          <div className='relative h-full'>
            <ConversationRoom />
          </div>
        </LeftDrawer>
        <LeftPanel />
      </div>
    </div>
  )
}

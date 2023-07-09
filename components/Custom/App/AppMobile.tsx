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
import ConversationRoom, {
  ConversationRoomFooter,
} from '../Conversations/Conversation'
import ConversationSearchDrawer from '../ConversationSearch/ConversationSearchDrawer'
import ConversationHeader from '../Conversations/ConversationHeader'
import { User } from '@store/user/initialState'
import { useMemo } from 'react'

export default function AppMobile() {
  const { userInPreview, activeConversation, showConversationSearchDrawer } =
    useSelector<Store, UI>((store) => store.ui)
  const authenticatedUser = useSelector<Store, User>((store) => store.user)
  const otherUser = useMemo(
    () =>
      activeConversation?.participants.find(
        (user) => user._id !== authenticatedUser._id,
      ),
    [activeConversation?.participants, authenticatedUser._id],
  )
  return (
    <div className='w-screen h-screen max-w-[650px] mx-auto'>
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
        <LeftDrawer
          show={Boolean(showConversationSearchDrawer)}
          zIndex='z-[400]'
        >
          <div className='relative h-full'>
            <ConversationSearchDrawer />
          </div>
        </LeftDrawer>
        <LeftDrawer show={Boolean(activeConversation)} zIndex='z-[100]'>
          <div className='relative'>
            <ConversationRoom />
          </div>
        </LeftDrawer>
        <LeftPanel />
      </div>
    </div>
  )
}

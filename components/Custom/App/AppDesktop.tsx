import FriendsDrawer from '../Friends/FriendsDrawer'
import FriendsSuggestionDrawer from '../FriendsSuggestions/SuggestionsDrawer'
import FriendRequestsDrawer from '../FriendRequests/FriendRequestsDrawer'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel, {
  useRightPanelOutOfFocusClasses,
} from './RightPanel/RightPanel'
import UserPreview from '../User/UserPreview'
import PendingFriendsDrawer from '../PendingFriends/PendingFriendsDrawer'
import { Store } from '@store/index'
import { useDispatch, useSelector } from 'react-redux'
import { removeUserInPreview } from '@store/ui/slice'
import { UI } from '@store/ui/initialState'
import AuthenticatedUserPreview from '../User/AuthenticatedUserPreview'
import SecondaryPanel from './RightPanel/SecondaryPanel'
import { ConversationsState } from '@store/conversations/initialState'
import ConversationSearchDrawer from '../ConversationSearch/ConversationSearchDrawer'

const LeftSection = () => {
  return (
    <>
      <div
        data-test-id='left-panel-desktop'
        className='basis-[30%] max-w-[30%] relative overflow-hidden'
      >
        <AuthenticatedUserPreview />
        <FriendsDrawer />
        <FriendsSuggestionDrawer />
        <FriendRequestsDrawer />
        <PendingFriendsDrawer />
        <LeftPanel />
      </div>
    </>
  )
}

const RightSection = () => {
  const { userInPreview, showConversationSearchDrawer } = useSelector<
    Store,
    UI
  >((store) => store.ui)
  const { searchText } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const rightPanelOutOfFocusClasses = useRightPanelOutOfFocusClasses(
    Boolean(userInPreview) || Boolean(searchText),
  )
  const dispatch = useDispatch()
  return (
    <div className='grow flex border-l border-l-contrast-secondary/20'>
      <div
        className='grow'
        onClick={() => {
          userInPreview && dispatch(removeUserInPreview())
        }}
      >
        <div
          className={`h-full transition-all duration-150 grow ${rightPanelOutOfFocusClasses}`}
        >
          <RightPanel />
        </div>
      </div>
      <SecondaryPanel show={Boolean(userInPreview)}>
        <div className='border-l-contrast-secondary/20 border-l'>
          <UserPreview />
        </div>
      </SecondaryPanel>
      <SecondaryPanel show={Boolean(showConversationSearchDrawer)}>
        <div className='border-l-contrast-secondary/20 border-l'>
          <ConversationSearchDrawer />
        </div>
      </SecondaryPanel>
    </div>
  )
}

export default function AppDesktop() {
  return (
    <div className='w-screen h-screeen bg-primary-default'>
      <div className='flex max-w-[1600px] mx-auto h-screen 2xl:py-[19px]'>
        <LeftSection />
        <RightSection />
      </div>
    </div>
  )
}

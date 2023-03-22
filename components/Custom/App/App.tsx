import FriendsDrawer from '../Friends/FriendsDrawer'
import FriendsSuggestionDrawer from '../FriendsSuggestions/SuggestionsDrawer'
import FriendRequestsDrawer from '../FriendRequests/FriendRequestsDrawer'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import useConversations from '@sockets/useConversations'
import useUser from '@sockets/useUser'
import { useEffect } from 'react'
import useEmitter from '@hooks/useEmitters'
import { conversationEvents } from '@store/conversations/initialState'
import { userEvents } from '@store/user/initialState'
import UserPreview from '../User/UserPreview'
import useGetManyFriends from '@hooks/friends/useGetManyFriends'
import useUpdateFriendsNotifications from '@hooks/friends/useUpdateFriendsNotifications'
import useGetManyFriendRequests from '@hooks/friends/useFetchFriendRequests'
import PendingFriendsDrawer from '../PendingFriends/PendingFriendsDrawer'

export default function App() {
  const conversationsSocket = useConversations()
  const conversationsSocketEmitters = useEmitter(
    conversationsSocket,
    conversationEvents,
  )
  const userSocket = useUser()
  const userSocketEmitters = useEmitter(userSocket, userEvents)
  const handleGetFriends = useGetManyFriends()
  const handleGetFriendRequests = useGetManyFriendRequests()
  const handleGetPendingRequests = useGetManyFriendRequests()

  useEffect(() => {
    conversationsSocketEmitters.getMany({ page: 1, limit: 100 })
    userSocketEmitters.getMe()
  }, [conversationsSocketEmitters, userSocketEmitters])

  useUpdateFriendsNotifications()

  useEffect(() => {
    handleGetFriends()
    handleGetFriendRequests()
    handleGetPendingRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-screen h-screeen bg-primary-default'>
      <div className='flex max-w-[1600px] mx-auto h-screen 2xl:py-[19px]'>
        <div className='basis-[30%] max-w-[30%] relative overflow-x-hidden'>
          <FriendsDrawer />
          <FriendsSuggestionDrawer />
          <FriendRequestsDrawer />
          <PendingFriendsDrawer />
          <LeftPanel />
        </div>
        <div className='grow flex border-l border-l-contrast-secondary/20'>
          <div className='grow'>
            <RightPanel />
          </div>
          <UserPreview />
        </div>
      </div>
    </div>
  )
}

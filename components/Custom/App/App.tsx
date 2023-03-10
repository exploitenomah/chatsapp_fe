import FriendsDrawer from '../Friends/FriendsDrawer'
import FriendsSuggestionDrawer from '../FriendsSuggestions/SuggestionsDrawer'
import LeftPanel from './LeftPanel/LeftPanel'
import RightPanel from './RightPanel/RightPanel'
import useConversations from '@sockets/useConversations'
import useUser from '@sockets/useUser'
import { useEffect } from 'react'
import useEmitter from '@hooks/useEmitters'
import { conversationEvents } from '@store/conversations/initialState'
import { userEvents } from '@store/user/initialState'

export default function App() {
  const conversationsSocket = useConversations()
  const conversationsSocketEmitters = useEmitter(
    conversationsSocket,
    conversationEvents,
  )
  const userSocket = useUser()
  const userSocketEmitters = useEmitter(userSocket, userEvents)

  useEffect(() => {
    conversationsSocketEmitters.getMany({ page: 1, limit: 100 })
    userSocketEmitters.getMe()
  }, [conversationsSocketEmitters, userSocketEmitters])

  return (
    <div className='w-screen h-screeen bg-primary-default'>
      <div className='flex max-w-[1600px] mx-auto h-screen 2xl:py-[19px]'>
        <div className='basis-[30%] max-w-[30%] relative overflow-x-hidden'>
          <FriendsDrawer />
          <FriendsSuggestionDrawer />
          <LeftPanel />
        </div>
        <div className='grow border-l border-l-contrast-secondary/20'>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

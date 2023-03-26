import { Message } from '@store/messages/initialState'
import { User } from '@store/user/initialState'

export const conversationsEvents = ['new', 'update', 'getOne', 'getMany']

export type Conversation = {
  createdAt: Date
  creator: string
  participants: User[]
  updatedAt: string
  _id: string
  latestMessage?: Message
  messages?: Message[]
  hasFetchedAllMessages?: boolean
  hasFetchedInitialMessages?: boolean
  messagesPage?: number
  shouldScrollMessages?: boolean
}

export type ConversationsState = {
  conversations: Conversation[]
  hasFetchedConversations: boolean
  conversationsWithUnseenMessagesCount: number
  totalUnseenMessages: number
}

export const conversationEvents = ['new', 'update', 'getOne', 'getMany']
const initialState: ConversationsState = {
  conversations: [],
  hasFetchedConversations: false,
  conversationsWithUnseenMessagesCount: 0,
  totalUnseenMessages: 0,
}

export default initialState

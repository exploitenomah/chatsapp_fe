import { Message } from '@store/messages/initialState'
import { User } from '@store/user/initialState'

export const conversationsEvents = [
  'new',
  'update',
  'getOne',
  'getMany',
  'unSeenMsgsCount',
]

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
  unSeenMsgsCount?: number
}

export type ConversationsState = {
  conversations: Conversation[]
  hasFetchedInitialConversations: boolean
  conversationsWithUnseenMessagesCount: number
  totalUnseenMessages: number
  idsOfConversationsNotFetched: string[]
  conversationsPage: number
  hasFetchedAllConversation: boolean
}

const initialState: ConversationsState = {
  conversations: [],
  idsOfConversationsNotFetched: [],
  hasFetchedInitialConversations: false,
  conversationsWithUnseenMessagesCount: 0,
  totalUnseenMessages: 0,
  conversationsPage: 0,
  hasFetchedAllConversation: false,
}

export default initialState

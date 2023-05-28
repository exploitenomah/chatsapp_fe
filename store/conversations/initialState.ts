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
  blocking: {
    _id: string
    blocker: string
    blockee: string
  }
  hasBlocking: boolean
  isBlocker: boolean
}

export type ConversationsState = {
  conversations: Conversation[]
  hasFetchedInitialConversations: boolean
  conversationsWithUnseenMessagesCount: number
  totalUnseenMessages: number
  idsOfConversationsNotFetched: string[]
  conversationsPage: number
  hasFetchedAllConversation: boolean
  searchText?: string
}

const initialState: ConversationsState = {
  conversations: [],
  idsOfConversationsNotFetched: [],
  hasFetchedInitialConversations: false,
  conversationsWithUnseenMessagesCount: 0,
  totalUnseenMessages: 0,
  conversationsPage: 0,
  hasFetchedAllConversation: false,
  searchText: '',
}

export default initialState

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

type SearchedMessage = Omit<Message, 'sender' | 'conversationId'> & {
  sender: User
  conversationId: Conversation
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
  searchedMessages: SearchedMessage[]
  searchedMessagesPage: number
}

const initialState: ConversationsState = {
  conversations: [],
  idsOfConversationsNotFetched: [],
  hasFetchedInitialConversations: false,
  conversationsWithUnseenMessagesCount: 0,
  totalUnseenMessages: 1,
  conversationsPage: 1,
  hasFetchedAllConversation: false,
  searchText: '',
  searchedMessagesPage: 1,
  searchedMessages: [],
}

export default initialState

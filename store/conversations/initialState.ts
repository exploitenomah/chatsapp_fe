import { Message } from '@store/messages/initialState'
import { User } from '@store/user/initialState'

export const conversationsEvents = ['new', 'update', 'getOne', 'getMany']

export type Conversation = {
  createdAt: Date
  creator: string
  participants: User[]
  updatedAt: string
  _id: string
  messages?: Message[]
  latestMessage?: Message
}

export type ConversationsState = {
  conversations: Conversation[]
  hasFetchedConversations: boolean
}

export const conversationEvents = ['new', 'update', 'getOne', 'getMany']
const initialState: ConversationsState = {
  conversations: [],
  hasFetchedConversations: false,
}

export default initialState

import { User } from '@store/user/initialState'

export type Conversation = {
  createdAt: Date
  creator: string
  participants: User[]
  updatedAt: Date
  _id: string
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

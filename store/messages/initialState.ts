import { User } from '@store/user/initialState'
export const messagesEvents = [
  'new',
  'update',
  'getOne',
  'getMany',
  'messagesSeen',
  'messagesDelivered',
]

export type Message = {
  _id: string
  conversationId: string
  sender: string
  recipients: User[]
  isDeleted: boolean
  deletedFor: string
  // attachments: {
  //   type: [messaageAttachment],
  //   validate: function (val) {
  //     return val.length <= 10
  //   },
  // },
  text: string
  deletedAt: string
  seen: boolean
  delivered: boolean
  createdAt: string | Date
  updatedAt: string
  // quotedMessage: {
  //   type: mongoose.Schema.ObjectId,
  // }
}
export type MessagesState = {
  messagesWithoutConversationInState: Message[]
}

const initialState: MessagesState = {
  messagesWithoutConversationInState: [],
}
export default initialState

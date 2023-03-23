import { User } from '@store/user/initialState'

export type Message = {
  conversationId: string
  sender: User
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
  // quotedMessage: {
  //   type: mongoose.Schema.ObjectId,
  // }
}

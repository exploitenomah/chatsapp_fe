import { ConversationsState } from '@store/conversations/initialState'
import { Store } from '@store/index'
import { useSelector } from 'react-redux'
import ConversationItem from './ConversationItem'

export default function ConversationsList() {
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  return (
    <>
      {conversations.map((conversation) => (
        <ConversationItem key={conversation._id} conversation={conversation}/>
      ))}
    </>
  )
}

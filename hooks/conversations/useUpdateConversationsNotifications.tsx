import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '@store/index'
import { ConversationsState } from '@store/conversations/initialState'
import { User } from '@store/user/initialState'
import { updateNotifications } from '@store/conversations/slice'

export default function useUpdateConversationsNotifications() {
  const { conversations } = useSelector<Store, ConversationsState>(
    (store) => store.conversations,
  )
  const authenticatedUser = useSelector<Store, User>((store) => store.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const totalUnseenMessages = conversations.reduce((acc, convo) => {
      const convoUnreadMessages = (convo.messages || []).filter(
        (msg) => msg.seen === false && msg.sender !== authenticatedUser._id,
      )
      return acc + convoUnreadMessages.length
    }, 0)
    const conversationsWithUnseenMessagesCount = conversations.filter(
      (convo) =>
        convo.messages &&
        convo.messages.find(
          (msg) => msg.seen === false && msg.sender !== authenticatedUser._id,
        ),
    ).length

    dispatch(
      updateNotifications({
        totalUnseenMessages,
        conversationsWithUnseenMessagesCount,
      }),
    )
  }, [authenticatedUser._id, conversations, dispatch])
}

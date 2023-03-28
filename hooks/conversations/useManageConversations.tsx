import { Conversation } from '@store/conversations/initialState'
import { updateSingleConversation } from '@store/conversations/slice'
import { Store } from '@store/index'
import { Message, MessagesState } from '@store/messages/initialState'
import { removeMessageWithoutConversationInState } from '@store/messages/slice'
import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useManageConversation(conversation: Conversation) {
  const { messagesWithoutConversationInState } = useSelector<
    Store,
    MessagesState
  >((store) => store.messages)

  const dispatch = useDispatch()

  const msgsGroupedByConversationId = useMemo(() => {
    return messagesWithoutConversationInState.reduce(
      (acc: { [x: string]: any }, msg) => {
        if (acc[msg.conversationId]) {
          return {
            ...acc,
            [acc[msg.conversationId]]: [...acc[msg.conversationId], msg],
          }
        } else {
          return {
            ...acc,
            [msg.conversationId]: [msg],
          }
        }
      },
      {},
    )
  }, [messagesWithoutConversationInState])

  useEffect(() => {
    const msgsForConversation = msgsGroupedByConversationId[conversation._id]

    if (msgsForConversation && msgsForConversation.length > 0) {
      dispatch(
        updateSingleConversation({
          conversationId: conversation._id,
          update: {
            ...conversation,
            messages: msgsForConversation,
            latestMessage: msgsForConversation.find(
              (msg: Message & { isLatest: boolean }) => msg.isLatest === true,
            ),
          },
        }),
      )
      dispatch(removeMessageWithoutConversationInState(conversation._id))
    }
  }, [conversation, dispatch, msgsGroupedByConversationId])
}

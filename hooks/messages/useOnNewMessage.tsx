import { useCallback } from 'react'
import { Message } from '@store/messages/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveConversation } from '@store/ui/slice'
import { makeUniqueArrOfObjectsWith_IdKey } from '@utils/index'

export default function useOnNewMessage() {
  const dispatch = useDispatch()

  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  const handleNewMessage = useCallback(
    (message: Message) => {
      if (
        activeConversation &&
        message.conversationId === activeConversation._id
      ) {
        dispatch(
          updateActiveConversation({
            ...activeConversation,
            messages: makeUniqueArrOfObjectsWith_IdKey([
              ...(activeConversation?.messages || []),
              message,
            ]),
          }),
        )
      }
    },
    [activeConversation, dispatch],
  )
  return handleNewMessage
}

import { useCallback } from 'react'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { updateActiveConversation } from '@store/ui/slice'

export default function useOnUpdateMessages() {
  const dispatch = useDispatch()

  const { activeConversation } = useSelector<Store, UI>((store) => store.ui)

  const handleUpdateMessagesSeen = useCallback(
    (acknowledgement: { acknowledged: boolean; conversationId: string }) => {
      if (acknowledgement.conversationId === activeConversation?._id) {
        dispatch(
          updateActiveConversation({
            ...activeConversation,
            messages: (activeConversation?.messages || []).map((msg) => ({
              ...msg,
              seen: true,
            })),
          }),
        )
      }
    },
    [activeConversation, dispatch],
  )
  return handleUpdateMessagesSeen
}

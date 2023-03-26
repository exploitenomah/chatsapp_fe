import { setActiveConversation } from '@store/ui/slice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useCreateConversation from './useCreateConversation'

export default function useHandleMessageButtonClick(participants: string[]) {
  const dispatch = useDispatch()

  const { handleCreateConversation, checkIfConversationExistsInState } =
    useCreateConversation(participants)

  const handleMessageButtonClick = useCallback(() => {
    const existingConversation = checkIfConversationExistsInState()
    if (existingConversation)
      dispatch(
        setActiveConversation({
          ...existingConversation,
          messages: existingConversation.messages || [],
        shouldScrollMessages: true
      }),
      )
    else handleCreateConversation()
  }, [checkIfConversationExistsInState, dispatch, handleCreateConversation])

  return handleMessageButtonClick
}

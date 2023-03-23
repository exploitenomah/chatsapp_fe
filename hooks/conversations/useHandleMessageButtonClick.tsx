import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useCreateConversation from './useCreateConversation'

export default function useHandleMessageButtonClick(participants: string[]) {
  const dispatch = useDispatch()

  const { handleCreateConversation, checkIfConversationExistsInState } =
    useCreateConversation(participants)

  const handleMessageButtonClick = useCallback(() => {
    const existingConversation = checkIfConversationExistsInState()
    if (existingConversation) console.log('dispatch conversation open')
    else handleCreateConversation()
  }, [checkIfConversationExistsInState, handleCreateConversation])

  return handleMessageButtonClick
}

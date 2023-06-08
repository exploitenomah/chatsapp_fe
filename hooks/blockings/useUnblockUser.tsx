import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import useBlockings from '@sockets/useBlockings'
import { blockingsEvents } from '@store/blockings/initialState'

export default function useUnBlockUser() {
  const blockingsSocket = useBlockings()
  const blockingsSocketEmitters = useEmitter(blockingsSocket, blockingsEvents)

  const unblockUser = useCallback(
    ({ blockee, blockingId }: { blockee: string; blockingId: string }) => {
      blockingsSocketEmitters.unblock({ blockee, blockingId })
    },
    [blockingsSocketEmitters],
  )
  return unblockUser
}

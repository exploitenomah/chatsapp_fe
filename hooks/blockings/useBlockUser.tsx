import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import useBlockings from '@sockets/useBlockings'
import { blockingsEvents } from '@store/blockings/initialState'

export default function useBlockUser() {
  const blockingsSocket = useBlockings()
  const blockingsSocketEmitters = useEmitter(blockingsSocket, blockingsEvents)

  const blockUser = useCallback(
    (blockee: string) => {
      blockingsSocketEmitters.block({ blockee })
    },
    [blockingsSocketEmitters],
  )
  return blockUser
}

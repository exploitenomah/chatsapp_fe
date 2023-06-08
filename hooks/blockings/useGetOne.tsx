import { useCallback } from 'react'
import useEmitter from '../useEmitters'
import useBlockings from '@sockets/useBlockings'
import { blockingsEvents } from '@store/blockings/initialState'

export default function useGetOne() {
  const blockingsSocket = useBlockings()
  const blockingsSocketEmitters = useEmitter(blockingsSocket, blockingsEvents)

  const getOne = useCallback(
    ({ blockee, blocker }: { blockee: string; blocker: string }) => {
      blockingsSocketEmitters.getOne({ blockee, blocker })
    },
    [blockingsSocketEmitters],
  )
  return getOne
}

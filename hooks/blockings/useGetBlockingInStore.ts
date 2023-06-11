import { Store } from '@store/index'
import { Blockings } from '@store/blockings/initialState'
import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function useGetBlockingInStore(userId: string) {
  const { blockings } = useSelector<Store, Blockings>(
    (store) => store.blockings,
  )
  const blocking = useMemo(
    () =>
      blockings.find(
        (blocking) =>
          blocking.blocker === userId || blocking.blockee === userId,
      ),
    [blockings, userId],
  )

  return blocking
}

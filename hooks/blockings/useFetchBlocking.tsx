import { useEffect, useMemo } from 'react'
import { Blockings } from '@store/blockings/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import useGetOne from './useGetOne'

export default function useFetchBlocking() {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)
  const { blockings } = useSelector<Store, Blockings>(
    (store) => store.blockings,
  )
  const blockingInState = useMemo(
    () =>
      blockings.find(
        (blocking) =>
          blocking.blocker === userInPreview?._id ||
          blocking.blockee === userInPreview?._id,
      ),
    [blockings, userInPreview?._id],
  )

  const getOne = useGetOne()
  useEffect(() => {
    if (userInPreview?._id && !blockingInState) {
      getOne(userInPreview?._id)
    }
  }, [blockingInState, getOne, userInPreview?._id])
}

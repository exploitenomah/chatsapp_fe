import { useEffect, useMemo } from 'react'
import { Blockings } from '@store/blockings/initialState'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useSelector } from 'react-redux'
import useGetOne from './useGetOne'
import useGetBlockingInStore from './useGetBlockingInStore'

export default function useFetchBlocking() {
  const { userInPreview } = useSelector<Store, UI>((store) => store.ui)

  const blockingInStore = useGetBlockingInStore(userInPreview?._id || '')

  const getOne = useGetOne()
  useEffect(() => {
    if (userInPreview?._id && !blockingInStore) {
      getOne(userInPreview?._id)
    }
  }, [blockingInStore, getOne, userInPreview?._id])
}

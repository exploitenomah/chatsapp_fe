import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { toggleDeviceIsMobile } from '@store/ui/slice'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useMakeResponsive() {
  const { deviceIsMobile } = useSelector<Store, UI>((store) => store.ui)
  const dispatch = useDispatch()

  const handleDeviceType = useCallback(() => {
    if (window.innerWidth <= 900) {
      deviceIsMobile === false && dispatch(toggleDeviceIsMobile(true))
    } else {
      deviceIsMobile === true && dispatch(toggleDeviceIsMobile(false))
    }
  }, [deviceIsMobile, dispatch])

  useEffect(() => {
    handleDeviceType()
    window.addEventListener('resize', (e) => {
      handleDeviceType()
    })
  }, [handleDeviceType])
}

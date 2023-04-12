import CloseIcon from '@assets/CloseIcon'
import Button from '@components/HTML/Button'
import { removeAppAlert } from '@store/notifications/slice'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import Alert from '../../types/Alert'

export default function NotificationComponent({ message, variant, id }: Alert) {
  const dispatch = useDispatch()
  const _variant = useMemo(() => {
    switch (variant) {
      case 'error':
        return 'error'
      case 'primary':
        return 'primary'
      case 'warning':
        return 'warning'
      case 'success':
        return 'success'
      default:
        return 'primary'
    }
  }, [variant])

  return (
    <div
      role='alert'
      className={`relative px-6 py-4 text-center ${_variant} left-0 z-[1000000] text-sm my-2 mr-3 rounded-lg`}
    >
      <Button
        onClick={() => dispatch(removeAppAlert(id))}
        className='absolute top-[6px] right-[4px] p-0'
      >
        <CloseIcon className='w-[17px] h-[17px]' />
      </Button>
      <div>{message}</div>
    </div>
  )
}

import { useEffect } from 'react'

export default function useHandleBackButtonMobile() {
  useEffect(() => {
    window.onbeforeunload = function () {
      return 'Your work will be lost.'
    }
  }, [])
}

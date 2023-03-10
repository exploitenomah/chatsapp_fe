import LoadingLogo from '@assets/LoadingLogo'
import { toggleAppLoading } from '@store/ui/slice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function AppLoadingScreen() {
  const [progressPercentage, setProgressPercentage] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (progressPercentage < 250)
        setProgressPercentage(
          (prev) => prev + Math.floor(Math.random() * 100) + 25,
        )
      else dispatch(toggleAppLoading(false))
    }, 250)
    return () => {
      clearInterval(progressInterval)
    }
  }, [dispatch, progressPercentage])

  return (
    <>
      <div className='bg-primary-default h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-y-10 justify-center items-center'>
          <div className='animate-pulse flex justify-start mx-auto max-w-[55px] overflow-hidden'>
            <div>
              <LoadingLogo />
            </div>
          </div>
          <div className='h-1 w-[80vw] bg-contrast-tertiary/25  rounded-lg max-w-[380px] overflow-hidden'>
            <div
              style={{ width: `${progressPercentage}%` }}
              className={`h-full bg-accent-dark transition-all duration-500`}
            ></div>
          </div>
          <div className='text-contrast-strong/75 font-normal prose-xl tracking-wider text-center'>
            ChatsApp
            <p className='mt-1 text-xs text-contrast-secondary/75 tracking-normal'>
              Send and recieve messages in your web browser.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

import Button from '@components/HTML/Button'
import LoadingLogo from '@assets/LoadingLogo'
import Modal from '../Modal'
import { ReactNode, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  toggleShowLogin,
  toggleShowSignup,
  updateLoading,
} from '@store/ui/slice'
import { removeLocalStorageFormValues } from '@utils/auth'

export default function FormContainer({
  show,
  children,
  mode,
  title,
}: {
  show: boolean
  children: ReactNode | ReactNode[]
  mode: 'sign up' | 'login'
  title: string
}) {
  const dispatch = useDispatch()

  const toggleMode = useCallback(() => {
    removeLocalStorageFormValues()
    if (mode === 'login') dispatch(toggleShowSignup())
    else dispatch(toggleShowLogin())
    dispatch(updateLoading(false))
  }, [dispatch, mode])

  const hide = useCallback(() => {
    removeLocalStorageFormValues()
    if (mode === 'login') dispatch(toggleShowLogin())
    else dispatch(toggleShowSignup())
    dispatch(updateLoading(false))
  }, [dispatch, mode])

  return (
    <>
      <Modal show={show} keepMounted={false} hide={hide} animate={true}>
        <div className='bg-primary-default brightness-105 pt-8 pb-12 px-4 flex flex-col w-[90vw] max-w-md rounded-lg animate-fade-in relative'>
          <div className='w-[60px] overflow-hidden text-contrast-secondary mx-auto mb-5 animate-pulse'>
            <LoadingLogo />
          </div>

          <h1 className='prose-2xl text-contrast-primary text-center mb-5'>
            {title}
          </h1>

          <div className='w-[90%] mx-auto mt-3'>
            <>{children}</>
          </div>

          <div className='mx-auto mt-4 text-sm text-contrast-primary/60 '>
            <span>
              {mode === 'login' ? <>Don&lsquo;t </> : <>Already </>}
              have an account?
            </span>
            &nbsp;&nbsp;
            <Button
              onClick={toggleMode}
              type='button'
              name='signup'
              className='hover:scale-100 hover:underline hover:text-accent-medium transition-all duration-150 px-0 py-0 capitalize'
            >
              {mode === 'sign up' ? 'login' : 'sign up'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

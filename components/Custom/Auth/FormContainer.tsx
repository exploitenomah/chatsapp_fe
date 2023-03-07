import Button from '@components/HTML/Button'
import LoadingLogo from '@assets/LoadingLogo'
import Modal from '../Modal'
import { FormEventHandler, ReactNode } from 'react'

export default function FormContainer({
  show,
  hide,
  toggle,
  children,
  mode,
  title,
  onSubmit,
}: {
  show: boolean
  hide: () => void
  toggle: () => void
  children: ReactNode | ReactNode[]
  mode: 'sign up' | 'login'
  title: string
  onSubmit: FormEventHandler<HTMLFormElement>
}) {
  return (
    <>
      <Modal show={show} keepMounted={false} hide={hide} animate={true}>
        <div className='bg-primary-darkest pt-8 pb-12 px-4 flex flex-col w-[90vw] max-w-md rounded-lg animate-fade-in'>
          <div className='w-[60px] overflow-hidden text-contrast-secondary mx-auto mb-5 animate-pulse'>
            <LoadingLogo />
          </div>

          <h1 className='prose-2xl text-contrast-primary text-center mb-5'>
            {title}
          </h1>

          <form
            onSubmit={onSubmit}
            className='flex flex-col gap-5 stretch w-[90%] mx-auto mt-3'
          >
            {children}
            <Button
              type='submit'
              name='signup'
              className='bg-accent-dark/60 mt-2 capitalize text-lg'
            >
              {mode}
            </Button>
          </form>

          <div className='mx-auto mt-4 text-sm text-contrast-primary/60 '>
            <span>
              {mode === 'login' ? <>Don&lsquo;t </> : <>Already </>}
              have an account?
            </span>
            &nbsp;&nbsp;
            <Button
              onClick={toggle}
              type='button'
              name='signup'
              className='hover:scale-100 hover:underline hover:text-accent-dark/60 transition-all duration-150 px-0 py-0 capitalize'
            >
              {mode === 'sign up' ? 'login' : 'sign up'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

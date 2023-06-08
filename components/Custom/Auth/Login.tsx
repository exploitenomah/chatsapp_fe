import Input from '@components/HTML/Input'
import FormContainer from './FormContainer'
import {
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
} from 'react'
import Button from '@components/HTML/Button'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import AuthLoader, { AuthInputWithShowPasswordToggle } from './AuthComponents'
import { updateLoading } from '@store/ui/slice'

const initialLoginDetails = {
  nickNameOrEmail: '',
  password: '',
}
const useLoginFormHandlers = (rootSocket: Socket) => {
  const dispatch = useDispatch()
  const [loginDetails, setLoginDetails] = useState(initialLoginDetails)
  const isSubmitDisabled = useMemo(
    () => Object.values(loginDetails).some((val) => val.trim().length === 0),
    [loginDetails],
  )
  const handleFormChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = changeEvent.target
      setLoginDetails((prev) => ({
        ...prev,
        [name]: value,
      }))
      localStorage.setItem(name, value)
    },
    [],
  )

  const onSubmit = useCallback(
    (submitEvent: FormEvent) => {
      submitEvent.preventDefault()
      dispatch(updateLoading(true))
      rootSocket.emit('login', {
        email: loginDetails.nickNameOrEmail.trim(),
        nickName: loginDetails.nickNameOrEmail.trim(),
        password: loginDetails.password,
      })
    },
    [dispatch, loginDetails.nickNameOrEmail, loginDetails.password, rootSocket],
  )

  useEffect(() => {
    const nickNameOrEmail = localStorage.getItem('nickNameOrEmail') || ''
    const password = localStorage.getItem('password') || ''
    setLoginDetails(() => ({
      nickNameOrEmail,
      password,
    }))
  }, [])
  return {
    onSubmit,
    loginDetails,
    isSubmitDisabled,
    handleFormChange,
  }
}
const Form = ({ rootSocket }: { rootSocket: Socket }) => {
  const { handleFormChange, loginDetails, isSubmitDisabled, onSubmit } =
    useLoginFormHandlers(rootSocket)
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <Input
        placeholder='Nick Name / Email*'
        required
        type='text'
        name='nickNameOrEmail'
        value={loginDetails.nickNameOrEmail}
        onChange={handleFormChange}
      />
      <AuthInputWithShowPasswordToggle
        placeholder='Password*'
        required
        type='password'
        name='password'
        value={loginDetails.password}
        onChange={handleFormChange}
      />
      <Button
        disabled={isSubmitDisabled}
        type='submit'
        name='login'
        className='bg-accent-dark/60 mt-2 capitalize text-lg transition-all duration-400 \n
        disabled:opacity-50 disabled:hover:brightness-100 disabled:hover:cursor-not-allowed'
      >
        Login
      </Button>
    </form>
  )
}

export default function Login({ rootSocket }: { rootSocket: Socket }) {
  const { showLogin, loading } = useSelector<Store, UI>((store) => store.ui)

  return (
    <FormContainer show={showLogin} mode='login' title='Welcome Back!'>
      {loading && <AuthLoader />}
      <Form rootSocket={rootSocket} />
    </FormContainer>
  )
}

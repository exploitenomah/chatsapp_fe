import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import { Store } from '@store/index'
import { UI } from '@store/ui/initialState'
import { updateLoading } from '@store/ui/slice'
import {
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import AuthLoader from './AuthLoader'
import FormContainer from './FormContainer'
import useDebounce from '@hooks/useDebounce'

const initialSignupDetails = {
  nickName: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  confirmPassword: '',
}

type SignupDetails = typeof initialSignupDetails

const InputNotification = ({
  show,
  displayText,
}: {
  show: boolean
  displayText: string
}) => {
  return (
    <>
      {show ? (
        <span className='block mb-1 ml-1 text-red-400 text-xs'>
          {displayText}
        </span>
      ) : null}
    </>
  )
}

const inputValidationClasses = (isValid: boolean, isInvalid: boolean) => {
  return `${isValid ? 'border-transparent' : isInvalid ? 'border-red-400' : ''}`
}

// const doesNotContainOnlyNumsRegex = /(?!^\d+$)^.+$/
// const isValidNickNameRegex = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
// const IsNickNameInvalid = useMemo(() => {
//   return !(
//     isValidNickNameRegex.test(signupDetails.nickName.trim()) &&
//     doesNotContainOnlyNumsRegex.test(signupDetails.nickName.trim())
//   )
// }, [signupDetails.nickName])
const Form = ({ rootSocket }: { rootSocket: Socket }) => {
  const dispatch = useDispatch()
  const [signupDetails, setSignupDetails] = useState(initialSignupDetails)
  const [isNickNameTaken, setIsNickNameTaken] = useState(false)
  const [isEmailInUse, setIsEmailInUse] = useState(false)
  const [isNickNameInvalid, setIsNickNameInvalid] = useState(false)

  const passwordsNotMatched = useMemo(
    () =>
      signupDetails.password.length > 0 &&
      signupDetails.confirmPassword.length > 0 &&
      signupDetails.password !== signupDetails.confirmPassword,
    [signupDetails.confirmPassword, signupDetails.password],
  )
  const handleIsTakenCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      const emitIsTaken = () => {
        rootSocket.emit('isTaken', {
          key: name,
          value: value.trim(),
        })
      }
      switch (name) {
        case 'email':
          if (signupDetails.email.trim() === value.trim() && isEmailInUse)
            return
          else return emitIsTaken()
        case 'nickName':
          if (value.trim().length === 0) return
          const doesNotContainOnlyNumsRegex = /(?!^\d+$)^.+$/
          const isValidNickNameRegex = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
          if (
            !(
              isValidNickNameRegex.test(value.trim()) &&
              doesNotContainOnlyNumsRegex.test(value.trim())
            )
          )
            return setIsNickNameInvalid(true)
          else if (
            signupDetails.nickName.trim() === value.trim() &&
            isNickNameTaken
          )
            return
          else return emitIsTaken()
        default:
          return
      }
    },
    [
      isEmailInUse,
      isNickNameTaken,
      rootSocket,
      signupDetails.email,
      signupDetails.nickName,
    ],
  )

  const checkIfNN = useDebounce(handleIsTakenCheck, 500)
  const checkfem = useDebounce(handleIsTakenCheck, 500)
  const handleFormChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = changeEvent.target
      setSignupDetails((prev) => ({
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
      if (isNickNameTaken || isEmailInUse) return
      if (signupDetails.password !== signupDetails.confirmPassword) return
      dispatch(updateLoading(true))
      const data = { ...signupDetails } as Partial<SignupDetails>
      delete data.confirmPassword
      rootSocket.emit('signup', data)
    },
    [dispatch, isEmailInUse, isNickNameTaken, rootSocket, signupDetails],
  )

  useEffect(() => {
    rootSocket.on('isTaken', (data) => {
      switch (data.path) {
        case 'email':
          setIsEmailInUse(data.isTaken)
          return
        case 'nickName':
          setIsNickNameTaken(data.isTaken)
          return
        default:
          return
      }
    })
    return () => {
      rootSocket.off('isTaken', () => {})
    }
  }, [rootSocket])

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || ''
    const lastName = localStorage.getItem('lastName') || ''
    const nickName = localStorage.getItem('nickName') || ''
    const email = localStorage.getItem('email') || ''
    const password = localStorage.getItem('password') || ''
    setSignupDetails((prev) => ({
      ...prev,
      firstName,
      lastName,
      nickName,
      email,
      password,
    }))
  }, [])

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <div className='flex gap-6 justify-between'>
        <Input
          placeholder='First name*'
          required
          type='text'
          name='firstName'
          onChange={handleFormChange}
          value={signupDetails.firstName}
        />
        <Input
          placeholder='Last name'
          type='text'
          name='lastName'
          onChange={handleFormChange}
          value={signupDetails.lastName}
        />
      </div>
      <div>
        <InputNotification
          show={isNickNameTaken}
          displayText={`${signupDetails.nickName} is already taken`}
        />
        <InputNotification
          show={isNickNameInvalid}
          displayText={`${signupDetails.nickName} is not a valid nickname`}
        />
        <Input
          className={`border border-solid ${inputValidationClasses(
            signupDetails.nickName.trim().length > 0 &&
              (!isNickNameTaken || !isNickNameInvalid),
            isNickNameTaken || isNickNameInvalid,
          )}`}
          placeholder='Nick name*'
          required
          type='text'
          name='nickName'
          onChange={(e) => {
            setIsNickNameInvalid(false)
            handleFormChange(e)
            checkIfNN(e)
          }}
          value={signupDetails.nickName}
        />
      </div>
      <div>
        <InputNotification
          show={isEmailInUse}
          displayText={`${signupDetails.email} is already in use`}
        />
        <Input
          className={`border border-solid ${inputValidationClasses(
            signupDetails.email.trim().length > 0 && !isEmailInUse,
            isEmailInUse,
          )}`}
          placeholder='Email*'
          required
          type='email'
          name='email'
          onChange={(e) => {
            handleFormChange(e)
            checkfem(e)
          }}
          value={signupDetails.email}
        />
      </div>
      <div>
        <InputNotification
          show={passwordsNotMatched}
          displayText='Passwords not matched'
        />
        <Input
          placeholder='Password*'
          required
          type='password'
          name='password'
          className='mb-6'
          onChange={handleFormChange}
          value={signupDetails.password}
        />
        <Input
          placeholder='Confirm password*'
          required
          type='password'
          name='confirmPassword'
          onChange={handleFormChange}
          value={signupDetails.confirmPassword}
        />
      </div>
      <Button
        type='submit'
        name='login'
        className='bg-accent-dark/60 mt-2 capitalize text-lg'
      >
        signup
      </Button>
    </form>
  )
}

export default function Signup({ rootSocket }: { rootSocket: Socket }) {
  const { showSignup, loading } = useSelector<Store, UI>((store) => store.ui)

  return (
    <FormContainer
      show={showSignup}
      mode='sign up'
      title='Get Started With ChatsApp'
    >
      {loading && <AuthLoader />}
      <Form rootSocket={rootSocket} />
    </FormContainer>
  )
}

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
import AuthLoader, { AuthInputWithShowPasswordToggle } from './AuthComponents'
import FormContainer, { formHasEmptyFields } from './FormContainer'
import useDebounce from '@hooks/useDebounce'
import useIsNickNameInvalid from '@hooks/user/useIsNickNameInvalid'

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

const useCheckIfValIsTaken = ({
  currentValue,
  rootSocket,
}: {
  currentValue: string
  rootSocket: Socket
}) => {
  const [isTaken, setIsTaken] = useState(false)
  const [key, setKey] = useState('')
  const handleIsTakenCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      const emitIsTaken = () => {
        rootSocket.emit('isTaken', {
          key: name,
          value: value.trim(),
        })
      }
      if (name !== key) setKey(name)
      if (currentValue.trim() === value.trim() && isTaken) return
      else return emitIsTaken()
    },
    [key, currentValue, isTaken, rootSocket],
  )
  const checkIfValIsTaken = useDebounce(handleIsTakenCheck, 500)
  useEffect(() => {
    rootSocket.on('isTaken', (data) => {
      if (data.path === key) setIsTaken(data.isTaken)
    })
    return () => {
      rootSocket.off('isTaken', () => {})
    }
  }, [key, rootSocket])

  return { isTaken, checkIfValIsTaken }
}

const useSignupFormHandlers = (rootSocket: Socket) => {
  const dispatch = useDispatch()
  const [signupDetails, setSignupDetails] = useState(initialSignupDetails)
  const isSubmitDisabled = formHasEmptyFields(signupDetails)
  const handleFormChange = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = changeEvent.target
      const newValue = name === 'nickName' ? value.toLowerCase() : value
      setSignupDetails((prev) => ({
        ...prev,
        [name]: newValue,
      }))
      localStorage.setItem(name, newValue)
    },
    [],
  )

  const onSubmit = useCallback(
    (submitEvent: FormEvent) => {
      submitEvent.preventDefault()
      dispatch(updateLoading(true))
      const data = { ...signupDetails } as Partial<SignupDetails>
      delete data.confirmPassword
      rootSocket.emit('signup', data)
    },
    [dispatch, rootSocket, signupDetails],
  )

  useEffect(() => {
    let tempSignupDataFromLs = { ...initialSignupDetails }
    Object.keys(initialSignupDetails).forEach((key) => {
      tempSignupDataFromLs[key as keyof typeof tempSignupDataFromLs] =
        localStorage.getItem(key) || ''
    })
    setSignupDetails(tempSignupDataFromLs)
  }, [])
  return {
    signupDetails,
    handleFormChange,
    onSubmit,
    isSubmitDisabled,
  }
}

const Form = ({ rootSocket }: { rootSocket: Socket }) => {
  const { signupDetails, handleFormChange, onSubmit, isSubmitDisabled } =
    useSignupFormHandlers(rootSocket)
  const isNickNameInvalid = useIsNickNameInvalid(signupDetails.nickName)
  const passwordsNotMatched = useMemo(
    () =>
      signupDetails.password.length > 0 &&
      signupDetails.confirmPassword.length > 0 &&
      signupDetails.password !== signupDetails.confirmPassword,
    [signupDetails.confirmPassword, signupDetails.password],
  )

  const {
    isTaken: isNickNameTaken,
    checkIfValIsTaken: checkIfNickNameIsTaken,
  } = useCheckIfValIsTaken({
    currentValue: signupDetails.nickName,
    rootSocket,
  })

  const { isTaken: isEmailInUse, checkIfValIsTaken: checkIfEmailIsTaken } =
    useCheckIfValIsTaken({
      currentValue: signupDetails.email,
      rootSocket,
    })

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
          show={isNickNameTaken && signupDetails.nickName.length >= 3}
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
            handleFormChange(e)
            checkIfNickNameIsTaken(e)
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
            checkIfEmailIsTaken(e)
          }}
          value={signupDetails.email}
        />
      </div>
      <div>
        <InputNotification
          show={passwordsNotMatched}
          displayText='Passwords not matched'
        />
        <AuthInputWithShowPasswordToggle
          placeholder='Password*'
          required
          type='password'
          name='password'
          onChange={handleFormChange}
          value={signupDetails.password}
        />
        <span className='block h-6'></span>
        <AuthInputWithShowPasswordToggle
          placeholder='Confirm password*'
          required
          type='password'
          name='confirmPassword'
          onChange={handleFormChange}
          value={signupDetails.confirmPassword}
        />
      </div>
      <Button
        disabled={
          isNickNameTaken ||
          isEmailInUse ||
          passwordsNotMatched ||
          isSubmitDisabled
        }
        type='submit'
        name='login'
        className='bg-accent-dark/60 mt-2 capitalize text-lg transition-all duration-400 \n
        disabled:opacity-50 disabled:hover:brightness-100 disabled:hover:cursor-not-allowed'
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

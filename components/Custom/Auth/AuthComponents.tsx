import EyeOpenIcon from '@assets/EyeOpen'
import EyeSlashIcon from '@assets/EyeSlash'
import Loader from '@assets/Loader'
import Input from '@components/HTML/Input'
import { InputHTMLAttributes, useMemo, useState, useEffect } from 'react'

export default function AuthLoader() {
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full bg-primary-darkest/80 z-40'>
        <div className='flex justify-center items-center max-w-[30px] h-full mx-auto'>
          <Loader className='animate-spin text-white' />
        </div>
      </div>
    </>
  )
}

export function AuthInputWithShowPasswordToggle({
  containerClassName,
  className,
  onChange,
  value,
  ...others
}: InputHTMLAttributes<HTMLInputElement> & {
  containerClassName?: string
}) {
  const showToggleTypeBtn = useMemo(
    () =>
      others.type === 'password' &&
      typeof value !== 'number' &&
      value &&
      value.length > 0,
    [others.type, value],
  )
  const [type, setType] = useState(others.type)

  useEffect(() => {
    const resetTypeTimeout = setTimeout(() => {
      type === 'text' && others.type !== 'text' && setType(() => others.type)
    }, 3000)

    return () => {
      clearTimeout(resetTypeTimeout)
    }
  }, [others.type, type])

  return (
    <div className={`relative ${containerClassName}`}>
      <Input
        className={className}
        onChange={onChange}
        value={value}
        {...others}
        type={type}
      />
      {showToggleTypeBtn && (
        <button
          type='button'
          className='absolute top-[50%] right-4 translate-y-[-50%]'
          onClick={() =>
            setType((prev) => (prev === 'text' ? 'password' : 'text'))
          }
        >
          {type === 'text' ? <EyeSlashIcon /> : null}
          {type === 'password' ? <EyeOpenIcon /> : null}
        </button>
      )}
    </div>
  )
}

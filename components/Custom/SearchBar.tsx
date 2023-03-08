import LeftArrow from '@assets/LeftArrow'
import SearchIcon from '@assets/SearchIcon'
import Input from '@components/HTML/Input'
import { HTMLAttributes, useState } from 'react'

export default function SearchBar({
  inputProps,
}: {
  inputProps: HTMLAttributes<HTMLInputElement>
}) {
  const [isFocused, setIsFocused] = useState(false)
  const { onBlur, onFocus, className, ...otherInputProps } = inputProps

  return (
    <div className='input-default flex items-center py-2 px-4 gap-2'>
      <div
        className={`w-6 h-5 flex items-center justify-center transition-transform duration-300 ${
          isFocused ? 'rotate-[90deg]' : 'rotate-0'
        }`}
      >
        <LeftArrow
          className={`text-accent-dark inline-block absolute transition-opacity duration-150 rotate-[-90deg] ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <SearchIcon
          className={`inline-block absolute transition-opacity duration-150 ${
            isFocused ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>
      <Input
        className='text-sm whitespace-nowrap text-contrast-primary px-0 py-0 placeholder:text-sm placeholde placeholder:font-normal'
        {...otherInputProps}
        onFocus={(e) => {
          setIsFocused(true)
          onFocus && onFocus(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          onBlur && onBlur(e)
        }}
      />
    </div>
  )
}

import { HTMLAttributes } from 'react'

export default function Badge({
  className,
  children,
  ...otherProps
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <>
      <span
        {...otherProps}
        className='block py-[2px] px-[6px] bg-accent-light text-primary-dark text-xs rounded-full'
      >
        {children}
      </span>
    </>
  )
}

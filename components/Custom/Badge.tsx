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
        className='absolute w-full h-full flex justify-center items-center py-[2px] px-[6px] bg-accent-dark text-primary-dark text-xs rounded-full'
      >
        {children}
      </span>
    </>
  )
}

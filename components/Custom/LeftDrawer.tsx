import { HTMLAttributes, ReactNode, useMemo } from 'react'

export default function LeftDrawer({
  children,
  show,
  zIndex,
  ...rest
}: {
  children: ReactNode | ReactNode[]
  show: boolean
  zIndex: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <>
      <div
        className={`absolute h-full w-full bg-primary-default transition-all duration-300 ${
          show ? 'translate-x-0' : '-translate-x-full '
        } ${zIndex}`}
        {...rest}
      >
        {children}
      </div>
    </>
  )
}

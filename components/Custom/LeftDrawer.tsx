import { ReactNode, useMemo } from 'react'

export default function LeftDrawer({
  children,
  show,
  zIndex,
}: {
  children: ReactNode | ReactNode[]
  show: boolean
  zIndex: string
}) {
  return (
    <>
      <div
        className={`absolute h-full w-full bg-primary-default transition-all duration-300 ${
          show ? 'translate-x-0' : '-translate-x-full '
        } ${zIndex}`}
      >
        {children}
      </div>
    </>
  )
}

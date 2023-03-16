import { HTMLAttributes } from 'react'

export default function DeleteIcon({ className }: HTMLAttributes<SVGElement>) {
  return (
    <>
      <svg
        viewBox='0 0 24 24'
        height='24'
        width='24'
        preserveAspectRatio='xMidYMid meet'
        className={className}
        version='1.1'
        x='0px'
        y='0px'
        enable-background='new 0 0 24 24'
        xmlSpace='preserve'
      >
        <path
          fill='currentColor'
          d='M6,18c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H6V18z M19,3h-3.5l-1-1h-5l-1,1H5v2h14V3z'
        ></path>
      </svg>
    </>
  )
}

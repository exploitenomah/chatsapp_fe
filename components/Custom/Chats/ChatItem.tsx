import { useState } from 'react'
import Avatar from '../Avatar'

export default function ChatItem() {
  const [active, setActive] = useState(false)
  return (
    <div
      onClick={() => setActive(prev => !prev)}
      className={`w-full h-[72px] flex items-center ${
        active
          ? 'bg-secondary-darkest'
          : 'bg-primary-default hover:bg-secondary-default '
      }`}
    >
      <div className='cursor-pointer flex items-center pr-[6px] w-full'>
        <div className='px-[15px] flex justify-center items-center shrink-0'>
          <Avatar width={49} height={49} />
        </div>
        <div className='h-[72px] basis-auto flex grow flex-col justify-center items-start border-t border-t-contrast-secondary/20'>
          <div className='text-contrast-strong text-base'>Kendra Samel</div>
          <div className='text-contrast-secondary text-sm font-normal whitespace-nowrap flex relative w-full h-[20px]'>
            <span className='absolute w-full text-ellipsis overflow-hidden'>
              &#x202A;Hey 👋 Good day How are the roomie app, very impressive. I
              wanted to let you know that due to certain reasons, we have to put
              off designing it for now. I really appreciate all you&apos;ve
              done. I&apos;ll endeavour to communicate if and when we&apos;ll be
              continuing. Thank you!&#x202C
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

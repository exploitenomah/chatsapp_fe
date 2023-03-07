import MessageTailOut from '@assets/MessageTailOut'

export default function CurrentUserMsg() {
  return (
    <div className='px-16 min-w-full flex justify-end'>
      <div className='pt-1.5 pb-2.5 px-2 rounded-bl-lg rounded-br-lg rounded-tl-lg w-fit max-w-[75%] relative font-sm leading-5 text-contrast-strong bg-accent-default'>
        <div className='absolute top-0 -right-2 text-accent-default'>
          <MessageTailOut />
        </div>
        <div className='whitespace-pre-wrap'>
          <span>Omo, I don&apos;t even know</span>
        </div>
        <div>
          <div className='float-right ml-1 -mb-1.5 whitespace-nowrap text-[11px] text-contrast-primary/80'>
            02:19
          </div>
        </div>
      </div>
    </div>
  )
}

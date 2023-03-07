import MessageTailIn from '@assets/MessageTailIn'

export default function OtherUserMsg() {
  return (
    <div className='px-16 flex justify-start mb-3'>
      <div className='pt-1.5 pb-2.5 px-2 rounded-bl-lg rounded-br-lg rounded-tr-lg w-fit max-w-[75%] relative font-sm leading-5 text-contrast-strong bg-secondary-default'>
        <div className='absolute top-0 -left-2 text-secondary-default'>
          <MessageTailIn />
        </div>
        <div className='whitespace-pre-wrap'>
          <span>Omo, I don&apos;t even know</span>
        </div>
        <div>
          <div className='float-right ml-1 -mb-1.5 whitespace-nowrap text-[11px] text-contrast-primary/70'>
            02:19
          </div>
        </div>
      </div>
    </div>
  )
}

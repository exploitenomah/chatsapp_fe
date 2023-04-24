import { ReactNode, useMemo, useEffect } from 'react'

const Modal = ({
  children,
  show,
  keepMounted,
  hide,
  modalClassName,
  animate,
}: {
  children: ReactNode | ReactNode[]
  show: boolean
  keepMounted: boolean
  hide: () => void
  animate: boolean
  modalClassName?: string
}) => {
  const modalsInDom = useMemo((): HTMLDivElement[] => {
    return Array.from(document.querySelectorAll("[data-modal='true']"))
  }, [])
  const zIndex = useMemo(() => {
    {
      let highestZIndex = Math.max(...modalsInDom.map((el) => +el.style.zIndex))
      if (highestZIndex === Infinity || highestZIndex === -Infinity)
        highestZIndex = 0
      return modalsInDom.length > 0 ? `z-[${highestZIndex + 1000}]` : 'z-[1000]'
    }
  }, [modalsInDom])

  useEffect(() => {
    if (show) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [modalsInDom, show])

  const ModalContent = () => {
    return <div className={`${modalClassName}`}>{children}</div>
  }

  if (keepMounted) {
    return (
      <div role='presentation' tabIndex={-1}>
        <div
          data-modal={'true'}
          className={`fixed inset-0 ${zIndex} ${
            show
              ? 'fixed inset-0 h-screen w-screen bg-black/25 flex justify-center items-center '
              : 'hidden'
          } ${animate ? '' : ''}`}
        >
          <div
            onClick={hide}
            className={
              show
                ? 'absolute z-[900] inset-0 h-full w-full bg-black/25'
                : 'hidden'
            }
          />
          <div className={show ? 'relative z-[1000]' : 'hidden'}>
            <ModalContent />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div role='dialog' tabIndex={-1}>
      {show ? (
        <>
          <div
            onClick={hide}
            className='fixed inset-0 h-screen zz-[900] w-screen bg-black/50'
          ></div>

          <div
            data-modal='true'
            className={`fixed inset-0 ${zIndex} flex justify-center items-center overflow-auto ${
              animate ? '' : ''
            }`}
          >
            <div
              onClick={hide}
              className='absolute z-[900] inset-0 h-full w-full bg-black/25'
            />
            <div className='relative z-[1000]'>
              <ModalContent />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Modal

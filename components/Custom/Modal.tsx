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
  const zIndex = useMemo(
    () => `z-${Math.max(...modalsInDom.map((el) => +el.style.zIndex)) + 10}`,
    [modalsInDom],
  )

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
          onClick={hide}
          className={
            show ? 'fixed inset-0 h-screen w-screen bg-black/25' : 'hidden'
          }
        ></div>
        <div
          onClick={hide}
          data-modal={'true'}
          className={`fixed inset-0 ${zIndex} flex justify-center items-center ${
            animate ? '' : ''
          }`}
        >
          <ModalContent />
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
            className='fixed inset-0 h-screen w-screen bg-black/50'
          ></div>
          <div
            onClick={(e) => {
              e.stopPropagation()

              if (e.target === e.currentTarget) {
                hide()
              }
            }}
            data-modal='true'
            className={`fixed inset-0 ${zIndex} flex justify-center items-center overflow-auto ${
              animate ? '' : ''
            }`}
          >
            <ModalContent />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Modal

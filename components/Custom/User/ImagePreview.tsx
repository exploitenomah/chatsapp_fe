import { createPortal } from 'react-dom'
import Modal from '../Modal'
import Image from 'next/image'
import Button from '@components/HTML/Button'
import CloseIcon from '@assets/CloseIcon'

export default function ImagePreview({
  imgSrc,
  imgAlt,
  show,
  hide,
  onSubmit,
  width,
  height,
  multiple,
  submitButtonText,
}: {
  show: boolean
  hide: () => void
  onSubmit?: () => void
  imgSrc: string
  imgAlt: string
  width?: number | undefined
  height?: number | undefined
  multiple?: boolean
  submitButtonText?: string
}) {
  return createPortal(
    <>
      <Modal show={show} keepMounted={false} hide={hide} animate={true}>
        <div className='relative bg-primary-default py-8 px-4 flex flex-col w-[90vw] max-w-md rounded-lg animate-fade-in mx-auto'>
          <Button onClick={hide} className='max-w-fit ml-auto -mt-4 mb-2 mr-2'>
            <CloseIcon />
          </Button>
          {multiple ? (
            <></>
          ) : (
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={width || 100}
              height={height || 100}
              className='w-full h-auto max-w-[300px] object-contain mx-auto'
            />
          )}
          {onSubmit && (
            <Button
              className='mt-8 mx-auto bg-accent-default max-w-fit px-8 py-3'
              onClick={onSubmit}
            >
              {submitButtonText || <>Done</>}
            </Button>
          )}
        </div>
      </Modal>
    </>,
    document.getElementById('image-preview-container') as Element,
  )
}

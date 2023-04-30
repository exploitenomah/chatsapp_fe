import Button from '@components/HTML/Button'
import Input from '@components/HTML/Input'
import { User } from '@store/user/initialState'
import { useState, useCallback, useEffect, useMemo } from 'react'
import Avatar from '../Avatar'
import ImagePreview from './ImagePreview'
import useFetch from '@hooks/useFetch'
import useUser from '@sockets/useUser'
import Loader from '@assets/Loader'
import { useDispatch } from 'react-redux'
import { addAppAlert } from '@store/notifications/slice'

//https://res.cloudinary.com/<cloud_name>/<asset_type>/<delivery_type>/<transformations>/<version>/<public_id_full_path>.<extension>

const EditImageInput = ({
  handleSubmit,
  loading,
}: {
  toggleShowOptions: () => void
  handleSubmit: (newImg: File) => void
  loading: boolean
}) => {
  const [newImg, setNewImg] = useState<File | null | undefined>(null)
  const [show, setShow] = useState(false)
  const [imgSrc, setImgSrc] = useState('')

  return (
    <>
      <Button as='label' className=' shadow-none p-0'>
        {loading ? (
          <Loader className='w-[20px] h-[20px] animate-spin' />
        ) : (
          <>
            Edit
            <Input
              type='file'
              accept='image/*'
              className='hidden'
              name={''}
              onChange={(e) => {
                setShow(true)
                if (e.target.files?.[0]) {
                  setImgSrc(URL.createObjectURL(e.target.files?.[0]))
                  setNewImg(e.target.files?.[0])
                }
              }}
            />
          </>
        )}
      </Button>
      <ImagePreview
        show={show}
        hide={() => {
          setShow(false)
          URL.revokeObjectURL(imgSrc)
        }}
        onSubmit={() => {
          if (newImg) {
            handleSubmit(newImg)
          }
          setNewImg(null)
          URL.revokeObjectURL(imgSrc)
          setShow(false)
        }}
        submitButtonText='Update'
        imgSrc={imgSrc}
        imgAlt={newImg?.name || ''}
        width={300}
        height={300}
      />
    </>
  )
}

const ViewImageButton = ({
  profileImage,
  alt,
  toggleShowOptions,
}: {
  profileImage: User['profileImage']
  alt: string
  toggleShowOptions: () => void
}) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button
        onClick={(e) => {
          setShow(true)
          toggleShowOptions()
        }}
        className=' shadow-none p-0'
      >
        View
      </Button>
      <ImagePreview
        show={show}
        hide={() => setShow(false)}
        onSubmit={() => setShow(false)}
        imgSrc={profileImage?.path}
        imgAlt={alt}
        width={300}
        height={300}
      />
    </>
  )
}

const useHandleProfileImageUpdate = () => {
  const dispatch = useDispatch()
  const userSocket = useUser()
  const fetchFunc = useFetch()
  const postImage = useCallback(
    async (newImg: File) => {
      const body = new FormData()
      body.set('image', newImg)
      const res = await fetchFunc(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/uploads/profile-images`,
        {
          method: 'POST',
          body,
        },
      )
      let data
      if (res.json) data = await res.json()
      if (res.status && res.status !== 201)
        dispatch(
          addAppAlert({
            message: data ? data.message : res.message,
            variant: 'error',
            id: Math.random(),
          }),
        )
      else return data
    },
    [dispatch, fetchFunc],
  )
  return useCallback(
    async (newImg: File) => {
      const profileImage = await postImage(newImg)
      profileImage &&
        userSocket.emit('updateMe', { profileImage: profileImage.file })
    },
    [postImage, userSocket],
  )
}
const ImageOptions = ({
  show,
  toggleShowOptions,
  profileImage,
  alt,
}: {
  show: boolean
  toggleShowOptions: () => void
  profileImage: User['profileImage']
  alt: string
}) => {
  const updateProfileImage = useHandleProfileImageUpdate()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <div
        className={`
          ${
            show
              ? 'visible opacity-100 scale-100'
              : 'invisible opacity-0 scale-0'
          } text-center origin-top-left w-[120px] py-2 bg-primary-light absolute top-[50%] left-[50%] transition-all duration-500 z-[100] flex justify-center items-center flex-col`}
      >
        <ul className='flex justify-center items-center flex-col gap-y-4 py-2'>
          <li>
            <ViewImageButton
              profileImage={profileImage}
              alt={alt}
              toggleShowOptions={toggleShowOptions}
            />
          </li>
          <li>
            <EditImageInput
              loading={loading}
              toggleShowOptions={toggleShowOptions}
              handleSubmit={async (newImg) => {
                setLoading(true)
                await updateProfileImage(newImg)
                setLoading(false)
              }}
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default function UserImage({
  profileImage,
  alt,
}: {
  profileImage: User['profileImage']
  alt: string
}) {
  const [showOptions, setShowOptions] = useState(false)
  const [imgHasLoadErr, setImgHasLoadErr] = useState(true)
  const handleImgLoadErr = useCallback(() => {
    setImgHasLoadErr(true)
  }, [])
  const handleImgLoaded = useCallback(() => {
    setImgHasLoadErr(false)
  }, [])

  return (
    <>
      <div className='relative'>
        <div onClick={() => setShowOptions((prev) => !prev)} className=''>
          <Avatar
            handleError={handleImgLoadErr}
            handleLoad={handleImgLoaded}
            width={200}
            height={200}
            src={profileImage.path}
            alt={alt}
          />
        </div>
        <ImageOptions
          show={showOptions && !imgHasLoadErr}
          toggleShowOptions={() => setShowOptions((prev) => !prev)}
          profileImage={profileImage}
          alt={alt}
        />
      </div>
    </>
  )
}

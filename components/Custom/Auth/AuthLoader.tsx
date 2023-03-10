import Loader from '@assets/Loader'

export default function AuthLoader() {
  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full bg-primary-darkest/80 z-40'>
        <div className='flex justify-center items-center max-w-[30px] h-full mx-auto'>
          <Loader className='animate-spin text-white' />
        </div>
      </div>
    </>
  )
}

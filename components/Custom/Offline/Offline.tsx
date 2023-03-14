import NoWifi from '@assets/NoWifi'
import AppIntro from '../App/AppIntro'

export default function Offline() {
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='text-center'>
          <div className='text-red-400 text-4xl flex justify-center items-center mx-auto'>
            <NoWifi />
          </div>
          <p className='text-lg text-contrast-tertiary font-bold tracking-wide mx-auto mb-8 mt-3'>
            Please go online to use ChatsApp
          </p>
          <div className='opacity-20'>
            <AppIntro />
          </div>
        </div>
      </div>
    </>
  )
}

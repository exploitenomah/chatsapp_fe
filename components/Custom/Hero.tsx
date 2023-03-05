import DarkIntroLogo from '@/assets/DarkIntroLogo'
import Button from '@components/HTML/Button'
import { Roboto, Dancing_Script } from 'next/font/google'
import AppIntro from './AppIntro'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const dancingScript = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})

export default function Hero({
  showLogin,
  showSignup,
}: {
  showLogin: () => void
  showSignup: () => void
}) {
  return (
    <div className=' flex flex-col h-screen w-screen justify-center border-x-accent-darkest border-x-4'>
      <header className='flex justify-between items-center w-[80vw] max-w-[1000px] mx-auto pt-8 mb-auto'>
        <h1 className={`${dancingScript.className} text-md weight-400`}>
          ChatsApp Web
        </h1>
        <Button
          className='shadow-none hover:underline hover:text-accent-dark py-0 px-0 duration-300'
          onClick={showLogin}
        >
          Login
        </Button>
      </header>
      <main className={`${roboto.className} text-center mb-auto`}>
        <div className='px-4'>
          <AppIntro />
          <Button
            className='bg-accent-darkest text-white mt-4'
            onClick={showSignup}
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  )
}

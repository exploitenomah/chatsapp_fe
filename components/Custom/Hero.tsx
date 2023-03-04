import DarkIntroLogo from '@/assets/DarkIntroLogo'
import Button from '@components/HTML/Button'
import { Roboto, Dancing_Script } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const dancingScript = Dancing_Script({
  weight: '400',
  subsets: ['latin'],
})
export default function Hero() {
  return (
    <div className=' flex flex-col h-screen w-screen justify-center  '>
      <header className='flex justify-between items-center w-[80vw] max-w-[1000px] mx-auto pt-8 mb-auto'>
        <h1 className={`${dancingScript.className} text-md weight-400`}>
          ChatsApp Web
        </h1>
        <Button className='shadow-none hover:underline hover:text-accent-dark py-0 px-0 duration-300'>
          Login
        </Button>
      </header>
      <main className={`${roboto.className} text-center mb-auto`}>
        <div className='px-4'>
          <DarkIntroLogo className='max-w-[290px] md:max-w-[initial] inline-block mx-auto' />
          <h1 className='text-3xl weight-300 mt-10'>ChatsApp Web</h1>
          <p className='mt-4 text-sm text-contrast-secondary'>
            Send and recieve messages in your web browser.
          </p>
          <Button className='bg-accent-darkest text-white mt-4'>
            Get Started
          </Button>
        </div>
      </main>
    </div>
  )
}

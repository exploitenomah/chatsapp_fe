import DarkIntroLogo from '@assets/DarkIntroLogo'

export default function AppIntro() {
  return (
    <>
      <DarkIntroLogo className='max-w-[290px] md:max-w-[initial] inline-block mx-auto text-center' />
      <h1 className='text-3xl weight-300 mt-10 text-center'>ChatsApp Web</h1>
      <p className='mt-4 text-sm text-contrast-secondary text-center'>
        Send and recieve messages in your web browser.
      </p>
    </>
  )
}

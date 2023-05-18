import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-primary-default bg-no-repeat text-contrast-primary h-screen w-screen  overflow-hidden'>
        <div className='bg-doodle bg-primary-default -z-10 fixed top-0 left-0 w-screen h-screen'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-primary-default bg-no-repeat text-contrast-primary h-screen overflow-y-hidden'>
        <div className='body-bg bg-primary-default'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

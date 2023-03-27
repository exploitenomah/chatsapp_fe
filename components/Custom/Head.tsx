import Head from 'next/head'

export default function AppHead({
  title,
  favicon,
}: {
  title?: string
  favicon?: string
}) {
  return (
    <Head>
      <title>{title || 'ChatsApp'}</title>
      <meta charSet='utf-8' />
      <meta name='google' content='notranslate' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='viewport' content='width=device-width' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
      <meta
        name='description'
        content='Quickly send and receive ChatsApp messages right from your computer.'
      />
      <meta
        name='og:description'
        content='Quickly send and receive ChatsApp messages right from your computer.'
      />
      <meta name='og:url' content='' />
      <meta name='og:title' content='ChatsApp Web' />
      <meta name='og:image' content='' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href={favicon || '/images/favicon.ico'} />
      <link
        rel='apple-touch-icon'
        sizes='194x194'
        href='images/apple-touch-icon.png'
        type='image/png'
      />
      <meta
        name='theme-color'
        content='#111b21'
        media='(prefers-color-scheme: dark)'
      />
      <meta name='theme-color' content='#f0f2f5' />
    </Head>
  )
}

{
  /* <head><title>(3) WhatsApp</title>><link id="whatsapp-pwa-manifest-link" rel="manifest" href="/manifest-apple.json" crossorigin="use-credentials"><style>@font-face {font-family:"Noto-Emoji"; src:url("/noto_emoji_regular_74a68c7003890e207589ea43dc7572ca.ttf") format("truetype");}</style><link id="favicon" rel="shortcut icon" type="image/png" href="/img/f03_577fd59324f5db48af17efcba0a23ea5.png" src="/img/f03_577fd59324f5db48af17efcba0a23ea5.png"><head> */
}

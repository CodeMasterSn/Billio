import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicons/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicons/favicon.png" />
        <link rel="apple-touch-icon" href="/favicons/favicon.png" />
        
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8Y0MP42KQS"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8Y0MP42KQS');
            `,
          }}
        />
        
        {/* EmailJS SDK */}
        <script async src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (typeof emailjs !== 'undefined') {
                  emailjs.init('6hm0WhalT5Uwk0Jv9');
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

/* eslint-disable @next/next/no-sync-scripts */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO */}
        <meta
          name="description"
          content="Permguard Playground: Build and Test AuthZ requests for access control. Secure authorization flows."
        ></meta>
        <meta name="theme-color" content="#17181c" />
        <meta name="msapplication-navbutton-color" content="#17181c" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#17181c" />
        <link rel="canonical" href="https://www.permguard.com/" />
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Permguard" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* OG */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/cover.png" />
        <meta property="og:site_name" content="permguard" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/cover.png" />
        <meta name="twitter:title" content="Permguard" />
        <meta
          name="twitter:description"
          content="Permguard Playground: Build and Test AuthZ requests for access control. Secure authorization flows."
        />
        <meta name="twitter:site" content="@permguard" />

        {/* Scripts */}
        {/* // eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="bb831f85-0e1a-49af-a1a4-96f77ce707d4"
          data-blockingmode="auto"
          type="text/javascript"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

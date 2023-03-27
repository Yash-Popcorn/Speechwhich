import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "@picocss/pico"
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

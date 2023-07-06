import { StateProvider } from '@/context/state'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import fetchJson from '@/lib/fetchJson'
import { SWRConfig } from 'swr'

export default function MyApp({ Component, pageProps }:AppProps) {
  return (
    <StateProvider>
       <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
      <Component {...pageProps} />
      </SWRConfig>
      </StateProvider>
  )
}

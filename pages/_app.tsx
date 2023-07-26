import { StateProvider } from '@/context/state'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import fetchJson from '@/lib/fetchJson'
import { SWRConfig } from 'swr'
import Layout from '@/components/Layout'
import { useState } from 'react'
import {SocketContext, socket,disconnect} from '@/context/socket';
import { ToastContextProvider } from "@/context/ToastContext";
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
  <SocketContext.Provider value={{socket,disconnect}}>
  <ToastContextProvider>
      <Component {...pageProps} />
      </ToastContextProvider>
      </SocketContext.Provider>
      </SWRConfig>
      </StateProvider>
  )
}

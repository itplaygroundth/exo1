import Head from 'next/head'
import Header from './Header'
import { useContext, useEffect,useState } from 'react';
import  { SocketContext } from '@/context/socket';
import {useUserState} from '@/context/state'
import useUser from '@/lib/useUser';
import { IMsg } from '@/lib/socket';
import { useToast } from "@/hooks/useToast";


export default function Layout({ children }: { children: React.ReactNode }) {
  const {user,mutateUser} = useUser()
  //const [users,setUsers] = useState(user)
  const [message,setMessage] = useUserState()
  const [status,setStatus] =useUserState()
  const {socket} = useContext(SocketContext)
  const toast = useToast();

  useEffect(()=>{
    setStatus(true)
    socket.on("connect_error", () => {
      // revert to classic upgrade
      socket.io.opts.transports = ["polling", "websocket"];
    });
    socket.emit('online',user?.access_token)
    socket.on('notification',async (msg:IMsg)=>{
    await toast.success(msg.content)
     // await setStatus(true)
     // await setMessage(msg.content)
    })
  },[socket])
  return (
    <>
      <Head>
        <title>With Iron Session</title>
      </Head>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
            'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }

        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
      <Header />
 
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  )
}

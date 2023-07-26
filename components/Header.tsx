//@ts-nocheck
import Link from 'next/link'
import useUser from '@/lib/useUser'
import { useRouter } from 'next/router'
import Image from 'next/image'
import fetchJson from '@/lib/fetchJson'
import axios from 'axios'
import {SocketContext} from '@/context/socket';
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { useUserState } from "@/context/state";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IMsg } from '@/lib/socket'
import Toast from './Toast';
const fetcher = (url:string) => axios(url).then(res => res.data)

export default function Header() {
  const { user, mutateUser } = useUser()
  const router = useRouter()
 
  const {socket,disconnect} = useContext(SocketContext);
  const {message,setMessage} = useUserState()

 
  const signout = useCallback(async ()=>{
 
    
   // if(socket.connected){
 await  disconnect(user.access_token)
  // socket.emit("offline",token)
   // }
     mutateUser(
      await fetchJson('/api/logout', { method: 'POST' }),false
    )
    router.push('/')
  },[user])

 // const notify = (mesg) => toast(mesg);

  // useEffect(()=>{
  //   // if(socket.connected)
  //   // socket.emit("offline",user?.access_token)
  //  socket.connect()
   
  // },[socket])

  // socket.on('connect',()=>{
  //   if(user)
  //   socket.emit("online",user.access_token) 
  //   socket.on("notification",(message:any) => {
    
  //     console.log(message.content)
  //    // setMsg(message);
  //     notify(message.content)
  //     //notify(message.content)
     
  //        //   showToast()
  // });
  // })
  return (
    <header>
     
  <nav>
        <ul>
          <li>
            {socket.connected?<span className='text-green-600'>Online</span>:<span className='text-red-600'>Offline</span>}
          </li>
          <li>
            <Link href="/dashboard">
              Home
            </Link>
          </li>
          {user?.isLoggedIn === false && (
            <li>
              <Link href="/login">
                Login
              </Link>
            </li>
          )}
          {user?.isLoggedIn === true && (
            <>
               
              <li>
                <Link href="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/api/logout"
                  onClick={async (e) => {
                     e.preventDefault()
                    signout()
                    // mutateUser(
                    //   await fetchJson('/api/logout', { method: 'POST' }),
                    //   false
                    // )
                    // signout()
                    // router.push('/')
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          )}
           
        </ul>
      </nav>
     
      {/* <div id="myToast" className={`${alert} fixed right-10 bottom-10 px-5 py-4 border-r-8 border-blue-500 bg-white drop-shadow-lg`}>
                <p className="text-sm">
            
                <span className="mr-2 inline-block px-3 py-1 rounded-full bg-blue-500 text-white font-extrabold">i</span>
                {msg?.content}
                </p>
            </div>
        <div id="toast-top-right" className={`${alert} fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800`} role="alert">
        <div className="text-sm font-normal">{msg?.content || "....."}</div>
        {msg?.content}
        </div> */}
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
    
  )
}

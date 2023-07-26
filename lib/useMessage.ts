import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import { User,Message } from '@/pages/api/user'

export default function useMessage({
    msg = '', 
  } = {}) {
    const { data: message, mutate: mutateMessage } = useSWR<any>('/api/subscribe')
  
     useEffect(() => {
    //   // if no redirect needed, just return (example: already on /dashboard)
    //   // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
       if (!message) return
  
    //   if ((redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
    //     (redirectIfFound && user?.isLoggedIn)
    //     ) {
    //     //Router.push(redirectTo)
    //     }
     }, [message])
   
    return { message, mutateMessage }
  }
import React from 'react'
import Layout from '@/components/Layout'
import { withIronSessionSsr } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { User } from '@/pages/api/user'
 
import useSWR from 'swr'
import { InferGetServerSidePropsType } from 'next'
import transactions from '../api/transactions'

import axios from 'axios'

const fetcher = (url:string) => axios(url).then(res => res.data)

export default function SsrProfile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    
const {data,mutate} =  useSWR('/api/user',fetcher,{refreshInterval: 5000}) 

 

  return (
    <Layout>
      {user?.isLoggedIn && data &&  (
        data.result?.forEach((element:any) => {
            <div className='row'>
                <div>
                element.id
                </div>
                <div>
                element.userid
                </div>
            </div>
        })
      )}
    </Layout>
  )
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return {
      props: {
        user: { isLoggedIn: false, login: '', avatarUrl: '' } as User,
      },
    }
  }
 
  

  return {
    props: { user: req.session.user },
  }
},
sessionOptions)
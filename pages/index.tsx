import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProfileBox from '@/components/ProfileBox'
import Counter from '@/components/Counter'
import SigninBox from '@/components/Signin'
import { useUserState } from '@/context/state'
import csrf from '@/csrf'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import LoginBox from '@/components/Login'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props: { csrfToken: string,users:any }) {
  
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
     { !props.users? <LoginBox {...props} />:
     <ProfileBox {...props}/>
     }
    </main>
    )
  
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps(context:any) {
    const { locale, req, res } = context;
   // console.log(req.session.cookie)
    const user = req.session.user;
     
  await csrf(req, res)
  return {
      props: { csrfToken: req.csrfToken(),users: user?user:null },
  }
},sessionOptions
)
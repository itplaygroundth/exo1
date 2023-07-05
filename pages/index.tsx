import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProfileBox from '@/components/ProfileBox'
import Counter from '@/components/Counter'
import SigninBox from '@/components/Signin'
import csrf from '@/csrf'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props: { csrfToken: string }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
    <SigninBox {...props} />
    </main>
  )
}
export async function getServerSideProps(context:any) {
  const { locale, req, res } = context;
  
  await csrf(req, res)
  return {
      props: { csrfToken: req.csrfToken() },
  }
}
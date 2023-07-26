import axios from 'axios'
import { useRouter } from 'next/router'
import csrf from '@/csrf'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Layout from '@/components/Layout';
import { useContext, useEffect } from 'react';
import {SocketContext} from '@/context/socket';

const  dashboard = (props: { csrfToken: string,users:any }) => {

    const {users} = props;
   // const {socket,disconnect,connect} = useContext(SocketContext);
    const router = useRouter()

    // const { toasts, handlers } = useToaster();
    // const { startPause, endPause } = handlers;


    const withdraw = async (event:any) => {
        event.preventDefault()
        await axios.post('/api/withdraw',{amount: event.target.amount.value})
    .catch((error) => {console.log(error);})
    }

    const signout = async (event:any) => {
        event.preventDefault()
        await axios.post('/api/logout') 
        router.replace('/')
    
    }

 
    return (
        <Layout>
      
          
        <div className="flex justify-center mt-10  ">
        <div className=" w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hello {users.username} </h5>
            <h2>Your Balance: Bath</h2>
            <div className="pt-10">
            <form onSubmit={async (e)=>{
               await withdraw(e)
            }}>
                <label className="block" htmlFor="amount">Amount</label>
                    <input type="text" placeholder="0.0" name="amount" 
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                    
            
            <div className="flex space-x-6 mt-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >    
            Withdraw
            </button>
            {/* <button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={async(e)=>{ await signout(e)}}>    
            Sign Out
            </button> */}
            </div>
            </form>
            
            </div>
        </div>
        </div>
        </Layout>
      );
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
export default dashboard
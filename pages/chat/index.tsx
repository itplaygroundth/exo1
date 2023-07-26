//@ts-nocheck
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import Layout from '@/components/Layout';
import { useEffect, useState,useContext } from 'react';
import {SocketContext} from '@/context/socket';
//import io from '@/lib/socket';



const chatboard = (props: { csrfToken:any ,users: any }) => {


    
    //const socket = useSocket("https://wss.gclubfinz.com",props.users.access_token)
    const {socket,disconnect} = useContext(SocketContext);
    const showToast = () =>{ }
    const token = props.users?.access_token;
    const noti_token = props.users?.noti_token

    // useEffect(() => {
    // //@ts-ignore
        
    //     if(socket.connected){
        

    //         // socket.on('authenticated',()=>{

    //         // }).
    //         // on('unauthorized', (msg) => {
    //         //     console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    //         //     throw new Error(msg.data.type);
    //         // })
    //         // .emit('authenticate',{noti_token});
            
    //        // socket.emit("online",token) 
           
            
    //     }

    //   //  io.connect()
    //     // io.on("connect", () => {
    //     //     io.on('authenticated',()=>{

    //     //     }).
    //     //     on('unauthorized', (msg) => {
    //     //         console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    //     //         throw new Error(msg.data.type);
    //     //     })
    //     //     .emit('authenticate',{noti_token});
        
    //     // io.emit("online",token) //{"username":props.users.username,"userid":props.users.id});
    
    //     // io.on("notification",(message:any) => {
    //     //             setMsg(message);
    //     //          //  console.log(message)
    //     //              //showToast()
    //     // });
    //     // });


    // },[socket]);


    return (
        <Layout>
   
        </Layout>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps(context:any) {
    const { locale, req, res } = context;

    const user = req.session.user;

    return {
        props: { users: user?user:null },
    }
},sessionOptions
)
export default chatboard
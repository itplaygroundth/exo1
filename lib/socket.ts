import useSWR  from 'swr';

import io,{ Socket } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("https://wss.gclubfinz.com",
 { autoConnect: false,
   reconnection:true,
   secure:true,
   //query: { queueName: 'notification-UID-' , token: 'xxxx123456xxx'},
   transports:['polling'] });
//const socket = socketIOClient("http://141.98.19.26:6010");
export type IMsg = {
    username: string
    content: string
}
function useSocket(url:string,token:string){
    const [socket,setSocket] = useState(null)
     
    
    useEffect(()=>{
       
        const socketio = io(url,{ autoConnect: true,
        reconnection:true,
        secure:true,
        //query: { queueName: 'notification-UID-' , token: 'xxxx123456xxx'},
        transports:['polling'] })

        socketio.on("connect", () => {
            socketio.on('authenticated',()=>{

            }).
            on('unauthorized', (msg) => {
              //  console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
                throw new Error(msg.data.type);
            })
            .emit('authenticate',{"token":"xxxxxxx"});
        
         socketio.emit("online",token) //{"username":props.users.username,"userid":props.users.id});
    
       // socketio.on("notification",(message:any) => {
                 //   setMsg(message);
                 //  console.log(message)
                     //showToast()
       // });
        });
       socketio.on("disconnect",()=>{
       // console.log("disconnect")
        })
        //@ts-ignore
        setSocket(socketio)
   
        // function cleanup() {
        //     //@ts-ignore
        //     socket.disconnect();
        //   }
        //   return cleanup;
        
    },[])
return socket
}

export default useSocket//socket;
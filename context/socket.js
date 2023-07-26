import socketio from "socket.io-client";
import React, { createContext, useContext } from 'react';

export const socket = socketio("https://wss.gclubfinz.com",{ autoConnect: true,
reconnection:true,
secure:true,
//query: { queueName: '' , token: 'xxxx123456xxx'},
//transports: ["websocket","polling"]
})
    //     io.on('authenticated',()=>{

    //     }).
    //     on('unauthorized', (msg) => {
    //         console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
    //         throw new Error(msg.data.type);
    //     })
    //     .emit('authenticate',{noti_token});;
export function disconnect(token) {
    socket.emit("offline",token)
}
export function connect(token) {
   return socket.connect()
}
export const SocketContext = React.createContext();
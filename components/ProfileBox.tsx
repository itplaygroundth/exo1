import { useUserState } from "@/context/state"
import style from './Profile.module.css';

import React from 'react';
 
export default function ProfileBox(props:any){
    
    //const {users,setUsers} = useUserState();
     
      return (
        <div className="flex justify-center  ">
        <div className=" w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hello {props.users.name}</h5>
            <h2>Your Balance: {props.users.balance} BTC</h2>
        </div>
        </div>
      );
}
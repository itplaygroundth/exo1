import { useUserState } from "@/context/state"
import style from './Profile.module.css';
import axios from "axios";
import React from 'react';
import Image from 'next/image'

import { withIronSessionApiRoute } from "iron-session/next";

export default function SigninBox(props: { csrfToken: string }) {

    const[ user, setUser ] = useUserState();
    const {csrfToken} = props;
    const signin = async (event:any) =>{
        
          
           //const csrf = await  axios.get("/api/csrf") 
            
            await axios.post("/api/signin", 
                    {"user": event.target.username.value,"pass": event.target.password.value},
                {
                    
                headers: {
                "content-type": "application/json",
                "samesite":"Strict",
                "httponly": true,
                'CSRF-Token': csrfToken
                },
            })
            .then(async (response)=>{
                //console.log(user);
                await setUser(user)
                //setUser({...user,name:event.target.username.value})
                 
            })
            .catch((e) => console.log(e));
        
    }
    return (
         
             <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
             <div className="flex justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
            </div>
            <h3 className="text-2xl font-bold text-center">Login to your account</h3>
            <form onSubmit={(e) => {
          e.preventDefault();
          signin(e);
        }}>
            <div className="mt-4">
                <div>
                    <label className="block" htmlFor="username">Username</label>
                            <input type="text" placeholder="Username" name="username" 
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                            <span className="text-xs tracking-wide text-red-600">Username field is required </span>
                </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                            <input type="password" placeholder="Password" name="password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
                </div>
                <div className="flex items-baseline justify-between">
                    <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                   
                </div>
            </div>
            <input type="hidden" name="csrf_token" value={csrfToken} />
            </form>
            </div>
       
    );
        
}


//@ts-nocheck
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import type { User } from '@/pages/api/user'
import useUser from '@/lib/useUser'
import { useContext } from 'react'
 
export default withIronSessionApiRoute(logoutRoute, sessionOptions)

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {

  
 
  
  
    if(req.session.user){
        const {access_token,refresh_token,notify_token} = await req.session.user;
       
      
    await axios.post("http://141.98.19.26:5000/api/logout", 
      {},
      {
          headers: {
              "content-type": "application/json",
              'Authorization': 'Bearer ' +  req.session.user?.access_token,
              'x-access-token':   notify_token ,
              "samesite":"Strict",
              "httponly": true,
              //'CSRF-Token': csrf_token
              },
      }).then(async(response) =>{
        
          if(response.data.status){
             
            
            await req.session.destroy()
            res.json({ isLoggedIn: false,auth:false,notify_token: "", login: '', avatarUrl: '' ,status: false,access_token: '',refresh_token:''}) 
          }
         
       
       })
      .catch(async (e) => {
        
      //  if(e.response.status==403)
      //  {
      //      console.log(refresh_token)
         
      //       await axios.post("http://141.98.19.26:5000/api/refresh", 
      // {},
      // {
      //     headers: {
      //         "content-type": "application/json",
      //         'Authorization': 'Bearer ' + refresh_token,
      //         "samesite":"Strict",
      //         "httponly": true,
      //         //'CSRF-Token': csrf_token
      //         },
      // }).then(async(response) =>{
          
      //     if(response.data.status){
           
      //       await req.session.destroy()
      //       res.json({ isLoggedIn: false,auth:false,token:'', login: '', avatarUrl: '' ,status: false,access_token: '',refresh_token:''}) 
      //     }
         
       
      //  })
      // .catch((e) => {
      //   console.log(e.response.statusText)
      //   console.log(e.response.status)
      // })
      //  }
    });

       
    }

}
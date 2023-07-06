import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import type { User } from '@/pages/api/user'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

async function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {

     
    const user = await req.session.user;
   // const csrf_token = await req.body;
    if(user){
    await axios.post("http://141.98.19.26:5000/api/signout", 
      {},
      {
          headers: {
              "content-type": "application/json",
              'Authorization': 'Bearer ' + user.token,
              "samesite":"Strict",
              "httponly": true,
             // 'CSRF-Token': csrf_token
              },
      }).then(async(response) =>{
          
          if(response.data.status){
           
   
          }
         // res.json({ isLoggedIn: false, login: '', avatarUrl: '' })
       
      })
      .catch((e) => console.log(e));

      await req.session.destroy()
      res.json({ isLoggedIn: false, login: '', avatarUrl: '' ,status: false,token: ''}) 
    }

}
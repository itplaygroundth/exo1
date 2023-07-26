import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import type { User } from '@/pages/api/user'

export default withIronSessionApiRoute(refreshRoute, sessionOptions)

async function refreshRoute(req: any, res: NextApiResponse<User>) {

    if(req.session.user){
        const {access_token,refresh_token} = await req.session.user;
        
        await axios.post("http://141.98.19.26:5000/api/refresh", 
    {},
    {
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + refresh_token,
            "samesite":"Strict",
            "httponly": true,
            //'CSRF-Token': csrf_token
            },
    }).then(async(response) =>{
 
        if(response.data.status){
        
        req.session.user = response.data;
        req.session.user.isLoggedIn = true;
        
        await req.session.save();
        
 
        }
        res.json(response.data);
 
    })
    .catch((e) => res.json(e));
     

       
    }

}
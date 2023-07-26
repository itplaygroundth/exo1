import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import type { User } from '@/pages/api/user'

export default withIronSessionApiRoute(transactionRoute, sessionOptions)

async function transactionRoute(req: any, res: NextApiResponse<User>) {
    
     
        const {access_token,refresh_token} = await req.session.user;
        await axios.get("http://141.98.19.26:5000/api/transactions", 

    {
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + access_token,
            "samesite":"Strict",
            "httponly": true,
            //'CSRF-Token': csrf_token
            },
    }).then((response) =>{
       // console.log(response.data)
       // if(response.data.status){
        
        // req.session.user = response.data;
        // req.session.user.isLoggedIn = true;
        
        // await req.session.save();
        
        res.json(response.data);
      //  }
        
 
    })
    .catch( (e) => {

        res.json(e.response.data);
    })
     
 

}
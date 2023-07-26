import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@/lib/session'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import type { User,Message } from '@/pages/api/user'

export default withIronSessionApiRoute(subscribeRoute, sessionOptions)

async function subscribeRoute(req: any, res: NextApiResponse<User>) {
    
     
        const {access_token,refresh_token,notify_token,username} = await req.session.user;

 

        await axios.post("http://141.98.19.26:6020/channel/subscribe", 
        {"username": username,"role":"user","channel":"sunshine"},
        {
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + access_token,
            'x-access-token': notify_token,
            "samesite":"Strict",
            "httponly": true,
            //'CSRF-Token': csrf_token
            },
    }).then((response) =>{
       // console.log(response.data);
       // console.log(response.data)
       // if(response.data.status){
        
        // req.session.user = response.data;
        // req.session.user.isLoggedIn = true;
        
        // await req.session.save();
        
        res.json(response.data);
      //  }
        
 
    })
    .catch( (e:any) => {

        console.log(e)
       // res.json({'error': e.error});
    })
     
 

}
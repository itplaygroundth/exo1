import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import {   NextApiResponse } from "next";
import axios from "axios";
 
export default withIronSessionApiRoute(loginRoute, sessionOptions);

 

async function loginRoute(req:any, res:NextApiResponse) {
 
  const { user,pass,csrf_token } = await req.body;
  
 

  await axios.post("http://141.98.19.26:5000/api/signin", 
    {"user": user,"pass": pass},
    {
        headers: {
            "content-type": "application/json",
            "samesite":"Strict",
            "httponly": true,
            'CSRF-Token': csrf_token
            },
    }).then(async(response) =>{
 
        if(response.data.status){
        req.session.user = response.data;
        
        await req.session.save();
        
 
        }
        res.json(response.data);
 
    })
    .catch((e) => console.log(e));
}

 
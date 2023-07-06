import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import {   NextApiResponse } from "next";
import axios from "axios";
 
export default withIronSessionApiRoute(withdrawRoute, sessionOptions);

 

async function withdrawRoute(req:any, res:NextApiResponse) {
 
  const { amount,csrf_token } = await req.body;
  
 if(req.session){
  await axios.post("http://141.98.19.26:5000/api/withdraw", 
    {"amount": amount },
    {
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' +req.session.user.token,
            "samesite":"Strict",
            "httponly": true,
            'CSRF-Token': csrf_token
            },
    }).then(async(response) =>{
      res.json(response.data);
    })
    .catch((e) => console.log(e));
}
}


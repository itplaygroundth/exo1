import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import csrf from '@/csrf'
export default withIronSessionApiRoute(loginRoute, sessionOptions);

 

async function loginRoute(req:any, res:NextApiResponse) {
  // get user from database then:

  const { user,pass } = await req.body;

  //await csrf(req, res);

  await axios.post("/api/signin", 
    {"user": user,"pass": pass},
    {
    headers: req.headers,
    }).then(async(response) =>{
        console.log(response.data)
        req.session.user = response.data;
        await req.session.save();
        res.json(response.data);
    })
    .catch((e) => console.log(e));
 
}

 
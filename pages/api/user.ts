import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export type User = {
  isLoggedIn: boolean;
  login: string;
  avatarUrl: string;
  access_token: string;
refresh_token: string;
notify_token:string;
auth:boolean;
  status: boolean;
};

export type Message = {
  token:String;
  username:String;
  userid: Number;
  message:String
}

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      auth:false,
      notify_token:"",
      login: "",
      avatarUrl: "",
      status:false,
      access_token:"",
      refresh_token:"",
    });
  }
}
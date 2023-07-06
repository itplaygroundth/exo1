import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/session";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
 
  // do anything with session here:
 const { user } = session;
 
 if(!user) {
    return NextResponse.redirect(new URL('/login',req.url))
 }
//  else {
    
//   return NextResponse.redirect(new URL('/dashboard', req.url))
//  }
//   const userToken = req.cookies.get('access_token')?.value;
//  if(!user) {
//       return NextResponse.redirect(new URL('/',req.url))
//    }
//    else {
//     return NextResponse.redirect(new URL('/dashboard', req.url))
//    }
  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
   //await session.destroy();

  //console.log("from middleware", { user });

  // demo:
//   if (user?.login !== "vvo") {
//     return new NextResponse(null, { status: 403 }); // unauthorized to see pages inside admin/
//   }

 // return res;
};

export const config = {
  matcher: "/dashboard",
};
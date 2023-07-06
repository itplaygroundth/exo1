// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import type { User } from "@/pages/api/user";

export const sessionOptions: IronSessionOptions = {
  password: 'EiKf9vBVMW0Qiu6EWgzwU7PyCdD0BLxv7ks4kTe4fXvGPDYsS3QT3wugV4ReGopt',
  cookieName: "pgfinz-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};



// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
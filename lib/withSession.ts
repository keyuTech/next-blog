import { UserRes } from './../pages/api/v1/users';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

export const ironOptions = {
  cookieName: "blog",
  password: process.env.SECRET || "ba1415e1-0f5f-4fb1-9ad0-da923c954852",
  cookieOptions: {
    // secure: process.env.NODE_ENV === "production",
    secure: false
  },
};

export const withSessionApi = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, ironOptions);
};

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, ironOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    user?: UserRes
  }
}
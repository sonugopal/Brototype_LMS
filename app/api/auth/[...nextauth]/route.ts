import NextAuth  from 'next-auth/next'
import CredentialsProvider from "next-auth/providers/credentials";
import apiService from '../../../../service/apiService';
import {NextAuthOptions} from 'next-auth'

export const authOption: NextAuthOptions = {
  providers : [
    CredentialsProvider({
      name: "Creds",
      credentials: {
        phoneNumber: { label: "Mobile", type: "number", placeholder: "+91" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await apiService.post('api/auth/login', {
          phoneNumber: credentials?.phoneNumber,
          password: credentials?.password
        })
        const user = await res.data.user;

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages:{
    signIn: '/sign-in',
    error: '/sign-in'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token } : any) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOption);

export {handler as GET, handler as POST}
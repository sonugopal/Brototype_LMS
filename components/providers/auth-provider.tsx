"use client"

import { ReactNode } from "react";
import { SessionProvider } from 'next-auth/react'

interface AuthProvider {
    children : ReactNode
}

const AuthProvider = ({children}: AuthProvider) => {
    return ( 
        <SessionProvider>
            {children}
        </SessionProvider>
     );
}
 
export default AuthProvider;
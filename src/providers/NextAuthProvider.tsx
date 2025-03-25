"use client";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface NextAuthProviderProps {
    children: React.ReactNode;
    session: Session | null | undefined;
}

export default function NextAuthProvider({ children, session }: NextAuthProviderProps): React.ReactNode {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}
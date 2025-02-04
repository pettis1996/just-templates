"use client"
import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface UserContextValue {
    user: User | null;
    session: Session | null;
    loading: boolean;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        async function loadUser() {
            try {
                const { data: { user }, error: userError } = await supabase.auth.getUser();
                const { data: sessionData } = await supabase.auth.getSession();

                if (userError) {
                    console.error("Failed to load user", userError);
                }

                setUser(user);
                setSession(sessionData?.session || null);
                setLoading(false);
            } catch (error) {
                console.error("Error during loading user or session", error);
                setLoading(false);
            }
        }

        loadUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, session, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
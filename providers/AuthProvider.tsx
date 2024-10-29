import { Session, User } from "@supabase/auth-js";
import { supabase } from "lib/supabase";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthContext = {
    session: Session | null;
    user: User | undefined;
    profile: any | undefined;
}

const AuthContext = createContext<AuthContext>({
    session: null, user: undefined, profile: undefined
});

export default function AuthProvider ({children}: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<any | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if(!session?.user) {
      setProfile(null);
      return;
    }

    const fetchProfile = async () => {
      let {data, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      setProfile(data);
    }
    fetchProfile();
  }, [session?.user])

  return(
      <AuthContext.Provider value={{session, user: session?.user, profile}}>
          {children};
      </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
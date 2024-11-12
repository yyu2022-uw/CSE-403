import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from 'lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      // await supabase.auth.signOut(); // Uncomment this whenever you want to end the session (log the user out)
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

  }, []);


  useEffect(() => {
    if (!session?.user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    console.log(session.user.id);

    const fetchProfile = async () => {
      try {
        let { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        setProfile(data);

      } catch(err) {
        console.log(session);
        console.error(err);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [session?.user]);



  return (
    // Added an exclamation here
    <AuthContext.Provider value={{ session, user: session?.user!, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from 'lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Interest, InterestList } from '@/data/interests'

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  mentorInterests: Interest[] | null | undefined;
  menteeInterests: Interest[] | null | undefined;
  interests: Interest[] | null | undefined;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>();
  const [interests, setInterests] = useState<Interest[] | null>(); // TODO: move this into a non-auth provider?
  const [mentorInterests, setMentorInterests] = useState<Interest[] | null>();
  const [menteeInterests, setMenteeInterests] = useState<Interest[] | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      console.log("fetching session")
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
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

    try {
      const fetchProfile = async () => {
        try {
          let { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(data);
        } catch (err) {
          console.log(session);
          console.error(err);
        }
        setLoading(false);
      };

      fetchProfile();

    } catch (err) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }

  }, [session?.user]);

  useEffect(() => {
    const fetchInterests = async () => {
      if (!session?.user) {
        setInterests([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('interests')
          .select('*');
        if (error) throw error;

        if (data) {
          // Transform the data to match the expected structure
          const interests: Interest[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            color: item.color,
            icon: item.icon,
          }));

          console.log("Fetched interests:", data);
          setInterests(interests);
          console.log("Transformed interests:", interests);
        }
      } catch (err) {
        console.error("Error fetching interests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, [session?.user]);

  useEffect(() => {
    if (!session?.user) {
      setMentorInterests([]);
      setLoading(false);
      return;
    }

    try {

      const fetchMentorInterests = async () => {
        try {
          let { data, error } = await supabase
            .from('user_interests')
            .select('interests(*)') // Get all fields from both user_interests and related interests
            .eq('uid', session.user.id)
            .eq('is_mentor', true);

          if (error) throw error;

          if (data) {
            // Transform the data to match the expected structure
            const interests: Interest[] = data.map((item: any) => ({
              id: item.interests.id,
              name: item.interests.name,
              color: item.interests.color,
              icon: item.interests.icon,
            }));

            setMentorInterests(interests);
            console.log(interests);
          }
        } catch (err) {
          console.log("mentor interests: " + mentorInterests);
          console.error(err);
        }
        setLoading(false);
      };

      fetchMentorInterests();

    } catch (err) {
      console.error("Error fetching mentee data:", err);
    } finally {
      setLoading(false);
    }

  }, [session?.user]);

  useEffect(() => {
    if (!session?.user) {
      setMenteeInterests([]);
      setLoading(false);
      return;
    }

    try {

      const fetchMenteeInterests = async () => {
        try {
          let { data, error } = await supabase
            .from('user_interests')
            .select('interests(*)') // Get all fields from both user_interests and related interests
            .eq('uid', session.user.id)
            .eq('is_mentor', false);

          if (error) throw error;

          if (data) {
            // Transform the data to match the expected structure
            const interests: Interest[] = data.map((item: any) => ({
              id: item.interests.id,
              name: item.interests.name,
              color: item.interests.color,
              icon: item.interests.icon,
            }));

            setMenteeInterests(interests);
            console.log("mentee interests: " + menteeInterests);
          }
        } catch (err) {
          console.log(menteeInterests);
          console.error(err);
        }
        setLoading(false);
      };

      fetchMenteeInterests();

    } catch (err) {
      console.error("Error fetching mentee data:", err);
    } finally {
      setLoading(false);
    }

  }, [session?.user]);

  return (
    // Added an exclamation here
    <AuthContext.Provider value={{ session, user: session?.user!, profile, mentorInterests, menteeInterests, interests, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
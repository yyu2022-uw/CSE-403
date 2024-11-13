import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { supabase } from 'lib/supabase';
import { useLocalSearchParams } from 'expo-router';

export default function MatchingScreen() {
  const param = useLocalSearchParams();
  const [mentor, setMentor] = useState<{ username: string; full_name: string; avatar_url: string; bio: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // Fetch mentors for the specific community
        let { data: mentors } = await supabase
          .from('mentor_communities')
          .select('mid')
          .eq('cid', param.cid);

        if (mentors && mentors.length > 0) {
          // Select a random mentor ID
          const randomMentor = mentors[Math.floor(Math.random() * mentors.length)].mid;

          // Fetch the mentor's profile details
          let { data: mentor } = await supabase
            .from('profiles')
            .select('username, full_name, avatar_url, bio')
            .eq('id', randomMentor)
            .single();

          if (mentor) {
            setMentor(mentor);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
        setLoading(false);
      }
    };

    if (param.cid) {
      fetchMentors();
    }
  }, [param.cid]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {mentor ? (
        <Text>Mentor Matched: {mentor.full_name}</Text>
      ) : (
        <Text>No mentors available for this community.</Text>
      )}
    </View>
  );

}

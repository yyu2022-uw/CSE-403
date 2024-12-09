import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from 'lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import { Interest } from '@/data/interests';

export default function MatchingScreen() {
  const { iid } = useLocalSearchParams();
  const [match, setMatch] = useState<{ id: string; username: string; full_name: string; avatar_url: string; bio: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        // Fetch mentors for the specific community
        let { data: mentors } = await supabase
          .from('user_interests')
          .select('uid')
          .eq('iid', iid)
          .eq('is_mentor', true);

        if (mentors && mentors.length > 0) {
          // Select a random mentor ID
          const randomMentor = mentors[Math.floor(Math.random() * mentors.length)].uid;

          // Fetch the mentor's profile details
          let { data: mentor } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url, bio')
            .eq('id', randomMentor)
            .single();

          if (mentor) {
            setMatch(mentor);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch mentors:', error);
        setLoading(false);
      }
    };

    const fetchMentees = async () => {
      try {
        // Fetch mentees for the specific community
        let { data: mentees } = await supabase
          .from('user_interests')
          .select('uid')
          .eq('iid', iid)
          .eq('is_mentor', false);

        if (mentees && mentees.length > 0) {
          // Select a random mentor ID
          const randomMentee = mentees[Math.floor(Math.random() * mentees.length)].uid;

          // Fetch the mentor's profile details
          let { data: mentee } = await supabase
            .from('profiles')
            .select('id, username, full_name, avatar_url, bio')
            .eq('id', randomMentee)
            .single();

          if (mentee) {
            setMatch(mentee);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch mentees:', error);
        setLoading(false);
      }
    };

    if (iid) {
      fetchMentors();
      fetchMentees();
    }
  }, [iid]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {match ? (
        <TouchableOpacity
          onPress={() =>
            router.push(
              `/(home)/(tabs)/matching/detail/matchDetail?id=${match.id}&username=${match.username}&full_name=${match.full_name}&avatar_url=${match.avatar_url}&bio=${match.bio}`
            )
          }
        >
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            Match Found: {match.full_name}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text>No mentors available for this community.</Text>
      )}
    </View>
  );

}
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from 'lib/supabase';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Interest } from '@/data/interests';
import { useAuth } from '@useAuth';

export default function MatchingScreen() {
  const auth = useAuth();
  const { iid } = useLocalSearchParams();
  const [match, setMatch] = useState<{ id: string; username: string; full_name: string; avatar_url: string; bio: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMentor, setIsMentor] = useState(false);

  const navigation = useNavigation();

  // Set the screen title name to "Random Match Results"
  useEffect(() => {
    navigation.setOptions({
      title: 'Random Match Results',
    });
  }, [navigation]);


  useEffect(() => {
    const fetchIsMentor = async () => {
      try {
        let { data } = await supabase
          .from('user_interests')
          .select(`
            is_mentor
          `)
          .eq('iid', iid)
          .eq('uid', auth?.user?.id)
          .single()

        if (data) {
          console.log("data.is_mentor", data.is_mentor);
          const is_mentor = data.is_mentor === ' true' || data.is_mentor === 'true' || data.is_mentor === true;
          console.log("is_mentor", is_mentor);
          setIsMentor(is_mentor);
          fetchMentors(is_mentor);
        }
      } catch (error) {
        console.error('Failed to fetch communities:', error);
        setLoading(false);
      }
    };

    const fetchMentors = async (is_mentor: boolean) => {
      try {
        // Fetch mentors for the specific community
        let { data: mentors } = await supabase
          .from('user_interests')
          .select('uid')
          .eq('iid', iid)
          .neq('uid', auth?.user?.id)
          .eq('is_mentor', !is_mentor);  // Based on if you are a mentor or mentee

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

    if (iid) {
      fetchIsMentor();
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
            Matched with {!isMentor ? "mentor" : "mentee"}: {match.full_name}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text>No {!isMentor ? "mentors" : "mentees"} available for this community.</Text>
      )}
    </View>
  );

}
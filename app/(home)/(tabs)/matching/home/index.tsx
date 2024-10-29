import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";

export default function MentorCommunityScreen({ route }) {
  const {cid, name} = route.params;
  const router = useRouter();
  const [mentors, setMentors] = useState<String[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        let { data: communityMentors, error } = await supabase
          .from('mentor_communities')
          .select('profiles (full_name)')
          .eq('cid', cid)
          .limit(3);

        if (error) {
          throw error;
        }

        if (communityMentors) {
          const mentors = communityMentors.map((cm: any) => cm.profiles.full_name);
          setMentors(mentors);
        }
        setLoading(false);
        
      } catch (error) {
        console.error('Failed to fetch community mentors:', error);
        setLoading(false);
      }
    };

    fetchMentors();
  }, [cid]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (mentors.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No mentors available for the {name} community.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Mentors For The {name} Community</Text>
      {mentors.map((mentor, index) => (
         <TouchableOpacity key={index} style={styles.card} onPress={() => router.push('/(home)/(tabs)/matching/detail/mentorDetail')}>
          {/* <Image source={{ uri: mentor.profile_pic }} style={styles.profilePic} /> */}
          <Text style={styles.mentorName}>{mentor}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(home)/(tabs)/matching/detail/match')}>
        <Text style={styles.buttonText}>Click To Be Matched With A Mentor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mentorName: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
  },
});
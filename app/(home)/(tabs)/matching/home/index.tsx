import { useFocusEffect, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { supabase } from "lib/supabase";
import { useCallback, useState } from "react";
import { useAuth } from "@useAuth";
import { ScrollView } from "react-native-gesture-handler";

// interface Profile {
//   id: string;
//   username: string;
//   fullName: string;
//   avatarUrl: string;
//   bio: string;
//   isMentor: boolean;
// }

export default function MentorCommunityScreen({ route }) {
  const auth = useAuth();
  const { iid, name } = route.params;
  const router = useRouter();
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchMentors = async () => {
        try {
          let { data: communityMentors } = await supabase
            .from('user_interests')
            .select('is_mentor, profiles (id, username, full_name, avatar_url, bio)')
            .eq('iid', iid)
            .neq('uid', auth?.user?.id)
            .limit(10);

          if (communityMentors) {
            // console.log("communityMentors", communityMentors);
            setMentors(communityMentors); // Set mentors with updated profiles
          }
          setLoading(false);

        } catch (error) {
          console.error('Failed to fetch community mentors:', error);
          setLoading(false);
        }
      };

      fetchMentors();
    }, [iid]));

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

  function MentorText() {
    return (
      <Text style={{ color: 'black' }}>Mentor</Text>
    )
  }

  function MenteeText() {
    return (
      <Text style={{ color: 'purple' }}>Mentee</Text>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent} // Apply styles to the content
    >
      <Text style={styles.title}>Recommended Connections For The {name} Community</Text>
      {mentors.map((mentor, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => {
          router.push(
            `/(home)/(tabs)/matching/detail/matchDetail?id=${mentor.profiles.id}&username=${mentor.profiles.username}&full_name=${mentor.profiles.full_name}&avatar_url=${mentor.profiles.avatar_url}&bio=${mentor.profiles.bio}`
          )
        }}>
          <View style={styles.nameAndType}>
            <Text style={styles.mentorName}>{mentor.profiles.full_name}</Text>
            <Text style={styles.type}>{
              mentor.is_mentor === 'true' || mentor.is_mentor === true ?
                <MentorText /> :
                <MenteeText />
            }
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => { router.push(`/(home)/(tabs)/matching/detail/match?iid=${iid}`) }}
      >
        <Text style={styles.buttonText}>Random Match</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 36,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 72
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
  nameAndType: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    fontSize: 12,
    marginVertical: 8,
    // fontWeight: 'bold',
    alignItems: 'center',
  },
});

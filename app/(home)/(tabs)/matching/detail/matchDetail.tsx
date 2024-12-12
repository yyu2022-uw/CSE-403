import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { Interest } from '@/data/interests';
import { supabase } from 'lib/supabase';
import InterestsList from '@/components/profile/InterestsList';
import { sizes } from '@Sizes';
import { spacing } from '@Spacing';
import Divider from '@/components/Divider';
import { useAuth } from '@useAuth';
import { useChatContext } from 'stream-chat-expo';
import ConnectWithMatchButton from '@/components/matching/ConnectWithMatchButton';

export default function MentorDetailScreen() { // Include navigation as prop
  const auth = useAuth();
  const { client } = useChatContext();
  const { id, username, full_name, avatar_url, bio } = useLocalSearchParams();
  const validAvatarUrl = Array.isArray(avatar_url) ? avatar_url[0] : avatar_url;
  const [mentorInterests, setMentorInterests] = useState<Interest[]>();
  const [menteeInterests, setMenteeInterests] = useState<Interest[]>();
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Set the screen title name to "Details for {full_name}"
  useEffect(() => {
    if (navigation && full_name) {
      navigation.setOptions({
        title: `Details for ${full_name}`,
      });
    }
  }, [navigation, full_name]);

  useEffect(() => {
    const fetchMentorInterests = async () => {
      try {
        let { data, error } = await supabase
          .from('user_interests')
          .select('interests(*)')
          .eq('uid', id)
          .eq('is_mentor', true);

        if (error) throw error;

        if (data) {
          const interests: Interest[] = data.map((item: any) => ({
            id: item.interests.id,
            name: item.interests.name,
            color: item.interests.color,
            icon: item.interests.icon,
          }));
          setMentorInterests(interests);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const fetchMenteeInterests = async () => {
      try {
        let { data, error } = await supabase
          .from('user_interests')
          .select('interests(*)')
          .eq('uid', id)
          .eq('is_mentor', false);

        if (error) throw error;

        if (data) {
          const interests: Interest[] = data.map((item: any) => ({
            id: item.interests.id,
            name: item.interests.name,
            color: item.interests.color,
            icon: item.interests.icon,
          }));
          setMenteeInterests(interests);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (id) {
      fetchMentorInterests();
      fetchMenteeInterests();
    }
  }, [id, full_name, navigation]); // Make sure full_name and navigation are included as dependencies

  const handleConnectPress = async () => {
    const profile = auth?.profile;

    if (!profile || !id) {
      console.error("User profile or mentor ID is missing.");
      return;
    }

    const createChannel = async () => {
      try {
        // Replace `client` with the StreamChat instance from ChatProvider
        const channel = client.channel('messaging', {
          members: [profile.id, id], // Include current user ID and mentor's ID
        })
        await channel.watch();

        // Navigate to the chat screen
        router.push('/(home)/(tabs)/')
      } catch (err) {
        console.error("Failed to create or join channel:", err);
      }
    };

    createChannel();
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileContainer}>
          <View>
            {validAvatarUrl !== 'null' ? (
              <Image
                source={{ uri: validAvatarUrl }}
                accessibilityLabel="Avatar"
                style={[styles.avatar, styles.image]}
              />
            ) : (
              // <View style={[styles.avatar, styles.noImage]} />
              <Image
                // source={{ uri: 'https://placehold.jp/8ACE00/000000/150x150.png?text=interconnect' }}
                // source={{ uri: 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg' }}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/680px-Default_pfp.svg.png' }} // Default image
                accessibilityLabel="Avatar"
                style={[styles.avatar, styles.image]}
              />
            )}
          </View>

          <Text style={styles.fullName}>{full_name}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={[sizes.subtitle, styles.bio]}>Bio</Text>
          <Text style={styles.bioText}>{bio}</Text>
          <Divider margin={spacing} />
          <View style={styles.interests}>
            <View style={styles.interestsLists}>
              <View>
                <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                  Mentoring
                </Text>
                <InterestsList interests={mentorInterests} onUpdate={() => { }} />
              </View>
              <View>
                <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                  Menteeing
                </Text>
                <InterestsList interests={menteeInterests} onUpdate={() => { }} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <ConnectWithMatchButton
        onClick={handleConnectPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 16,
  },
  fullName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 20,
    color: '#555',
    marginBottom: 8,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    paddingTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 18,
    color: '#555',
    lineHeight: 24,
    paddingLeft: spacing / 4,
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 5,
  },
  mentorMentee: {
    paddingBottom: 8,
  },
  interests: {
    margin: 'auto',
    alignItems: 'center',
    paddingBottom: spacing,
  },
  interestsLists: {
    width: 320,
    paddingTop: spacing / 2,
    flex: 2,
    margin: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bio: {
    paddingLeft: spacing / 4,
  },
});
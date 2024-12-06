import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import InterestsList from '@/components/profile/InterestsList';
import ProfileTag from '@/components/profile/ProfileTag';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { ScrollView } from 'react-native-gesture-handler';
import Divider from '@/components/Divider';
import EditProfileButton from '@/components/profile/EditProfileButton';
import FindNewInterestMessage from '@/components/profile/FindNewInterestMessage';
import { useAuth } from 'providers/AuthProvider';
import { supabase } from 'lib/supabase';
import Bio from '@/components/profile/Bio';
import { Redirect, useFocusEffect } from 'expo-router';
import { Interest } from '@/data/interests';

export default function Profile() {
    const auth = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('placeholder_username')
    const [fullName, setFullName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')
    const [mentorInterests, setMentorInterests] = useState<Interest[]>()
    const [menteeInterests, setMenteeInterests] = useState<Interest[]>()

    useEffect(() => {

        async function getProfile() {
            try {
                console.log("getting profile")
                setLoading(true)
                if (!auth?.session?.user) throw new Error('No user on the session!')

                const { data, error, status } = await supabase
                    .from('profiles')
                    .select(`full_name, username, avatar_url, bio`)
                    .eq('id', auth?.session?.user.id)
                    .single()
                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setFullName(data.full_name)
                    setUsername(data.username)
                    setAvatarUrl(data.avatar_url)
                    setBio(data.bio)
                }
            } catch (error) {
                if (error instanceof Error) {
                    Alert.alert(error.message)
                }
            } finally {
                setLoading(false)
            }

        }

        const fetchMentorInterests = async () => {
            let { data, error } = await supabase
                .from('user_interests')
                .select('interests(*)') // Get all fields from both user_interests and related interests
                .eq('uid', auth?.user?.id)
                .eq('is_mentor', true);

            if (error) throw error;

            if (data) {
                console.log("data " + data);
                // Transform the data to match the expected structure
                const interests: Interest[] = data.map((item: any) => ({
                    id: item.interests.id,
                    name: item.interests.name,
                    color: item.interests.color,
                    icon: item.interests.icon,
                }));

                console.log("interests: " + interests);

                setMentorInterests(interests);
                console.log("mentor interests: " + mentorInterests);
            }

        }

        const fetchMenteeInterests = async () => {
            let { data, error } = await supabase
                .from('user_interests')
                .select('interests(*)') // Get all fields from both user_interests and related interests
                .eq('uid', auth?.user?.id)
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

        }

        if (auth?.session?.user || auth?.profile) {
            getProfile();
            fetchMentorInterests();
            fetchMenteeInterests();
        }

    });

    return (
        <SafeAreaView style={styles.container}>
            {/* <SafeAreaView> */}
            <ScrollView>
                <ProfileTag
                    editing={editing}
                />
                <Text style={[sizes.subtitle, styles.subtitle]}>
                    Bio
                </Text>
                <Bio editing={editing} />
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
                    {editing ? (
                        <View style={styles.newInterestMessage}>
                            <FindNewInterestMessage />
                        </View>
                    ) : null}
                </View>
                <Divider margin={spacing} />
                <View style={styles.userId}>
                    <Text>User ID: {auth?.session?.user.id}</Text>
                </View>
            </ScrollView>
            <EditProfileButton
                editing={editing}
                setEditing={setEditing}
                // onUpdate={() => updateProfile({ username, fullName, website, bio, avatarUrl })}
                onUpdate={() => { }} // Update profile on button press (not currently using this, each component updates separately)
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
    },
    subtitle: {
        paddingLeft: spacing
    },
    interests: {
        margin: 'auto',
        alignItems: 'center',
    },
    interestsLists: {
        width: 350,
        paddingTop: spacing / 2,
        flex: 2,
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mentorMentee: {
        paddingBottom: 8
    },
    newInterestMessage: {
        paddingTop: 8
    },
    userId: {
        alignItems: 'center',
    }
})
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
import { Redirect } from 'expo-router';

export default function Profile() {
    const auth = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('placeholder_username')
    const [fullName, setFullName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [website, setWebsite] = useState('')
    const [bio, setBio] = useState('')
    const [mentorInterests, setMentorInterests] = useState(auth?.mentorInterests)
    const [menteeInterests, setMenteeInterests] = useState(auth?.menteeInterests)

    useEffect(() => {
        if (auth?.session?.user || auth?.profile || auth?.menteeInterests || auth?.mentorInterests) {
            getProfile();
        }
    }, [auth?.profile, auth?.session, auth?.mentorInterests, auth?.menteeInterests]);

    async function getProfile() {
        try {
            console.log("getting new profile")
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

        setMentorInterests(auth?.mentorInterests);
        setMenteeInterests(auth?.menteeInterests);
        console.log(auth?.mentorInterests)
    }

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
                            <InterestsList interests={mentorInterests} is_mentor={true} />
                        </View>
                        <View>
                            <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                                Menteeing
                            </Text>
                            <InterestsList interests={menteeInterests} is_mentor={false} />
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
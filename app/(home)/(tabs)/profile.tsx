import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import InterestsList from '@/components/profile/InterestsList';
import Bio from '@/components/profile/Bio';
import ProfileTag from '@/components/profile/ProfileTag';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { ScrollView } from 'react-native-gesture-handler';
import Divider from '@/components/Divider';
import EditProfileButton from '@/components/profile/EditProfileButton';
import FindNewInterestMessage from '@/components/profile/FindNewInterestMessage';
import { useAuth } from 'providers/AuthProvider';
import { supabase } from 'lib/supabase';

export default function Profile() {
    const [editing, setEditing] = useState(false);
    const {session} = useAuth();

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if (session) getProfile()
    }, [session])

    async function getProfile() {
        try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', session?.user.id)
            .single()
        if (error && status !== 406) {
            throw error
        }

        if (data) {
            setUsername(data.username)
            setWebsite(data.website)
            setAvatarUrl(data.avatar_url)
        }
        } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message)
        }
        } finally {
        setLoading(false)
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string
        website: string
        avatar_url: string
    }) {
        try {
        setLoading(true)
        if (!session?.user) throw new Error('No user on the session!')

        const updates = {
            id: session?.user.id,
            username,
            website,
            avatar_url,
            updated_at: new Date(),
        }

        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            throw error
        }
        } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message)
        }
        } finally {
        setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ProfileTag editing={editing} />
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
                            <InterestsList />
                        </View>
                        <View>
                            <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                                Menteeing
                            </Text>
                            <InterestsList />
                        </View>
                    </View>
                    {editing ? (
                        <View style={styles.newInterestMessage}>
                            <FindNewInterestMessage />
                        </View>
                    ) : null}
                </View>
            </ScrollView>
            <EditProfileButton
                editing={editing}
                setEditing={setEditing}
            />
        </SafeAreaView >
    );

    // Pasting this code in here; this is what the tutorial uses for it's profile page. 
    // Putting it here for easy reference

    /*
    return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
    )
    */

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})